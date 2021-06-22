const { render } = require('art-template');
const express = require('express');
const home = express.Router();
home.get('/index', (req, res) => {
    res.render('index', {});
})
home.get('/adduser', (req, res) => {
    res.render('adduser', { name: 'hello' })
});
home.get('/inform', (req, res) => {
    res.render('systeminform', {});
})
module.exports = home;