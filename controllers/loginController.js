const login = require('../database/loginQuerys.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

exports.createUser = (req, res) => {    

    if (!req.body.password) {

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

    if (Object.keys(req.body).length == 0 || req.body.password == "" || req.body.user == "") {

        res.status(401).send({
            message: "Access denied."
        })        

        return;
    }

    const user = {
        id: 0,
        user: req.body.user,
        password: req.body.password,
        active: '1'
    }

    login.logIn(user, (err, data) => {
                
        if(err) {

            res.status(500).send({
                message:
                    err.message || "Some error occurred while login in."
            })

            return;
        }
                                                             

        if (data.length == 0) {

            res.send("Either usernarme or password is wrong.");
            return;
        } 

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
        else {

            res.send("Either usernarme or password is wrong.");
            return;
        }   
            
    });

}