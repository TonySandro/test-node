import { ServerError } from "../../errors"
import { HttpResponse } from "../../protocols/http"

export const badRequest = (error: Error): HttpResponse => {
    return {
        statusCode: 400,
        data: {
            Status: "Error",
            Message: error
        }
    }
}

export const externalServerError = (error: Error): HttpResponse => {
    return {
        statusCode: 500,
        data: {
            Status: "Error",
            Message: error
        }
    }
}

export const serverError = (error: Error): HttpResponse => {
    return {
        statusCode: 500,
        data: {
            Status: "Error",
            Message: new ServerError(error.stack)
        }
    }
}

export const success = (data: any): HttpResponse => {
    return {
        statusCode: 200,
        data: data
    }
}