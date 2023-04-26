import mongoose, { Schema, Document, Types, ObjectId } from "mongoose";

export interface IValidate extends Document {
    userId: ObjectId;
    ideaId: ObjectId;
    status: boolean;
    points: number,
    validateAnswer: Object;
    validatedCount: number;
}

const ValidateIdeaSchema = new Schema<IValidate>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    ideaId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Idea'
    },
    validateAnswer: [
        {
            question: { type: String },
            answer_A: { type: String },
            answer_B: { type: String},
            answer_C: { type: String},
            answer_D: { type: String},
        }
    ],
    status: {
        type: Boolean,
        default: true
    },
    points: {
        type: Number
    },
    validatedCount:{
        type: Number
    }
}, {
    timestamps: true
    }
)

export default mongoose.model<IValidate>('ValidateIdea', ValidateIdeaSchema)
