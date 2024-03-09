const Http_STATUS = require('./http-status');
class Response {
    createSucessResponse(res,status,data) {
        res.status(Http_STATUS.SUCCESS).json({
            status,
            data
        });
    }

    createInternalErrorResponse(res, error) {
        res.status(Http_STATUS.BAD_REQUEST).json({
            status: 400,
            error:true,
            message: 'oops! something went wrong',
        });
    }
    
    createErrorResponse(res,error) {
        res.status(Http_STATUS.NOTFOUND).json({
            status:404,
            error:true,
            message: 'user not identified, please fill correct credentials',
        });
    }
};

module.exports = new Response();