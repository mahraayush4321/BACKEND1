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
}

module.exports = new Response();