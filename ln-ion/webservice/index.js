const express = require('express');

const app = express();
const port = 3000;
const host = 'localhost'; //sunspear.entiac.local

const cors = require('cors');
app.use(cors({ origin: '*' }));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const fs = require('fs');
const path = require('path');
const moment = require('moment');

app.get('/ping', (req, res) => {
    res.send(`Server is running at http://${host}:${port}`);
});

app.post('/store-file', (req, res, next) => {
    try {
        const fileName = `${moment().format('YYYY-MM-DD_HH-mm-ss')}.json`;
        const filePath = path.resolve(__dirname, 'storage', fileName);
        const fileContent = JSON.stringify(req.body, null, 2);
        fs.writeFile(filePath, fileContent, 'utf8', (err) => { 
            if (err) throw new Error('Error Saving File: ' + err);
        });
        res.send('File Saved: ' + fileName);
    } catch (err) {
        next(err);
    }
});

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}`);
});

module.exports = app;