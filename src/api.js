require('express-async-errors');
const express = require('express');

const { auth, error } = require('./middlewares');

const app = express();

app.use(express.json());

app.use('/login', require('./routers/login'));
app.use('/user', require('./routers/user'));

app.use([auth]);
app.use('/categories', require('./routers/categories'));
app.use('/post', require('./routers/blogPosts'));

app.all('*', (req, res) => res.status(404).json({ message: `Route '${req.path}' doesn't exist!` }));

app.use(error);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
