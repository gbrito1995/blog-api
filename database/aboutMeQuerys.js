const sql = require('./db.js');

const aboutMe = () => {
    this.id = 0,
    this.about_me = ""
}

aboutMe.update = (aboutMe, result) => {

    let query = "UPDATE ABOUT_ME SET ABOUT_ME = ? WHERE ID = ?";

    sql.query(query, [aboutMe.about_me, aboutMe.id], (err, res) =>{

        if (err) {
            result(null, err);
            return;
        }

        result(null, "Updated successfuly!");
    });
}

aboutMe.getResult = (result) => {

    let query = "SELECT * FROM ABOUT_ME";

    sql.query(query, (err, res) =>{

        if (err) {
            result(null, err);
            return;
        }

        result(null, res[0])
    });
}

module.exports = aboutMe;