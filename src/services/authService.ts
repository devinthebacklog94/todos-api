import UserSchema, { User } from "../models/users";
import { generateJwt } from "../helpers/jwt";
import { comparePassword, passwordHash } from "../helpers/passwordHash";

interface SignInProps {
    id: string;
    token: string;
}

export const signUp = async (userBody: User): Promise<SignInProps> => {
    const { email, name, password } = userBody;

    if (!password || !email || !name) {
        throw new Error("Fields are missing");
    }

    const user = await UserSchema.findOne({ email });

    if (user?.email) {
        throw new Error("User already exist");
    }

    userBody.password = passwordHash(password);

    const { id, name: userName } = await UserSchema.create(userBody);

    const token = await generateJwt(id, userName);

    return {
        id,
        token
    };
}

export const signIn = async (email: string, password: string): Promise<SignInProps> => {
    const user = await UserSchema.findOne({ email });

    if (!user) throw new Error("User not found");

    const isValidPassword = comparePassword(password, user.password);

    if (!isValidPassword) throw new Error("Incorrect password");

    const token = await generateJwt(user.id, user.name);

    return {
        id: user.id,
        token
    }
}

export const renewJwtSession = async (id: string | undefined): Promise<string> => {
    if (!id || id.length === 0) {
        throw new Error("Error getting UID ");
    }

    const user = await UserSchema.findById(id);

    if (!user) throw new Error("Error getting user name");

    const token = await generateJwt(id!, user.name);
    return token;
}


