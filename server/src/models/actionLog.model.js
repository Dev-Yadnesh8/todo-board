import mongoose,{Schema} from "mongoose";

const actionLogSchema = new Schema({
    action:{
        type:String,
        enum:['add','update','delete','assign','dnd'], 
        require:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    task:{
        type:Schema.Types.ObjectId,
        ref:'Task',
        require:true
    }

},{timestamps:true});

export const ActionLog = mongoose.model('ActionLog',actionLogSchema);