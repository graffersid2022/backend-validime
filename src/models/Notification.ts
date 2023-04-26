import mongoose, { Schema, Document, Types, ObjectId } from "mongoose";

export interface INotification extends Document {
    sender_id: ObjectId;
    receiver_id: ObjectId;
    notification_type: string;
    message: string;
    status: boolean;
}

export interface INotificationModel extends INotification, Document {

}

const NotificationSchema: Schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        fullName: {
            type: String
        },
        imageURL: {
            type: String
        },        
        notification_type: {
            type: String
        },
        message: {
            type: String
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model<INotification>('Notification', NotificationSchema)