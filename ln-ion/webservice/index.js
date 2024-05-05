const express = require('express');

const app = express();
const port = 4500;
const host = '0.0.0.0';

const cors = require('cors');
app.use(cors({ origin: '*' }));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(`Server is running at http://${host}:${port}`);
});

const genericFileRouter = require('./src/routes/generic-file');
app.use('/file', genericFileRouter);

const shippingRouter = require('./src/routes/shipping');
app.use('/shipping', shippingRouter);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}`);
});

module.exports = app;