const express = require('express');
const path = require('path');
const formidable = require('formidable');
const Information = require('../model/information')
const User = require('../model/User')
const handle = express.Router();
handle.post('/loginUser', (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        let param = fields;
        User.find({ userid: param.userid, password: param.password })
            .then(result => {
                if (result.length == 0) {
                    res.send('fal')
                } else if (result[0].identify == 0) {
                    req.session.userid = result[0].userid;
                    req.session.name = result[0].name;
                    res.send('ok0');
                } else {
                    req.session.userid = result[0].userid;
                    req.session.name = result[0].name;
                    res.send('ok1');
                }
            })

    })
})

handle.post('/changeuserflag', (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        let param = fields;
        Information.updateOne({ userid: req.session.userid, infordate: param.time }, { userflag: 1 })
            .then(result => {
                res.send('ok');
            })
    })
})

handle.post('/changeadminflag', (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        let param = fields;
        Information.updateOne({ userid: param.userid, infordate: param.time }, { adminflag: 1 })
            .then(result => {
                res.send('ok');
            })
    })
})

handle.post('/changeadminflagdone', (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        let param = fields;
        console.log(param);
        Information.updateOne({ userid: param.userid, infordate: param.time }, { adminflag: 2 })
            .then(result => {
                res.send('ok');
            })
    })
})

handle.post('/delinformationImg', (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname.split('route')[0], 'public/uploads');
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        res.send({
            path: files.attrName.path.split('School repair management system')[1]
        });
    });
})

handle.post('/delinformation', (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        Information.create(fields).then(() => {
            res.send('ok');
        })
    })
})



handle.post('/delete', (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        let param = fields;
        Information.findOneAndDelete({ _id: param._id })
            .then(result => {
                res.send('ok');
            })
    })
})

handle.get('/logout', (req, res) => {
    if (req.session.userid) {
        delete req.session.userid;
        delete req.session.username;
    }
    res.redirect('/home/index')
})

handle.get('/adduser', (req, res) => {
    User.create({
        identify: 0,
        userid: '04182107',
        name: '江显栋',
        password: '199924',
        email: '905484640@qq.com',
        phoneNumber: '13502528065',
        IDCardNumber: '441402199911241015',
        enterDate: '2018-09-28',
        gender: '男',
        nation: '汉族',
        native: '广东梅州',
        person: '全日制本科在校生',
        political: '中国共青团团员',
        cardtype: '中国居民身份证',
        borndate: '1999-11-24'
    }).then((res) => {
        console.log(res);
    })
});


module.exports = handle;