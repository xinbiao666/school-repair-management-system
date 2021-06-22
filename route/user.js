const express = require('express');
const session = require('express-session');
const user = express.Router();
const formidable = require('formidable');
const Information = require('../model/information');
const User = require('../model/User');

user.get('/userinform', async (req, res) => {
    let userinform = await User.find({ userid: req.session.userid });
    console.log(userinform)
    res.render('userinform', { userinform: userinform[0] })
});

user.get('/shortmessage', async (req, res) => {
    console.log(req.session.userid)
    let information = await Information.find({ userid: req.session.userid });
    let newinformation = [];
    let tem = 0;
    for (let i = 0; i < information.length; i++) {
        if (information[i].adminflag != 0) {
            newinformation[tem] = information[i];
            tem++;
        }
    }
    console.log(newinformation.length)
    res.render('shortmessage', { informations: newinformation, length: newinformation.length });
})
user.get('/usermessage', (req, res) => {
    console.log(req.query)
    Information.find({ userid: req.session.userid, infordate: req.query.time })
        .then(result => {
            if (result.length == 0) {
                res.send('404 error');
            } else {
                res.render('usermessage', { param: result[0] })
            }
        })
})
user.get('/repairinform', (req, res) => {
    console.log(req.query)
    Information.find({ userid: req.query.userid, infordate: req.query.time })
        .then(result => {
            if (result.length == 0) {
                res.send('404 error');
            } else {
                res.render('repairinform', { param: result[0] })
            }
        })
})

user.get('/repairinformdone', (req, res) => {
    console.log(req.query)
    Information.find({ userid: req.query.userid, infordate: req.query.time })
        .then(result => {
            if (result.length == 0) {
                res.send('404 error');
            } else {
                res.render('repairinformdone', { param: result[0] })
            }
        })
})

user.get('/message', async (req, res) => {
    let information = await Information.find();
    res.render('message', { informations: information, length: information.length });
})
user.get('/information', async (req, res) => {
    if (req.session.userid) {
        let temp = await User.find({ userid: req.session.userid });
        res.render('information', {
            userid: req.session.userid,
            name: req.session.name,
            phonenumber: temp[0].phoneNumber
        })

    } else {
        res.redirect('/home/index')
    }

})


user.get('/historymes', (req, res) => {
    Information.find({ userid: req.query.userid, infordate: req.query.time })
        .then(result => {
            if (result.length == 0) {
                res.send('404 error');
            } else {
                res.render('historymes', { param: result[0] })
            }
        })
})

user.get('/history', async (req, res) => {
    console.log(req.session.userid)
    let information = await Information.find({ userid: req.session.userid });
    console.log(information.length)
    res.render('history', { informations: information, length: information.length });
})

user.get('/adminhistory', async (req, res) => {
    let information = await Information.find();
    res.render('history', { informations: information, length: information.length });
})

user.get('/userindex', async (req, res) => {
    let information = await Information.find({ userflag: 0, adminflag: 1 });
    let unread = information.length;
    res.render('userindex', { username: req.session.name, unread });
})

user.get('/maintainindex', async (req, res) => {
    let information = await Information.find({ adminflag: 0 });
    let unread = information.length;
    res.render('maintainindex', { username: req.session.name, unread });
})
module.exports = user;