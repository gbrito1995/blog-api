const sql = require('./db.js');

const blogPost = () => {
    this.id = 0,
    this.title = "",
    this.content = ""
    this.create_date = new Date()
    this.active = ""
}


blogPost.create = (blogPost, result) => {
    
    let query = `INSERT INTO POST SET ?`

    sql.query(query, blogPost, (err, res) => {

        if (err) {            
            result(null, err);
            return;
        }        
        result(null, {id: res.insertId});        
    });
}

blogPost.update = (blogPost, result) => {    

    let query = `UPDATE POST SET TITLE = ?, CONTENT = ?, ACTIVE = ? WHERE ID = ?`
    
    sql.query(query, [blogPost.title, blogPost.content, blogPost.active, blogPost.id], (err, res) => {

        if (err) {
            result(null, err);
            return;
        }

        result(null, "Register updated successfuly.")

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
                
        result(null, res[0]);
    })
}

blogPost.getByTitle = (title, result) => {

    let query = `SELECT * FROM POST WHERE TITLE = '${title}' ORDER BY CREATE_DATE DESC`;    

    sql.query(query, (err, res) => {

        if (err) {
            console.log("Error: " + err);
            result(null, err);
            return;
        }
        
        console.log(res);

        result(null, res[0]);
    })
}

blogPost.getList = (result) => {    
    
    let query = `SELECT ID,TITLE, CREATE_DATE FROM POST WHERE ACTIVE = '1' ORDER BY CREATE_DATE DESC`;    

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

blogPost.getPaginated = (offset, result) => {
    
    console.log(offset)

    let query = `SELECT * FROM POST ORDER BY CREATE_DATE DESC LIMIT 1 OFFSET ${offset}`;

    sql.query(query, (err, res) => {
        
        if (err) {

            result(null, "Error while retrieving data.");
            return;
        }        

        console.log(`Posts: ${res}`);
        result(null, res);
    });

}

module.exports = blogPost;