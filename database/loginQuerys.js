const sql = require('./db.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const user = () => {
    this.id = 0,
    this.user = "",
    this.password = ""
    this.active = ""
}

user.create = (user, result) => {
    
    const hash = bcrypt.hashSync(user.password, saltRounds);
    user.password = hash;
    user.active = '1';

    let query = "INSERT INTO USER_CMS SET ?";
        
    sql.query(query, user, (err, res) => {

        if (err) {
            result(null, err);
            return;
        }

        result(null, {id: res.insertedId});
    });
}

user.logIn = (user, result) => {

    let query = `SELECT * FROM USER_CMS WHERE USER = ?`;

    sql.query(query, [user.user],  (err, res) => {

        if (err) {
            console.log(err);
            result(null, err);
            return;
        }    

        if (bcrypt.compareSync(user.password, res[0].PASSWORD))
            return result(null, true);
        
        return result(null, false);
    });
}

module.exports = user;