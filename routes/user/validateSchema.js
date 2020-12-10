const Joi = require('joi');

exports.read = {

    params: Joi.object({
        id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
    })
}

exports.retrieve = {    

    query: Joi.object({
        email: Joi.string().email(),
        offset: Joi.number(),
        limit: Joi.number(),
        sort_by: Joi.string(),
        order_by: Joi.string()
    })
}

exports.update = {

    body: Joi.object({
        id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
        email: Joi.string().email(),
    })
}

exports.delete = {
    
    query: Joi.object({
        id: Joi.string().required().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).length(24),
    })
}