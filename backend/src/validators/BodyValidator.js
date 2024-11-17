const Joi = require('joi');
const BodyValidator = Joi.object({
    phone: Joi.string()
        .pattern(/^\d{10}$/)
        .required()
        .messages({
            "string.pattern.base": "Phone number must be exactly 10 digits.",
            "any.required": "Phone number is required."
        }),
    message: Joi.string()
        .min(4)
        .max(255)
        .required()
        .messages({
            "string.min": "Message must be at least 4 characters.",
            "string.max": "Message cannot exceed 255 characters.",
            "any.required": "Message is required."
        }),
    repeat: Joi.string()
        .valid("0", "1", "10")
        .required()
        .messages({
            "any.only": "Repeat must be either '0', '1', or '10'.",
            "any.required": "Repeat is required."
        }),
    delay: Joi.number()
        .integer()
        .default(1)
        .messages({
            "number.base": "Delay must be an integer."
        }),
});


module.exports = { BodyValidator }