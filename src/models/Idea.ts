//import mongoose, {Document, model, Schema} from "mongoose";
import mongoose, { Schema, Document, Types, ObjectId } from "mongoose";

export interface IIdea extends Document {
    userId: ObjectId;
    ageGroup: string;
    gender: string;
    maritalStatus: string;
    occupption: string;
    country: string;
    state: string;
    city: string,
    title: string,
    description: string,
    status: boolean,
    points: number,
    views: number,
    validated: number,
    validateQuestion: Object
}

const IdeaSchema = new Schema<IIdea>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        ageGroup: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        maritalStatus: {
            type: String,
            required: true
        },
        occupption: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        status: {
            type: Boolean,
            default: true
        },
        //is_active:  { type: Boolean, default: true },
        validateQuestion: [
            {
                question: { type: String },
                answer_A: { type: String },
                answer_B: { type: String},
                answer_C: { type: String},
                answer_D: { type: String},
            }
        ],
        points: {
            type: Number
        },
        views: {
            type: Number
        },
        validated:{
            type: Number
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model<IIdea>('Idea', IdeaSchema)

