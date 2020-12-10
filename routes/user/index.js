const express = require('express');
const userCtr = require('../../controllers/user')
const middleware = require('../../utils/middleware');
const expressValidation = require('express-joi-validation');
const validateSchema = require('./validateSchema');
const validator = expressValidation.createValidator({ passError: true });
const router = express.Router();

router.use(middleware.isAuthenticated);

router.get('/:id', validator.params(validateSchema.read.params), userCtr.read)
router.get('/', validator.query(validateSchema.retrieve.query), userCtr.retrieve)
router.patch('/', validator.body(validateSchema.update.body), userCtr.update)
router.delete('/', validator.query(validateSchema.delete.query), userCtr.delete)

module.exports = router