require('express-async-errors');
const express = require('express');

const { blogPosts, categories, login, user } = require('./routers');
const { auth, error } = require('./middlewares');

const app = express();

app.use(express.json());

app.use('/login', login);
app.use('/user', user);

app.use([auth]);
app.use('/categories', categories);
app.use('/post', blogPosts);

app.all('*', (req, res) => res.status(404).json({ message: `Route '${req.path}' doesn't exist!` }));

app.use(error);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
