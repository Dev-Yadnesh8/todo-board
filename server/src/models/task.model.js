import mongoose, { Schema } from "mongoose";



const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    assignedTo:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum:['todo','in-progress','done'],
        default:'todo'
    },
    priority:{
        type:String,
        enum:['low','medium','high'],
        default:'medium',
        required:true
    }
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
