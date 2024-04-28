const express = require('express');

const app = express();
const port = 3000;
const host = 'localhost';

const cors = require('cors');
app.use(cors({ origin: '*' }));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const fs = require('fs');
const path = require('path');
const moment = require('moment');

/**
 * Returns a simple ping response.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * 
 * @returns {void}
 *  
 */
app.get('/', (req, res) => {
    res.send(`Server is running at http://${host}:${port}`);
});

/**
 * Stores a file in the storage directory.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @throws {Error} - Throws an error if no body is provided.
 * - 400: No Data Provided!
 * - 500: Error Saving File: ${err}
 *
 * @returns {void}
 */
app.post('/store-file', (req, res, next) => {
    try {
        if (!req.body) res.status(400).send('No Data Provided!');
        const fileName = `${moment().format('YYYY-MM-DD_HH-mm-ss')}.json`;
        const filePath = path.resolve(__dirname, 'storage', fileName);
        const fileContent = JSON.stringify(req.body, null, 2);
        fs.writeFile(filePath, fileContent, 'utf8', (err) => { 
            if (err) res.status(500).send(`Error Saving File: ${err}`);
        });
        res.send(`File Saved: ${fileName}`);
    } catch (err) {
        next(err);
    }
});

/**
 * Returns a list of files in the storage directory.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * 
 * @throws {Error} - Throws an error if reading the storage failed.
 * - 500: Error Reading Storage: ${err}
 * 
 * @returns {void}
 * 
 */
app.post('/get-file-list', (req, res, next) => {
    try {
        const storage = path.resolve(__dirname, 'storage');
        fs.readdir(storage, (err, files) => {
            if (err) res.status(500).send(`Error Reading Storage: ${err}`);
            for (let i = 0; i < files.length; i++) {
                files[i] = files[i].replace('.json', '');
            }
            res.send(files);
        });
    } catch (err) {
        next(err);
    }
});

/**
 * Returns a file based on the provided file name.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * 
 * @throws {Error} - Throws an error if no file name is provided.
 * - 400: No File Name Provided!
 * - 404: File Not Found!
 * 
 * @returns {void}
 * 
 */
app.post('/get-file', (req, res, next) => {
    try {
        const storage = path.resolve(__dirname, 'storage');
        if (!req.body.file) res.status(400).send('No File Name Provided!');
        const file = path.resolve(storage, `${req.body.file}.json`);
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) res.status(404).send('File Not Found!');
            res.send(data);
        });
    } catch (err) {
       next(err);
    }
});

/**
 * Clears the storage directory.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * 
 * @throws {Error} - Throws an error if clearing the storage failed.
 * - 500: Error Reading Storage: ${err}
 * - 500: Error Deleting File: ${err}
 * 
 * @returns {void}
 * 
 */
app.post('/clear-storage', (req, res, next) => {
    try {
        const storage = path.resolve(__dirname, 'storage');
        fs.readdir(storage, (err, files) => {
            if (err) res.status(500).send(`Error Reading Storage: ${err}`);
            files.forEach(file => {
                fs.unlink(path.resolve(storage, file), (err) => {
                    if (err) res.status(500).send(`Error Deleting File: ${err}`);
                });
            });
        });
        res.send('Storage Cleared');
    } catch (err) {
        next(err);
    }
});

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}`);
});

module.exports = app;