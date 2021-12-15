class ErrorController {
    index(err, req, res, next) {
        err.status = err.status || 500;
        
        res.status(err.status).json({
            success: false,
            message: err.message 
        })
    }
}

module.exports = new ErrorController;