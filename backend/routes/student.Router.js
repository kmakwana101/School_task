var express = require('express');
var router = express.Router();
const studentController = require('../Controller/student.controller')
/* GET home page. */
router.post('/add', studentController.add);
router.get('/show', studentController.show);
router.patch('/update', studentController.update);
router.delete('/delete', studentController.delete);
// router.get('/students-with-marks', studentController.joindata);

module.exports = router;
