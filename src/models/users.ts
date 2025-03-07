import { Document, model, Schema } from "mongoose";

export interface User extends Document {
    name: string;
    email: string;
    password: string;
}

class UsersSchema {
    private static schema = new Schema<User>({
        name: {
            type: String, 
            required: true
        },
        email: {
            type: String,
            required: true, 
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    }, {
        timestamps: true,
        toJSON: {
            transform(_, ret) {
                delete ret.password;
                delete ret.__v;
            }
        }
    })

    public static model = model<User>('User', this.schema);
}

export default UsersSchema.model;
