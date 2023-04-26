import mongoose, {Document, model, Schema} from "mongoose";

export interface IUser {
    fullName: string;
    email: string;
    password: string;
    contactNumber: string;
    images: object;
    ageGroup: string;
    gender: string;
    country: string;
    state: string;
    city: string;
    maritalStatus: string;
    occupation: string;
    experties: string;
    following: number;
    followers: number;
    point: number;
    rewardPoint: number;
}

export interface IUserModel extends IUser, Document {

}

const UserSchema: Schema = new Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        email: {type: String,
            required: true,
            unique: true
        },
        contactNumber: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
            //select: false 
        },
        images: {
            type:Object
        },
        ageGroup: {
            type: String
        },
        gender: {
            type: String
        },
        country: {
            type: String
        },
        state: {
            type: String
        },
        city: {
            type: String
        },
        maritalStatus: {
            type: String
        },
        occupation: {
            type: String
        },
        experties: {
            type: String
        },
        point: {
            type: Number
        },
        rewardPoint: {
            type: Number
        },
        following: {
            type: Number
        },
        followers: {
            type: Number
        },
        authToken: {
            type: String
        },
        /*
        following: [
            {
                user:{ 
                    type: Schema.ObjectId, 
                    ref: 'User' 
                },
            }
    
        ],
        followers: [
            {
                user:{ 
                    type: Schema.ObjectId, 
                    ref: 'User' 
                },
            }
        ],
        */
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUserModel>('User', UserSchema)