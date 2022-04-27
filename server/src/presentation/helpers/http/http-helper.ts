import { ServerError } from "../../errors"
import { HttpResponse } from "../../protocols/http"

export const badRequest = (error: Error): HttpResponse => {
    return {
        statusCode: 400,
        data: {
            status: "Error",
            message: error
        }
    }
}

export const externalServerError = (error: Error): HttpResponse => {
    return {
        statusCode: 500,
        data: {
            status: "Error",
            message: error
        }
    }
}

export const serverError = (error: Error): HttpResponse => {
    return {
        statusCode: 500,
        data: {
            status: "Error",
            message: new ServerError(error.stack)
        }
    }
}

export const success = (data: any): HttpResponse => {
    return {
        statusCode: 200,
        data: data
    }
}