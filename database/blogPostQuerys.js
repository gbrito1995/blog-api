const sql = require('./db.js');

const blogPost = () => {
    this.id = 0,
    this.title = "",
    this.content = ""
    this.create_date = new Date()
}


blogPost.create = (blogPost, result) => {
    
    let query = `INSERT INTO POST SET ?`

    sql.query(query, blogPost, (err, res) => {

        if (err) {
            console.log("Error: " + err);
            result(null, err);
            return;
        }

        console.log(`Post created: ${res.insertId}`);
        result(null, {id: res.insertId});        
    });
}

blogPost.getAll = (result) => {
    
    let query = 'SELECT * FROM POST ORDER BY CREATE_DATE DESC';

    sql.query(query, (err, res) => {
        
        if (err) {

            console.log("Error: " + err);
            result(null, err);
            return;
        }        

        console.log(`Posts: ${res}`);
        result(null, res);
    });

}

blogPost.getById = (id, result) => {

    let query = `SELECT * FROM POST WHERE ID = ${id} ORDER BY CREATE_DATE DESC`;    

    sql.query(query, (err, res) => {

        if (err) {
            console.log("Error: " + err);
            result(null, err);
            return;
        }

        console.log(`Post: ${id}`);
        result(null, res);
    })
}

blogPost.getList = (result) => {    
    
    let query = `SELECT ID,TITLE, CREATE_DATE FROM POST ORDER BY CREATE_DATE DESC`;    

    sql.query(query, (err, res) => {

        if (err) {
            console.log("Error: " + err);
            result(null, err);
            return;
        }
        
        result(null, res);
    })
}

blogPost.remove = (id, result) => {

    let query = `DELETE FROM POST WHERE ID = ${id}`;

    sql.query(query, (err, res) => {
        
        if (err) {
            console.log("Error: " + err);
            result(null, err);
            return;            
        }

        if (res.affectedRows == 0)
        {
            result({ kind: "not_found" }, null);
            return;
        }
    
        console.log(`Post deleted with the id: ${id}`);
        result(null, res);
    })
}

module.exports = blogPost;