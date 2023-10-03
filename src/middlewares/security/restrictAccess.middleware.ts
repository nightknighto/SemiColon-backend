import { Request, Response } from 'express'

let whiteList: string[] = [
    /* TODO: add origin of hosted frontend */
]

/*
	This middleware is to restrict access to the API to only the whiteListed origins
	it is not like cors middleware, cors is used to secure the client from malicious websites
	but this middleware is used to secure the API from malicious clients
*/
export default function restrictAccess(
    req: Request,
    res: Response,
    next: Function,
) {
    const { origin } = req.headers
    if (whiteList.includes(origin as string)) {
        next()
    } else {
        res.status(403).json({
            status: 'failure',
            data: 'Access denied',
        })
    }
}
