let returnObject = {};

returnObject.prepair = function(request, response, status, data, err){
    if(data !== undefined) {
        if(typeof data === 'object'){
            if(Array.isArray(data)){
                data = { value : data };
            }
        }
        else
            data = { value : data };
    }

    let errorDetail = !isNaN(parseFloat(err)) && isFinite(err) ?
        {
            message : err,
            id : err
        }
        :
        {
            message : err ,
            id: -1
        };
    let result = {
        data: data === undefined ? ( err === undefined ? { 'value' : 'true' } : { 'value' : 'false' } ): data,
        success : err === undefined ? true : false,
        error : err === undefined ? [] : [
            {
                code : status,
                detail : errorDetail
            }
        ]
    };
    return response.status(status).send(result);
}
module.exports = returnObject;