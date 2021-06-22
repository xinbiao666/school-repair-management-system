const express = require('express');
const path = require('path');
const session = require('express-session');

const bodyParser = require('body-parser');

require('./model/connect');


const user = require('./route/user');
const home = require('./route/home');
const handle = require('./route/handle');

const app = express();

app.engine('art', require('express-art-template'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'secret key' }));

app.use('/home', (req, res, next) => {
    let url = req.url.split('?')[0];
    if (url != '/index' && !req.session.userid) {
        res.redirect('/home/index');
    } else {
        next()
    }
})

app.use('/user', (req, res, next) => {
    if (!req.session.userid) {
        res.redirect('/home/index');
    } else {
        next()
    }
})

app.use('/home', home);
app.use('/user', user);
app.use('/handle', handle);

app.use((req, res) => {
    res.send('404 error');
})

app.listen(80);
console.log('服务器启动成功');