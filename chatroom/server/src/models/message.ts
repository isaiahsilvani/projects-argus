import mongoose, { Schema } from 'mongoose'
import IMessage from '../interfaces/message'


const MessageSchema: Schema = new Schema(
  {
      username: { type: String, required: true },
      message: { type: String },
      time: { type: String }
  },
  {
      timestamps: true
  }
);

// EXTRA FUNCTIONALITY OF TYPESCRIPT ALERT - post/pre function
// Choose one of the actions you want to bind the post operation to
MessageSchema.post<IMessage>('save', function () {
  this.time = "the current time"
});


export default mongoose.model<IMessage>('Book', MessageSchema);