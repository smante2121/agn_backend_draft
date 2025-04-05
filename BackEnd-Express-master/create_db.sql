-- Drop database if it exists and create a new one
DROP DATABASE IF EXISTS blackbase;
CREATE DATABASE blackbase;
USE blackbase;

-- Create Source AGN table
CREATE TABLE source_agn (
    agn_id INT AUTO_INCREMENT PRIMARY KEY,
    RA DOUBLE NOT NULL,
    declination DOUBLE NOT NULL
);

-- Create Photometry table
CREATE TABLE photometry (
    phot_id INT AUTO_INCREMENT PRIMARY KEY,
    agn_id INT NOT NULL,
    band_label VARCHAR(50) NOT NULL,
    filter_name VARCHAR(50) NOT NULL,
    mag_value DOUBLE NOT NULL,
    mag_error DOUBLE,
    extinction DOUBLE,
    FOREIGN KEY (agn_id) REFERENCES source_agn(agn_id)
);

-- Create Classification table
CREATE TABLE classification (
    class_id INT AUTO_INCREMENT PRIMARY KEY,
    agn_id INT NOT NULL,
    spec_class VARCHAR(50),
    gen_class VARCHAR(50),
    xray_class VARCHAR(50),
    best_class VARCHAR(50),
    image_class VARCHAR(50),
    SED_class VARCHAR(50),
    FOREIGN KEY (agn_id) REFERENCES source_agn(agn_id)
);

-- Create Redshift Measurement table
CREATE TABLE redshift_measurement (
    redshift_id INT AUTO_INCREMENT PRIMARY KEY,
    agn_id INT NOT NULL,
    redshift_type VARCHAR(50) NOT NULL,
    z_value DOUBLE NOT NULL,
    z_error DOUBLE,
    FOREIGN KEY (agn_id) REFERENCES source_agn(agn_id)
);

-- Create Observation table
CREATE TABLE observation (
    obs_id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE,
    instrument VARCHAR(100),
    reference_catalog VARCHAR(100)
);

-- Insert some sample data
INSERT INTO source_agn (RA, declination) VALUES 
(150.5, -1.76),
(45.2, 30.8),
(220.7, -15.3);

INSERT INTO photometry (agn_id, band_label, filter_name, mag_value, mag_error, extinction) VALUES
(1, 'U', 'SDSS-u', 18.5, 0.05, 0.12),
(1, 'G', 'SDSS-g', 17.8, 0.03, 0.09),
(2, 'R', 'SDSS-r', 19.2, 0.06, 0.08);

INSERT INTO classification (agn_id, spec_class, gen_class, xray_class, best_class) VALUES
(1, 'Seyfert 1', 'Type 1', 'QSO', 'Seyfert 1'),
(2, 'Seyfert 2', 'Type 2', 'AGN', 'Seyfert 2'),
(3, 'LINER', 'Type 2', 'Low Lum AGN', 'LINER');

INSERT INTO redshift_measurement (agn_id, redshift_type, z_value, z_error) VALUES
(1, 'spectroscopic', 0.158, 0.001),
(2, 'photometric', 0.267, 0.015),
(3, 'spectroscopic', 0.089, 0.001);

INSERT INTO observation (date, instrument, reference_catalog) VALUES
('2023-01-15', 'SDSS Spectrograph', 'SDSS DR16'),
('2023-02-20', 'Chandra', 'CSC 2.0'),
('2023-03-10', 'HST WFC3', 'HST Archive'); 