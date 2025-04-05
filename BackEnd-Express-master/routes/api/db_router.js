const express = require('express')
const router = express.Router() // mini applicatuion capabale of perfomring middleware and routing functinos
const db = require("../../app/models") //sequelize database connection
const path = require('path');
const {exec} = require('child_process'); //for exectuing shell commands
const fs = require('fs') // file system operation

let name = null

function ComprehendCommand(req) {
    return req.replace(/SPACE/g, " ");
}


// goes to /:command first
// then it goes to /ready/:download and download/:download
// then it goes down to /sedReady/:rawdata
// then /sed/:download


router.get('/download/:download', (req, res) => { // handles actual download
    res.status(200).download(path.join(__dirname, "../../downloads", `${name}.csv`))
})

router.get('/ready/:download', (req, res) => { // checks if file is ready for download
    let pathFile = path.join(__dirname, "../../downloads", `${name}.csv`)
    try {
        if (fs.existsSync(pathFile)) {
            res.status(200).send(true)
        } else {
            res.status(200).send(false)
        }
    } catch (err) {
        res.status(400).send(`unexpected error happened`)
    }
})


router.get('/sed/download/:sedName', (req, res) => { // serves the generated SED visulization
    console.log("SEDNAME at /sed/download/" + req.params.sedName)
    res.status(200).sendFile(path.join(__dirname, "../../seds", `${req.params.sedName}.png`))
})

router.get('/sedReady/:rawdata', (req, res) => { // processes SED data ans creates visualization
    let rawData = decodeURIComponent(req.params.rawdata)
    let rowData = rawData.replace(/"/g, `'`)
    let d = new Date();
    // sedName = "sed" +rowData.substring(0, 30) 
    let sedName = "sed" + d.getTime() // generates a unique name for the SED file
    console.log("SEDNAME AT sedReady/:rawData " + sedName) // logs the SED name
    let pathFile = path.join(__dirname, "../../seds", `${sedName}.png`) // path to the SED file
    cigaleini = `/home/data/blackbase/cigale-v2022.0/pcigale.ini` // path to the cigale ini file

    exec(`/home/data/blackbase/webapp/BackEnd-Express/routes/api/cigale.py "${rowData}" ${sedName} ${pathFile} `, (error, stdout, stderr) => { // executes the cigale.py file
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }

        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        try {
            if (fs.existsSync(pathFile)) { // executes SED name if successful 
                console.log(`SED Found at ${pathFile}`)
                res.status(200).send(sedName)

            } else {
                console.log(`SED Not Found at ${pathFile}`)
                res.status(200).send(false)
            }
        } catch (err) {
            res.status(400).send(`unexpected error happened`)
        }
    });
})

//for dropdown suggestions with database columns
router.get('/columntable', (req, res) => { // gets the column names from the database
    try {
        db.sequelize 
            .query('SELECT * FROM Merged WHERE ( `RA`<1) LIMIT 100') // gets the column names from the database
            .then(response => { // then the response is sent to the client
                const arr = [] // creates an array
                const keys = Object.keys(response[0][0])
                    .filter((key) => !key.includes("QQupper") && !key.includes("QQlower") && !key.includes("Unnamed")) // filters out the columns that are not needed
                    .reduce((obj, key) => { // reduces the array to a single object
                        return Object.assign(obj, { // assigns the key to the object
                            [key]: response[0][0][key] // assigns the value to the key
                        });
                    }, {});

                for (let key in keys) { // for each key in the keys array
                    arr.push(key); // pushes the key to the array
                }

                res.status(200).send(arr)
            })

    } catch (error) {
        res.status(400).send(`unexpected error happened`)
    }
})

router.get('/:command', (req, res) => { // a querying process 
    let real_command = ComprehendCommand(req.params.command)
    console.log("Real command: " + real_command)
    db.sequelize
        .query(`SELECT COUNT(*) FROM Merged WHERE ${real_command} LIMIT 100;`) // counts how many results match the query
        .then(response => {
            // generate filename using timestamp
            let date = new Date()
            name = "query" + date.getTime()
            //creates three files, one for column names, or for actual data, one for header and content
            // let header_file = path.join(__dirname,"../../downloads",`header_${name}.csv`)
            // let content_file = path.join(__dirname,"../../downloads",`content_${name}.csv`)
            // let merged_file = path.join(__dirname,"../../downloads",`${name}.csv`)
            let header_file = `/home/data/blackbase/webapp/BackEnd-Express/downloads/header_${name}.csv`
            let content_file = `/home/data/blackbase/webapp/BackEnd-Express/downloads/content_${name}.csv`
            let merged_file = path.join(__dirname, "../../downloads", `${name}.csv`)
            // let merged_file = `/home/data/blackbase/webapp/BackEnd-Express/downloads/${name}.csv`


            db.sequelize
                .query(`SET group_concat_max_len = 5000`) // sets the maximum length of the group concat
            db.sequelize
                .query(`SELECT GROUP_CONCAT(CONCAT("'", COLUMN_NAME,"'")) from INFORMATION_SCHEMA.COLUMNS
                        WHERE TABLE_NAME ='Merged' 
                        INTO OUTFILE '${header_file}'   
                        `)
                .catch(error => console.log(error))

            db.sequelize
                .query(` SELECT * FROM Merged WHERE ${real_command}  INTO OUTFILE '${content_file}'  FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' ;`)
                .then(response => {
                    exec(`cat ${header_file} ${content_file} > ${merged_file}`) // concatenates the header and content files
                })
                .catch(error => console.log(error))
            // exec(`rm *`)
            exec(`cat ${header_file} ${content_file} > ${merged_file}`) // concatenates the header and content files

            if (response[0][0]["COUNT(*)"] < 500) { // if the number of results is less than 500
                db.sequelize
                    .query(`SELECT * FROM Merged WHERE ${real_command} LIMIT 100; `) // selects all the results from the database
                    .then(response => {
                        // console.log(response)
                        res.status(200).send(response) // sends the response to the client
                    })
                    .catch(error => res.status(400).send(error)) // catches the error and sends it to the client
            }
            else {
                db.sequelize
                    .query(`SELECT * FROM Merged WHERE ${real_command} LIMIT 100; `) // selects all the results from the database
                    .then(response => res.status(200).send(response)) // sends the response to the client
                    .catch(error => res.status(400).send(error)) // catches the error and sends it to the client
            }
        })
        .catch(error => res.status(400).json(error)) // catches the error and sends it to the client
})

// Get all AGN sources with their related data
router.get('/sources', async (req, res) => {
    try {
        const sources = await db.SourceAGN.findAll({
            include: [
                { model: db.Photometry },
                { model: db.Classification },
                { model: db.RedshiftMeasurement }
            ],
            limit: 100
        });
        res.status(200).json(sources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single AGN source by ID with all related data
router.get('/sources/:id', async (req, res) => {
    try {
        const source = await db.SourceAGN.findByPk(req.params.id, {
            include: [
                { model: db.Photometry },
                { model: db.Classification },
                { model: db.RedshiftMeasurement }
            ]
        });
        if (source) {
            res.status(200).json(source);
        } else {
            res.status(404).json({ message: 'Source not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Advanced search endpoint
router.get('/search', async (req, res) => {
    try {
        const { ra_min, ra_max, dec_min, dec_max, z_min, z_max, class_type } = req.query;
        
        let whereClause = {};
        let includeClause = [];
        
        // Add RA/DEC constraints if provided
        if (ra_min && ra_max) {
            whereClause.RA = { [db.Sequelize.Op.between]: [parseFloat(ra_min), parseFloat(ra_max)] };
        }
        if (dec_min && dec_max) {
            whereClause.DEC = { [db.Sequelize.Op.between]: [parseFloat(dec_min), parseFloat(dec_max)] };
        }
        
        // Add redshift constraints if provided
        if (z_min || z_max) {
            includeClause.push({
                model: db.RedshiftMeasurement,
                where: {
                    z_value: {
                        [db.Sequelize.Op.between]: [
                            parseFloat(z_min || 0),
                            parseFloat(z_max || 999)
                        ]
                    }
                }
            });
        } else {
            includeClause.push({ model: db.RedshiftMeasurement });
        }
        
        // Add classification constraints if provided
        if (class_type) {
            includeClause.push({
                model: db.Classification,
                where: {
                    [db.Sequelize.Op.or]: [
                        { spec_class: class_type },
                        { gen_class: class_type },
                        { xray_class: class_type },
                        { best_class: class_type }
                    ]
                }
            });
        } else {
            includeClause.push({ model: db.Classification });
        }
        
        // Always include Photometry
        includeClause.push({ model: db.Photometry });
        
        const sources = await db.SourceAGN.findAll({
            where: whereClause,
            include: includeClause,
            limit: 100
        });
        
        res.status(200).json(sources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get column names for the dropdown
router.get('/columntable', async (req, res) => {
    try {
        const sourceColumns = Object.keys(db.SourceAGN.rawAttributes);
        const photColumns = Object.keys(db.Photometry.rawAttributes);
        const classColumns = Object.keys(db.Classification.rawAttributes);
        const redshiftColumns = Object.keys(db.RedshiftMeasurement.rawAttributes);
        
        const allColumns = {
            source: sourceColumns,
            photometry: photColumns,
            classification: classColumns,
            redshift: redshiftColumns
        };
        
        res.status(200).json(allColumns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;


// var code3 = `SELECT * FROM morphology LEFT JOIN redshift ON (redshift.RA = morphology.RA AND redshift.Dec = morphology.Dec) LEFT JOIN photometry ON (photometry.RA = morphology.RA AND photometry.Dec = morphology.Dec) WHERE ${real_command} LIMIT 100;`

// var code2 = `SELECT * FROM morphology LEFT JOIN redshift ON (redshift.RA = morphology.RA AND redshift.Dec = morphology.Dec) LEFT JOIN photometry ON (photometry.RA = morphology.RA AND photometry.Dec = morphology.Dec) WHERE ${real_command}  INTO OUTFILE '${content_file}'  FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' ;`

// var code = `SELECT COUNT(*) FROM morphology 
// LEFT JOIN redshift ON (redshift.RA = morphology.RA AND redshift.Dec = morphology.Dec) 
// LEFT JOIN photometry ON (photometry.RA = morphology.RA AND photometry.Dec = morphology.Dec)
// WHERE ${real_command}`

// var code1 = `SELECT GROUP_CONCAT(CONCAT("'", COLUMN_NAME,"'")) from INFORMATION_SCHEMA.COLUMNS
// WHERE TABLE_NAME ='morphology' 
// OR (TABLE_NAME = 'redshift' AND NOT COLUMN_NAME REGEXP '^Unnamed' AND NOT COLUMN_NAME = 'RA' AND NOT COLUMN_NAME = 'Dec'  )
// OR (TABLE_NAME = 'photometry' AND NOT COLUMN_NAME REGEXP '^Unnamed' AND NOT COLUMN_NAME = 'RA' AND NOT COLUMN_NAME = 'Dec')
// INTO OUTFILE '${header_file}'`
