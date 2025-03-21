import { model, Schema } from "mongoose";

enum Status {
    IN_PROGRESS = 'IN_PROGRESS',
    ON_HOLD = 'ON_HOLD',
    FINISHED = 'FINISHED',
}

export interface Todo extends Document {
    title: string;
    notes?: string;
    status?: Status;
    createdAt: Date;
    updatedAt: Date;
    user?: string,
}

class TodoSchema {
    private static schema = new Schema<Todo>({
        title: {
            type: String,
            required: true
        },
        notes: {
            type: String,
        },
        status: {
            type: String,
            enum: Object.values(Status),
            default: Status.ON_HOLD
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }, {
        timestamps: true,
        toJSON: {
            transform(_, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            }
        }
    });

    public static model = model<Todo>('Todo', this.schema);
}

export default TodoSchema.model;
