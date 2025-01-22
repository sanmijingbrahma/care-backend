const Joi = require("joi");


// Validating schema for resource creation/updating
const resourceSchema = Joi.object({
    name: Joi.string().max(255).required(),
    description: Joi.string().required(),
    quantity: Joi.number().integer().min(0).required(),
    createdBy: Joi.string().required(),
})


exports.validateResource = (req, res, next) => {
    const { err } = resourceSchema.validate(req.body);
    if (err) {
        return res.status(400).json({ error: err.details[0].message });
    }
    next();
};