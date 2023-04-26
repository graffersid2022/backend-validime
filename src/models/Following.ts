import mongoose, { Schema, Document, Types, ObjectId, mongo } from "mongoose";

export interface IFollowing extends Document {
    userId: ObjectId;
    followingId: ObjectId;
    followingName: string,
    notificationType: string;
    message: string;
    status: string;
}

export interface IFollowingModel extends IFollowing, Document {
    
}

const FollowingSchema: Schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        followerId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        followingName: {
            type: String
        },
        notificationType: {
            type: String
        },
        message: {
            type: String
        },
        status: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model<IFollowing>('Following', FollowingSchema)







