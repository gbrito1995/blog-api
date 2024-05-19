const login = require('../database/loginQuerys.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

exports.createUser = (req, res) => {

    if (!req.body) {

        res.status(400).send({
            message: "Content can not be null."
        })
    }

    const hash = bcrypt.hashSync(req.body.password, saltRounds);

    const user = {
        id: 0,
        user: req.body.user,
        password: hash,
        active: null
    }

    login.create(user, (err, data) => {

        if(err)
        {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
            })

            return;
        }

        res.send("User created succesfully");

    });
}

exports.loginUser = (req, res) => {

    if (!req.body) {

        res.status(400).send({
            message: "Content can not be null."
        })
    }

    const user = {
        id: 0,
        user: req.body.user,
        password: req.body.password,
        active: null
    }

    login.logIn(user, (err, data) => {

        if(err) {

            res.status(500).send({
                message:
                    err.message || "Some error occurred while login in the user."
            })

            return;
        }

        if (data) {                           

            if (bcrypt.compareSync(user.password, data[0].PASSWORD)) {
                
                let token = jwt.sign(
                    { 
                        user: data[0].USER,
                        active: data[0].ACTIVE
                    }, 
                    `${process.env.SECRET_PASS}`, 
                    { expiresIn: '8h' }
                ); 

                res.send({accessToken: token});        
                return;
            }
            
            res.send("Either usernarme or password is wrong.");
            return;
        }   
        
        else res.status(500).send("Something wrong with the service. Try later.");
    });

}