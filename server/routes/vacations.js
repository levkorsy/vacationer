var express = require("express");
var router = express.Router();
var VacationsController = require("../controllers/vacationsController");
var middleware = require("../middleware/middlevare");

/*  GET ALL VACATIONS. */
router.get("/", [middleware.authMiddleware],VacationsController.getAllVacations);

// GET CHART
router.get("/chart", [middleware.adminMiddleware], VacationsController.getChartData);


/* POST NEW VACATION. */

router.post("/new", [middleware.adminMiddleware], VacationsController.addNewVacation);

/* DELETE VACATION. */

router.delete("/:id", [middleware.adminMiddleware], VacationsController.deleteVacation);

/* EDIT VACATION. */

router.put("/edit", [middleware.adminMiddleware], VacationsController.editVacation);

/* FOLLOW VACATION. */

router.put("/follow", [middleware.subscriberMiddleware], VacationsController.followVacation);

module.exports = router;
