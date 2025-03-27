import bcrypt from "bcryptjs";

export const passwordHash = (password: string) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}

export const comparePassword = 
    (inputPassword: string, userPassword: string) => bcrypt.compareSync(inputPassword, userPassword);

