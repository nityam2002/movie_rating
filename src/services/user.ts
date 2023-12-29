import { ValidationError } from "../errors/customError"
import { prismaClient } from "../lib/db"
import { createHmac, randomBytes } from "node:crypto"
import JWT from "jsonwebtoken"



const JWT_SECRET = "random_jwt_token_@#123"
export interface CreateUserPayload {
    firstName: string,
    lastName?: string,
    email: string,
    password: string
}
export interface GetTokenPayload{
    email:string,
    password:string
}
class UserService {

    public static createUser(payload: CreateUserPayload) {

        const { firstName, lastName, email, password } = payload
        const salt = randomBytes(32).toString('hex');
        const hashedPassword = UserService.generateHash(salt,password);
        return prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                salt,
                password: hashedPassword,
            }
        })
    }
    private static generateHash(salt:string, password:string){
        const hashedPassword = createHmac('sha256', salt).update(password).digest('hex')
        return hashedPassword;
    }
    private static getUserbyEmail(email:string){
        return prismaClient.user.findUnique({where:{email}})
    }
    public static async getToken(payload:GetTokenPayload){
        const {email,password} = payload;
        const user = await UserService.getUserbyEmail(email);
        if(!user){
            throw new ValidationError('Credentials Invalid');
        }
        const userSalt = user.salt;
        const userHashPassword = UserService.generateHash(userSalt,password);
        if(userHashPassword!==user.password){
            throw new ValidationError('Credentials Invalid');
        }
        const token = JWT.sign({ id: user.id, email: user.email }, JWT_SECRET);
        return token;


    }
}

export default UserService