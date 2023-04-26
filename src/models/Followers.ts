import mongoose, { Schema, Document, Types, ObjectId } from "mongoose";

export interface IFollowers extends Document {
    userId: ObjectId;
    followerId: ObjectId;
    followerName: string,
    message: string;
    status: string;
}

export interface IFollowersModel extends IFollowers, Document {

}

const FollowerSchema: Schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        followerId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        followerName: {
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

export default mongoose.model<IFollowers>('Followers', FollowerSchema)