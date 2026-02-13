import { UserModel } from "../../models/user.model.js";

export async function findByEmail (email, password){
    return await UserModel.findOne({email: email})
}