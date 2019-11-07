var connection = require("../services/mysql");

var multer = require("multer");

class VacationsController {
  static getAllVacations(req, res) {

    var userFollowId;
    if (req.currentUser !== undefined) {
      userFollowId = req.currentUser.id;
      
    } else {
      
      userFollowId = req.loginUser.id;


    }


    connection.query("SELECT * FROM vacations", function(err, rows, fields) {
      if (err) throw err;
      connection.query(
        `SELECT * FROM followers where user_id = ${userFollowId}`,
        function(err, rowsFoll, fields) {
          if (err) throw err;
          res.json({ rows, rowsFoll });
        }
      );
    });
  }

  static addNewVacation(req, res) {

    var storage = multer.diskStorage({
      destination: function(request, file, cb) {
        cb(null, "uploads");
      },
      filename: function(request, file, cb) {
        cb(null, file.originalname);
      }
    });
    var upload = multer({ storage: storage }).single("file");

    upload(req, res, function(err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).send(req.file);
    });

    var sql = `INSERT INTO vacations (description, destination, picture, date_from, date_to, price) VALUES ('${req.query.description}', '${req.query.destination}', '/static/${req.query.file}', '${req.query.date_from}', '${req.query.date_to}', '${req.query.price}')`;

    connection.query(sql, function(err, result) {
      if (err) throw err;
    });
  }

  static deleteVacation(req, res) {
    // DELETE VACATION
    var id = req.params.id;
    var sql = `DELETE FROM vacations where id = ${id}`;
    connection.query(sql, function(err, result) {
      if (err) throw err;
      res.status(200).send({ error: "boo:(" });
    });
  }

  static editVacation(req, res) {
    // EDIT VACATION
    var id = req.query.id;
    var sql = `UPDATE vacations SET description = '${req.query.description}', destination = '${req.query.destination}', picture='${req.query.picture}', date_from = '${req.query.date_from}', date_to = '${req.query.date_to}', price = '${req.query.price}'  where id = ${id}`;

    connection.query(sql, function(err, result) {
      if (err) throw err;
      res.status(200).send({ error: "boo:(" });
    });
  }

  static followVacation(req, res) {
    var id = req.query.id;
    var follow = req.query.follow;
    res.status(200).send({ error: "Error" });

    if (follow == "true") {
      var sqlTableVac = `UPDATE vacations SET followers = followers + 1  where id = ${id}`;
      var sqlTableFoll = `INSERT INTO followers (vacation_id, user_id) VALUES ('${req.query.id}', '${req.query.user_id}')`;
    } else {
      var sqlTableVac = `UPDATE vacations SET followers = followers - 1  where id = ${id}`;

      var sqlTableFoll = `DELETE FROM followers where vacation_id = ${id} AND user_id = ${req.query.user_id}`;
    }

    connection.query(sqlTableVac, function(err, result) {
      if (err) throw err;
      connection.query(sqlTableFoll, function(err, result) {
        if (err) throw err;
      });
    });
  }
  static getChartData(req, res) {
    // GET CHART DATA

    var sql = `SELECT destination, followers FROM vacations where followers > 0`;
    connection.query(sql, function(err, result) {
      if (err) throw err;

      res.json({ result });
    });
  }
}

module.exports = VacationsController;
