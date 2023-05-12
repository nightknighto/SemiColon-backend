import { Request, Response } from "express";

export function successfulLogin(req: Request, res: Response) {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.description = 'Endpoint to authenticate successful login'
   */
  res.status(200).json({ status: "success", data: "Successful login" });
}

export function failedLogin(req: Request, res: Response) {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.description = 'Endpoint to authenticate failed login'
   */
  res.status(401).json({
    status: "failure",
    data: "Invalid phone number or password",
  });
}
