require('express-async-errors');
const express = require('express');

const app = express();

app.use(express.json());

app.use(require('./routers/login'));

app.use(require('./middlewares/error'));

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
