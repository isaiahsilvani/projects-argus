import mongoose, { Schema } from 'mongoose'
import IMessage from '../interfaces/message'


const MessageSchema: Schema = new Schema(
  {
      username: { type: String, required: true },
      message: { type: String, required: true},
      time: { type: String }
  },
  {
      timestamps: true
  }
);

// EXTRA FUNCTIONALITY OF TYPESCRIPT ALERT - post/pre function
// Choose one of the actions you want to bind the post operation to
MessageSchema.post<IMessage>('save', function () {
  this.time = "This is some extra info we want to put onto this entry after the save"
});


export default mongoose.model<IMessage>('Book', MessageSchema);