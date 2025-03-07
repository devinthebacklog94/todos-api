import bcrypt from "bcryptjs";

import UserSchema, { User } from "../models/users";
import { generateJwt } from "../helpers/jwt";

interface SignInProps {
    id: string;
    token: string;
}

export const newUser = async (userBody: User): Promise<{ id: string; token: string; }> => {
    const { email, password } = userBody;

    let user = await UserSchema.findOne({ email });

    if (user)
        throw new Error("User already exist");

    user = new UserSchema(userBody);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const token = await generateJwt(user.id, user.name);

    return {
        id: user.id,
        token
    };
}

export const signIn = async (email: string, password: string): Promise<SignInProps> => {
    const user = await UserSchema.findOne({ email });

    if (!user) throw new Error("User not found");

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) throw new Error("Incorrect password");

    const token = await generateJwt(user.id, user.name);

    return {
        id: user.id,
        token
    }
}

export const getUserProfile = async (id: string | undefined): Promise<User> => {
    if (!id) throw new Error("Bad request");

    const user = await UserSchema.findById(id);

    if (!user) throw new Error("User not found");

    return user;
}

export const renewJwtSession = async (id: string | undefined): Promise<string> => {
    if (!id) throw new Error("Error getting UID ");

    const user = await UserSchema.findById(id);

    if(!user) throw new Error("Error getting user name");

    const token = await generateJwt(id, user.name);
    return token;
}


