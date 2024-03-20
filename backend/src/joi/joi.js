import Joi from 'joi'

const validateUser = (user) => {
    const schema = Joi.object({
        
        firstName: Joi.string().min(3).max(30).required(),
        lastName: Joi.string().min(3).max(30).required(),
        phoneNumber: Joi.number(),
        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net", "de"] },
        }), //  - two domain parts (sample.com) - a top level domain (TLD) of either .com or .net or.de

        password: Joi.string()
            .regex(/[ -~]*[a-z][ -~]*/) // at least 1 lower-case
            .regex(/[ -~]*[A-Z][ -~]*/) // at least 1 upper-case
            .regex(/[ -~]*(?=[ -~])[^0-9a-zA-Z][ -~]*/) // basically: [ -~] && [^0-9a-zA-Z], at least 1 special character
            // .regex(/[ -~]*[0-9][ -~]*/) // at least 1 number
            .min(8)
            .required(),
    })
    return schema.validate(user)
}

const joiError = () => {
    return (req, res, next) => {
        const { error } = validateUser(req.body)

        if (error) {
            return res.status(400).json({ success: false, error: error.details[0].message })
        }
        next()
    }
}

export default joiError