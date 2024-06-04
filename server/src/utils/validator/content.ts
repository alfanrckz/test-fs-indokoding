import joi = require("joi");

export const createContentSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    description: joi.string().required(),
    created_by: joi.number().required(),

});

export const updateContentSchema = joi.object({
    name: joi.string().optional(),
    price: joi.number().optional(),
    image: joi.string().optional(),
    description: joi.string().optional(),
    updated_at: joi.date().optional()
})