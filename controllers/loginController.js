const login = require('../database/loginQuerys.js');

exports.createUser = (req, res) => {

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

        if(err)
        {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while login in the user."
            })

            return;
        }

        if (!data) 
        {            
            res.send("Username or password is wrong!");
            return;
        }

        res.send("User logged succesfully!");        
    });

}