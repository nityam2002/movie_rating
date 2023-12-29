import UserService, { CreateUserPayload, GetTokenPayload } from "../../services/user";

const queries = {
    getUserToken:async(_:any,payload:GetTokenPayload)=>{
        const token = UserService.getToken({email:payload.email, password:payload.password});
        return token;
    }
};

const mutations = {
    createUser: async(_:any,payload:CreateUserPayload)=>{
        const res = await UserService.createUser(payload);
        return res.id;
    }
};

export const resolvers = {queries, mutations};