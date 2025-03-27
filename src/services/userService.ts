import UserSchema, { User } from "../models/users";

export const getUserProfile = async (id: string | undefined): Promise<User> => {
    if (!id) throw new Error("Bad request");

    const user = await UserSchema.findById(id);

    if (!user) throw new Error("User not found");

    return user;
}
