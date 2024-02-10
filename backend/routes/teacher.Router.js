var express = require('express');
var router = express.Router();
const teacherController = require('../Controller/teacher.controller')
/* GET home page. */
router.post('/add', teacherController.add);
router.get('/show', teacherController.show);
router.patch('/update', teacherController.update);
router.delete('/delete', teacherController.delete);

module.exports = router;
