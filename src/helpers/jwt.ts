import JWT from "jsonwebtoken";

export const generateJwt = (uid: string, name: string ): Promise<string> => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid, name
        };

        JWT.sign(payload, process.env.SECRET_JWT_SEED || '', {
            expiresIn: "2h",
        }, (error, token) => {
            if(error) {
                reject("Can not generate JWT")
            }

            resolve(token as string);
        });
    })
}