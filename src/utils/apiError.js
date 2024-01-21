class apiError extends Error{
    constructor(statusCode , message="Something Went Wrong",errors=[],stack=""){
        super(message),
        this.statusCode=statusCode,
        this.errors=errors,
        this.data=NULL,
        this.success=false,
        this.message=message

        if(stack){
            this.stack =stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {apiError}