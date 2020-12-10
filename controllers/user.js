const userModel = require('../models/user');
const constants = require('../utils/constants')
const utils = require('../utils')

exports.register = async (req, res, next) => {

    try {

        let user = await userModel.findOne({
            email: req.body.email.toLowerCase()
        })
        if (user) {
            return res.status(409).json({
                message: "Account exist already"
            })
        }

        user = await userModel.create(req.body)
        const token = utils.generateToken(user);

        return res.status(200).json({
            data: user,
            token: token
        })

    } catch (error) {

        next(error)
    }
}

exports.login = async (req, res, next) => {

    try {

        let user = {}

        if (req.body.account_type === constants.ACCOUNT_TYPE.STANDARD) {

            user = await userModel.findOne({
                email: req.body.email.toLowerCase()
            }).select('+password')

            if (user && !user.comparePassword(req.body.password)) {
                return res.status(403).json({
                    message: 'Incorrect password. Please check again.'
                })
            }
        } else {

            user = await userModel.findOne({
                social_id: req.body.social_id
            })
        }

        if (!user) {
            return res.status(403).json({
                message: 'User does\'nt exist. Please register.'
            })
        }

        const token = utils.generateToken(user);

        return res.status(200).json({
            data: user,
            token: token
        })

    } catch (error) {

        next(error)
    }
}

exports.read = async (req, res, next) => {

    try {

        const user = await userModel.findById(req.params.id)

        return res.status(200).json(user)

    } catch (error) {
        
        next(error)
    }
}

exports.retrieve = async (req, res, next) => {

    try {

        const users = await userModel.find(req.query)

        return res.status(200).json(users)

    } catch (error) {

        next(error)
    }
}

exports.update = async (req, res, next) => {

    try {

        const user = await userModel.findOneAndUpdate({
            _id: req.body.id
        }, req.body, {
            new: true
        })

        if (!user) {
            return res.status(403).json({
                message: 'User does\'nt exist. Please register.'
            })
        }

        return res.status(200).json({
            data: user,
            message: 'User profile has been updated'
        })

    } catch (error) {

        next(error)
    }
}

exports.delete = async (req, res, next) => {

    try {

        await userModel.findOneAndRemove({ _id: req.query.id })

        return res.status(200).json({ 
            message: 'User has been deleted'
        })

    } catch (error) {

        next(error)
    }
}