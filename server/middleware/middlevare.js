var jwt = require("jsonwebtoken");

authMiddleware = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];
    var decode = jwt.decode(bearerToken);

    // console.log("Hello decode", decode.currentUser);
    
    jwt.verify(bearerToken, "shanatovaumetuka", function(err, data) {
      if (err) {
        res.sendStatus(403);
      } else {
        req.currentUser = decode.currentUser;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};

adminMiddleware = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];
    jwt.verify(bearerToken, "shanatovaumetuka", function(err, data) {
      if (err) {
        res.sendStatus(403);
      } else {
        if (data.currentUser.role == 1) {
          next();
        } else {
          res.sendStatus(403);
        }
      }
    });
  } else {
    res.sendStatus(403);
  }
};

subscriberMiddleware = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];
    jwt.verify(bearerToken, "shanatovaumetuka", function(err, data) {
      if (err) {
        res.sendStatus(403);
      } else {
        console.log(data);
        
        if (data.currentUser.role == 2) {
          next();
        } else {
          res.sendStatus(403);
        }
      }
    });
  } else {
    res.sendStatus(403);
  }
};

module.exports = {
  authMiddleware,
  adminMiddleware,
  subscriberMiddleware
};
