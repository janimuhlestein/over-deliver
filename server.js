const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'Super super secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    maxAge: 10 * 60 * 1000,
    store: new SequelizeStore({
        db: sequelize
    }),
    rolling: true
};

app.use(session(sess));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});