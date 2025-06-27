const aboutMe = require('../database/aboutMeQuerys.js');

exports.updateAboutMe = (req, res) => {

    if (!req.body) {

        res.status(400).send({
            message: "Content can not be null."
        });
    }

    let aboutMeObj = {
        id: req.body.id,
        about_me: req.body.about_me
    }

    aboutMe.update(aboutMeObj, (err, data) => {

        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error ocurred."
            })
         else res.send(data);
    });
};

exports.findAboutMe = (req, res) => {

    aboutMe.getResult((err, data) => {
        if (err)                
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving data."
            });
        else
            res.send(data);
    });
};