const blogPost = require('../database/blogPostQuerys.js');

exports.createPost = (req, res) => {

    if (!req.body) {

        res.status(400).send({
            message: "Content can not be null."
        })
    }

    let post = {
        id: 0,
        title: req.body.title,
        content: req.body.content,
        create_date: new Date()
    }

    blogPost.create(post, (err, data) => {
        if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the post."
        });
        else res.send(data);
    });

};

exports.findAll = (req, res) => {

    blogPost.getAll((err, data) => {
        if (err)                
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving tutorials."
            });
        else
            res.send(data);
    });
};

exports.findById = (req, res) => {

    blogPost.getById(req.params.id, (err, data) =>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving post."
            });
        else
            res.send(data);        
    });
};

exports.remove = (req, res) => {

    blogPost.remove(req.params.id, (err, data) =>{
        if (err) {
            if (err.kind === "not found") {
                res.status(404).send({
                    message: `Post with id:${req.params.id} not found.`
                })
            
            } else {
                res.status(500).send({
                    message: "Could not delete the post."
                })
            }
       } else res.send({message: "Post was deleted succesfully!"});
    });
};

exports.update = (req, res) => {

    if (!req.body) {

        res.status(400).send({
            message: "Content can not be null."
        })
    }    

    let post = {
        id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        create_date: req.body.create_date
    }    

    blogPost.update(post, (err, data) => {
        
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while updating the post."
            });
        else res.send(data);
    });
}