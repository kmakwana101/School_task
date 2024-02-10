var express = require('express');
var router = express.Router();
const schoolController = require('../Controller/school.controller')
/* GET home page. */
router.post('/add', schoolController.add);
router.get('/show', schoolController.show);
router.patch('/update', schoolController.update);
router.delete('/delete', schoolController.delete);

module.exports = router;
