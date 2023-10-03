import { Response, Request, NextFunction } from 'express'

const permissionLevels = {
    admin: 3,
    hr: 2,
    member: 1,
}

type Role = keyof typeof permissionLevels

// if the user has a role with a higher permission level than the route requires, then he can access it
export default function giveAccessTo(role: Role) {
    return (req: Request, res: Response, next: NextFunction) => {
        let userRole = req.user?.role as Role
        let isActive = req.user?.active as boolean

        if (permissionLevels[userRole] >= permissionLevels[role] && isActive) {
            next()
        } else if (!isActive) {
            res.status(403).send({
                status: 'failure',
                data: `Your account is inactive. Please contact an admin to activate your account.`,
            })
        } else if (permissionLevels[userRole] < permissionLevels[role]) {
            res.status(403).send({
                status: 'failure',
                data: `You don't have permission to access this route.`,
            })
        }
    }
}
