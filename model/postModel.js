import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    image:{
        type:String,
        require:true
    },
    heading : {
        type:String,
        require:true
    },
    chapters : {
        type:String,
        require:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        require:true,   
        ref:"users"
    },
    path:{
        type : String,
        require:true
    }

},{timestamps:true})

export default mongoose.model("posts", postSchema)