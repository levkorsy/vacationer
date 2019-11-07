var connection = require("../services/mysql");
const jwt = require("jsonwebtoken");

class UserController {
  // ADD NEW USER
  static addNewUser(req, res) {
    var sql = `INSERT INTO users (first_name, last_name, password, user_name) VALUES ('${req.query.firstName}', '${req.query.lastName}', '${req.query.password}', '${req.query.userName}')`;

    // CHECK IF USER IS EXIST
    connection.query(
      `SELECT * FROM users  WHERE user_name = '${req.query.userName}'`,
      (err, rows, fields) => {
        if (err) throw err;
        if (rows[0] == undefined) {
          connection.query(sql, (err, result) => {
            if (err) throw err;
            let currentUser = {
              user_name: req.query.userName,
              firstName: req.query.firstName,
              lastName: req.query.lastName,
              role: 2,
              id: result.insertId
            };
            console.log(currentUser);

            jwt.sign({ currentUser }, "shanatovaumetuka", (err, token) => {
              res.status(200).json({ token, currentUser });
            });
          });
        } else {
          res.status(403).send({ error: "User with this name is exist" });
        }
      }
    );
  }
  // LOGIN USER
  static loginUser(req, res) {
    var sql = `SELECT * FROM users  WHERE user_name = '${req.query.userName}'`;

    connection.query(sql, (err, rows, fields) => {
      if (err) throw err;
      if (rows[0] == undefined) {
        res.status(403).json({ error: "No user with this name" });
      } else {
        if (req.query.password == rows[0].password) {
          var loginUser = rows[0];
          var currentUser = {
            firstName: loginUser.first_name,
            lastName: loginUser.last_name,
            role: loginUser.role,
            id: loginUser.id
          };
          jwt.sign({ currentUser }, "shanatovaumetuka", (err, token) => {
            res.status(200).json({ token, currentUser });
          });
        } else {
          res.status(403).json({ error: "Password is incorrect" });
        }
      }
    });
  }
}

module.exports = UserController;
