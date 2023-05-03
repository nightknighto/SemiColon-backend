import { NextFunction } from "express";
import { Request, Response } from "express";
import { participant as ParticipantType } from "../../types/participant";
import ErrorWithStatusCode from "../../util/classes/ErrorWithStatusCode";
import { ValidateParticipant } from "../../util/data-validation/participant.validation";

export async function mwValidateParticipant(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { participant }: { participant: ParticipantType } = req.body;
    try {
        ValidateParticipant(participant);
        next();
    } catch (error: ErrorWithStatusCode | any) {
        res.status(error.statusCode).json({
            status: "failure",
            data: error.message,
        });
    }
}
