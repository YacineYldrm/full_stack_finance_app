



const catchAsync = (ctrlFn, status = 500, message = "Internal Server error") => {
    return (req, res, next) =>
        ctrlFn(req, res, next).catch(error => {
            res.status(status).json({ success: false, error, message: error.message || message })
        })
}


export default catchAsync;