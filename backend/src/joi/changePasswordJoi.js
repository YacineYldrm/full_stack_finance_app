import Joi from 'joi'

const validatePassword = (user) =>{
    const schema = Joi.object({
        
        newPassword:  Joi.string()
        .regex(/[ -~]*[a-z][ -~]*/) // at least 1 lower-case
        .regex(/[ -~]*[A-Z][ -~]*/) // at least 1 upper-case
        .regex(/[ -~]*(?=[ -~])[^0-9a-zA-Z][ -~]*/) // basically: [ -~] && [^0-9a-zA-Z], at least 1 special character
        // .regex(/[ -~]*[0-9][ -~]*/) // at least 1 number
        .min(8)
        .required(),
        oldPassword: Joi.string(),
        forgotPassword: Joi.boolean()
    })
    return schema.validate(user)
}

const joiPasswordError = ()=>{
    return (req,res,next)=>{
        const { error } = validatePassword(req.body)
        console.log('error: ', error)
        if (error) {
            return res.status(400).json({success: false, error: error.details[0].message})
          }
          next()
    }
}

export default joiPasswordError