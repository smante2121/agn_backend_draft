from flask import Flask, request, send_file, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
import subprocess
from datetime import datetime
from urllib.parse import unquote

app = Flask(__name__)

# Configure the SQLAlchemy connection (Update with your actual database details)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://user:password@localhost/dbname'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

name = None


def comprehend_command(cmd):
    return cmd.replace("SPACE", " ")


@app.route('/download/<string:download>', methods=['GET'])
def download_file(download):
    """Handles actual file download."""
    file_path = os.path.join(os.getcwd(), "downloads", f"{name}.csv")
    return send_file(file_path, as_attachment=True)


@app.route('/ready/<string:download>', methods=['GET'])
def check_file_ready(download):
    """Checks if the file is ready for download."""
    file_path = os.path.join(os.getcwd(), "downloads", f"{name}.csv")
    return jsonify(os.path.exists(file_path))


@app.route('/sed/download/<string:sed_name>', methods=['GET'])
def serve_sed_file(sed_name):
    """Serves the generated SED visualization."""
    file_path = os.path.join(os.getcwd(), "seds", f"{sed_name}.png")
    return send_file(file_path)


@app.route('/sedReady/<string:rawdata>', methods=['GET'])
def process_sed(rawdata):
    """Processes SED data and creates a visualization."""
    raw_data = unquote(rawdata).replace('"', "'")
    sed_name = f"sed{int(datetime.now().timestamp())}"
    file_path = os.path.join(os.getcwd(), "seds", f"{sed_name}.png")

    cigaleini = "/home/data/blackbase/cigale-v2022.0/pcigale.ini"

    command = f"/home/data/blackbase/webapp/BackEnd-Express/routes/api/cigale.py \"{raw_data}\" {sed_name} {file_path}"
    subprocess.run(command, shell=True, check=False)

    if os.path.exists(file_path):
        return jsonify(sed_name)
    return jsonify(False)


@app.route('/columntable', methods=['GET'])
def get_column_table():
    """Gets column names from the database."""
    try:
        query = "SELECT * FROM Merged WHERE `RA` < 1 LIMIT 100"
        result = db.engine.execute(query)

        first_row = result.fetchone()
        if first_row:
            column_names = [key for key in first_row.keys() if "QQupper" not in key and "QQlower" not in key and "Unnamed" not in key]
            return jsonify(column_names)

    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/<string:command>', methods=['GET'])
def query_process(command):
    """Processes a query and saves results to a file."""
    global name
    real_command = comprehend_command(command)
    print(f"Real command: {real_command}")

    count_query = f"SELECT COUNT(*) FROM Merged WHERE {real_command} LIMIT 100"
    result = db.engine.execute(count_query)
    count = result.fetchone()[0]

    timestamp = int(datetime.now().timestamp())
    name = f"query{timestamp}"

    header_file = f"/home/data/blackbase/webapp/BackEnd-Express/downloads/header_{name}.csv"
    content_file = f"/home/data/blackbase/webapp/BackEnd-Express/downloads/content_{name}.csv"
    merged_file = os.path.join(os.getcwd(), "downloads", f"{name}.csv")

    db.engine.execute("SET group_concat_max_len = 5000")
    db.engine.execute(f"""
        SELECT GROUP_CONCAT(CONCAT("'", COLUMN_NAME, "'")) 
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME ='Merged'
        INTO OUTFILE '{header_file}'
    """)

    db.engine.execute(f"""
        SELECT * FROM Merged WHERE {real_command}
        INTO OUTFILE '{content_file}' 
        FIELDS TERMINATED BY ',' 
        OPTIONALLY ENCLOSED BY '"'
        LINES TERMINATED BY '\\n'
    """)

    subprocess.run(f"cat {header_file} {content_file} > {merged_file}", shell=True, check=False)

    if count < 500:
        select_query = f"SELECT * FROM Merged WHERE {real_command} LIMIT 100"
        results = db.engine.execute(select_query)
        data = [dict(row) for row in results]
        return jsonify(data)

    return jsonify({"status": "Query executed, results saved"})


if __name__ == '__main__':
    app.run(debug=True)
