const express = require('express');

const app = express();
const port = 4500;
const host = '0.0.0.0';

const cors = require('cors');
app.use(cors({ origin: '*' }));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const fs = require('fs');
const path = require('path');
const moment = require('moment');

/**
 * Returns server status message.
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

/**
 * Simulate shipping notification.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * 
 * @throws {Error} - Throws an error if no data is provided.
 * - 400: No Data Provided!
 * 
 * @returns {void}
 * 
 */
app.post('/ship-notice', (req, res, next) => {
    try {
        if (!req.body) res.status(400).send('No Data Provided!');
        const doc = req.body.DataArea.AdvanceShipNotice.AdvanceShipNoticeHeader.DocumentID.ID;
        const sender = req.body.ApplicationArea.Sender;
        const answer = '000000' + (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000).toString();
        const response = {
            '@releaseID': '9.2',
            '@versionID': '2.13.0',
            ApplicationArea: {
                Sender: {
                    LogicalID: 'lid://infor.wm.vmzegwmsdb22-wmprd',
                    ComponentID: 'Warehouse Management'
                },
                CreationDateTime: new Date().toISOString(),
                BODID: `infor-nid:INFOR:${doc['@accountingEntity']}:${doc['@location']}:${answer}:1?AdvanceShipNotice&verb=Acknowledge`
            },
            DataArea: {
                Acknowledge: {
                    TenantID: 'INFOR',
                    AccountingEntityID: doc['@accountingEntity'],
                    LocationID: {
                        '@accountingEntity': doc['@accountingEntity'],
                        '#text': doc['@location']
                    },
                    OriginalApplicationArea: {
                        Sender: {
                            LogicalID: doc['@lid'],
                            ComponentID: sender.ComponentID,
                            ConfirmationCode: sender.ConfirmationCode
                        },
                        CreationDateTime: req.body.ApplicationArea.CreationDateTime,
                        BODID: req.body.ApplicationArea.BODID
                    },
                    ResponseCriteria: {
                        ResponseExpression: {
                            '@actionCode': 'Accepted',
                            '#text': 'Accepted'
                        }
                    }
                },
                AdvanceShipNotice: {
                    AdvanceShipNoticeHeader: {
                        DocumentID: {
                            ID: {
                                '@accountingEntity': doc['@accountingEntity'],
                                '@location': doc['@location'],
                                '#text': answer
                            }
                        },
                        AlternateDocumentID: {
                            ID: doc['#text']
                        }
                    }
                }
            }
        }
        res.send(response);
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