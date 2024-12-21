const notFound = (req,res,next)=>{
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404)
    next(error)
}

const errorMiddleware = (err,req,res,next)=>{
    const errStatus = res.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack:process.env.ENV == 'DEVELOPMENT'? err.stack : {}
    })
}

export { errorMiddleware,notFound };