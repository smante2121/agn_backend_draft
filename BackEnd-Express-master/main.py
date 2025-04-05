from fastapi import FastAPI, HTTPException, Depends, Query, Path, Response, File, UploadFile, Form
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, Float, String, Date, ForeignKey, text, or_, and_, between
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any, Union
from datetime import date, datetime
import os
import subprocess
import json
import csv
import io
import time
import uuid
from pathlib import Path
import urllib.parse

# Create FastAPI app
app = FastAPI(title="AGN Database API", description="API for the AGN Database")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:@mariadb/blackbase"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Create directories if they don't exist
os.makedirs("downloads", exist_ok=True)
os.makedirs("seds", exist_ok=True)

# Database Models
class SourceAGN(Base):
    __tablename__ = "source_agn"
    agn_id = Column(Integer, primary_key=True, index=True)
    RA = Column(Float)
    declination = Column(Float)
    
    # Relationships
    photometry = relationship("Photometry", back_populates="agn")
    classification = relationship("Classification", back_populates="agn", uselist=False)
    redshift = relationship("RedshiftMeasurement", back_populates="agn", uselist=False)

class Photometry(Base):
    __tablename__ = "photometry"
    phot_id = Column(Integer, primary_key=True, index=True)
    agn_id = Column(Integer, ForeignKey("source_agn.agn_id"))
    band_label = Column(String(50))
    filter_name = Column(String(50))
    mag_value = Column(Float)
    mag_error = Column(Float)
    extinction = Column(Float)
    
    # Relationship
    agn = relationship("SourceAGN", back_populates="photometry")

class Classification(Base):
    __tablename__ = "classification"
    class_id = Column(Integer, primary_key=True, index=True)
    agn_id = Column(Integer, ForeignKey("source_agn.agn_id"))
    spec_class = Column(String(50))
    gen_class = Column(String(50))
    xray_class = Column(String(50))
    best_class = Column(String(50))
    image_class = Column(String(50))
    SED_class = Column(String(50))
    
    # Relationship
    agn = relationship("SourceAGN", back_populates="classification")

class RedshiftMeasurement(Base):
    __tablename__ = "redshift_measurement"
    redshift_id = Column(Integer, primary_key=True, index=True)
    agn_id = Column(Integer, ForeignKey("source_agn.agn_id"))
    redshift_type = Column(String(50))
    z_value = Column(Float)
    z_error = Column(Float)
    
    # Relationship
    agn = relationship("SourceAGN", back_populates="redshift")

class Observation(Base):
    __tablename__ = "observation"
    obs_id = Column(Integer, primary_key=True, index=True)
    date = Column(Date)
    instrument = Column(String(100))
    reference_catalog = Column(String(100))

# Pydantic Models for API
class AGNBase(BaseModel):
    RA: float
    declination: float

class AGNCreate(AGNBase):
    pass

class AGN(AGNBase):
    agn_id: int
    class Config:
        orm_mode = True

class PhotometryBase(BaseModel):
    band_label: str
    filter_name: str
    mag_value: float
    mag_error: float
    extinction: float

class PhotometryCreate(PhotometryBase):
    agn_id: int

class PhotometryResponse(PhotometryBase):
    phot_id: int
    agn_id: int
    class Config:
        orm_mode = True

class ClassificationBase(BaseModel):
    spec_class: Optional[str] = None
    gen_class: Optional[str] = None
    xray_class: Optional[str] = None
    best_class: Optional[str] = None
    image_class: Optional[str] = None
    SED_class: Optional[str] = None

class ClassificationCreate(ClassificationBase):
    agn_id: int

class ClassificationResponse(ClassificationBase):
    class_id: int
    agn_id: int
    class Config:
        orm_mode = True

class RedshiftBase(BaseModel):
    redshift_type: str
    z_value: float
    z_error: float

class RedshiftCreate(RedshiftBase):
    agn_id: int

class RedshiftResponse(RedshiftBase):
    redshift_id: int
    agn_id: int
    class Config:
        orm_mode = True

class AGNDetail(BaseModel):
    agn: AGN
    photometry: List[PhotometryResponse]
    classification: Optional[ClassificationResponse]
    redshift: Optional[RedshiftResponse]

class SearchResponse(BaseModel):
    results: List[AGN]
    total: int
    query_id: Optional[str] = None

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to AGN Database API", "version": "1.0.0"}

@app.get("/agn/", response_model=List[AGN])
def read_agns(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Get a list of AGN sources with pagination.
    """
    agns = db.query(SourceAGN).offset(skip).limit(limit).all()
    return agns

@app.get("/agn/{agn_id}", response_model=AGNDetail)
def read_agn(agn_id: int, db: Session = Depends(get_db)):
    """
    Get detailed information about a specific AGN source.
    """
    agn = db.query(SourceAGN).filter(SourceAGN.agn_id == agn_id).first()
    if agn is None:
        raise HTTPException(status_code=404, detail="AGN not found")
    
    # Get related data
    photometry = db.query(Photometry).filter(Photometry.agn_id == agn_id).all()
    classification = db.query(Classification).filter(Classification.agn_id == agn_id).first()
    redshift = db.query(RedshiftMeasurement).filter(RedshiftMeasurement.agn_id == agn_id).first()
    
    return {
        "agn": agn,
        "photometry": photometry,
        "classification": classification,
        "redshift": redshift
    }

@app.get("/search/", response_model=SearchResponse)
def search_agn(
    ra_min: Optional[float] = None,
    ra_max: Optional[float] = None,
    dec_min: Optional[float] = None,
    dec_max: Optional[float] = None,
    z_min: Optional[float] = None,
    z_max: Optional[float] = None,
    class_type: Optional[str] = None,
    band: Optional[str] = None,
    mag_min: Optional[float] = None,
    mag_max: Optional[float] = None,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    Search for AGN sources with various filters.
    """
    query = db.query(SourceAGN)
    
    # Apply RA/DEC filters
    if ra_min is not None and ra_max is not None:
        query = query.filter(SourceAGN.RA.between(ra_min, ra_max))
    if dec_min is not None and dec_max is not None:
        query = query.filter(SourceAGN.declination.between(dec_min, dec_max))
    
    # Apply redshift filter
    if z_min is not None or z_max is not None:
        z_min_val = z_min if z_min is not None else 0
        z_max_val = z_max if z_max is not None else 999
        query = query.join(RedshiftMeasurement).filter(
            RedshiftMeasurement.z_value.between(z_min_val, z_max_val)
        )
    
    # Apply classification filter
    if class_type is not None:
        query = query.join(Classification).filter(
            or_(
                Classification.spec_class == class_type,
                Classification.gen_class == class_type,
                Classification.xray_class == class_type,
                Classification.best_class == class_type
            )
        )
    
    # Apply photometry filters
    if band is not None or mag_min is not None or mag_max is not None:
        query = query.join(Photometry)
        if band is not None:
            query = query.filter(Photometry.band_label == band)
        if mag_min is not None and mag_max is not None:
            query = query.filter(Photometry.mag_value.between(mag_min, mag_max))
        elif mag_min is not None:
            query = query.filter(Photometry.mag_value >= mag_min)
        elif mag_max is not None:
            query = query.filter(Photometry.mag_value <= mag_max)
    
    # Get results
    results = query.limit(limit).all()
    total = query.count()
    
    return {
        "results": results,
        "total": total
    }

@app.get("/query/{command}")
def execute_query(command: str, db: Session = Depends(get_db)):
    """
    Execute a custom SQL query and return results or generate a downloadable file.
    """
    # Replace SPACE with actual spaces
    real_command = command.replace("SPACE", " ")
    
    # Count results
    count_query = f"SELECT COUNT(*) as count FROM source_agn WHERE {real_command} LIMIT 100"
    count_result = db.execute(text(count_query)).fetchone()
    count = count_result[0] if count_result else 0
    
    # Generate a unique ID for this query
    query_id = f"query_{int(time.time())}_{uuid.uuid4().hex[:8]}"
    
    # If count is small, return results directly
    if count < 500:
        query = f"SELECT * FROM source_agn WHERE {real_command} LIMIT 100"
        results = db.execute(text(query)).fetchall()
        
        # Convert to list of dicts
        columns = results.keys()
        data = [dict(zip(columns, row)) for row in results]
        
        return {
            "results": data,
            "total": count,
            "query_id": query_id
        }
    
    # For large result sets, save to file
    header_file = f"downloads/header_{query_id}.csv"
    content_file = f"downloads/content_{query_id}.csv"
    merged_file = f"downloads/{query_id}.csv"
    
    # Get column names
    column_query = """
    SELECT GROUP_CONCAT(CONCAT('"', COLUMN_NAME, '"')) 
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = 'source_agn'
    """
    column_result = db.execute(text(column_query)).fetchone()
    column_names = column_result[0] if column_result else ""
    
    # Write header
    with open(header_file, 'w') as f:
        f.write(column_names)
    
    # Write data
    data_query = f"SELECT * FROM source_agn WHERE {real_command} LIMIT 100"
    results = db.execute(text(data_query)).fetchall()
    
    with open(content_file, 'w', newline='') as f:
        writer = csv.writer(f)
        for row in results:
            writer.writerow(row)
    
    # Merge files
    with open(header_file, 'r') as h, open(content_file, 'r') as c, open(merged_file, 'w') as m:
        m.write(h.read() + '\n' + c.read())
    
    return {
        "results": [],
        "total": count,
        "query_id": query_id,
        "message": "Results saved to file. Use /download/{query_id} to download."
    }

@app.get("/download/{query_id}")
def download_query_results(query_id: str):
    """
    Download query results as a CSV file.
    """
    file_path = f"downloads/{query_id}.csv"
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    
    return FileResponse(
        file_path, 
        media_type="text/csv", 
        filename=f"agn_query_{query_id}.csv"
    )

@app.get("/ready/{query_id}")
def check_file_ready(query_id: str):
    """
    Check if a query result file is ready for download.
    """
    file_path = f"downloads/{query_id}.csv"
    return {"ready": os.path.exists(file_path)}

@app.get("/sed/download/{sed_name}")
def download_sed(sed_name: str):
    """
    Download a generated SED visualization.
    """
    file_path = f"seds/{sed_name}.png"
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="SED file not found")
    
    return FileResponse(
        file_path, 
        media_type="image/png", 
        filename=f"{sed_name}.png"
    )

@app.get("/sedReady/{rawdata}")
def process_sed(rawdata: str):
    """
    Process SED data and create a visualization.
    """
    try:
        # URL decode the raw data
        decoded_data = urllib.parse.unquote(rawdata)
        print(f"Decoded data: {decoded_data}")  # Debug print
        
        # Create necessary directories if they don't exist
        os.makedirs("seds", exist_ok=True)
        
        # Generate a unique name for the SED file
        sed_name = f"sed_{int(time.time())}_{uuid.uuid4().hex[:8]}"
        file_path = f"seds/{sed_name}.png"
        temp_file = f"seds/{sed_name}.txt"
        
        # Write the data to a temporary file
        with open(temp_file, 'w') as f:
            f.write(decoded_data)
        print(f"Wrote data to {temp_file}")  # Debug print
        
        # Verify script exists
        script_path = os.path.join(os.getcwd(), "sed_processor.py")
        if not os.path.exists(script_path):
            return {"success": False, "error": f"Script not found at {script_path}"}
        
        # Process the SED data using our script
        try:
            # Run the SED processor script with full path
            result = subprocess.run(
                ["python", script_path, "--data_file", temp_file, "--output_file", file_path],
                capture_output=True,
                text=True,
                cwd=os.getcwd()  # Set working directory
            )
            
            print(f"Script path: {script_path}")  # Debug print
            print(f"Working directory: {os.getcwd()}")  # Debug print
            print(f"Script output: {result.stdout}")  # Debug print
            print(f"Script error: {result.stderr}")   # Debug print
            
            if result.returncode == 0 and os.path.exists(file_path):
                return {"success": True, "sed_name": sed_name}
            else:
                error_msg = result.stderr if result.stderr else "Unknown error occurred"
                return {"success": False, "error": error_msg}
                
        except Exception as e:
            print(f"Exception in subprocess: {str(e)}")  # Debug print
            return {"success": False, "error": str(e)}
            
    except Exception as e:
        print(f"Exception in endpoint: {str(e)}")  # Debug print
        return {"success": False, "error": str(e)}

@app.get("/columntable")
def get_column_table(db: Session = Depends(get_db)):
    """
    Get column names from the database for dropdown suggestions.
    """
    try:
        # Get column names from source_agn table
        source_columns = [c.name for c in SourceAGN.__table__.columns]
        
        # Get column names from photometry table
        photometry_columns = [c.name for c in Photometry.__table__.columns]
        
        # Get column names from classification table
        classification_columns = [c.name for c in Classification.__table__.columns]
        
        # Get column names from redshift_measurement table
        redshift_columns = [c.name for c in RedshiftMeasurement.__table__.columns]
        
        # Combine all columns
        all_columns = {
            "source_agn": source_columns,
            "photometry": photometry_columns,
            "classification": classification_columns,
            "redshift_measurement": redshift_columns
        }
        
        return all_columns
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Create tables if they don't exist
Base.metadata.create_all(bind=engine) 