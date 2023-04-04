const mongoose=require("mongoose")

const commentSchema= new mongoose.Schema({
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "authroute",
        required: true,
      },
      complain_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "complainroute",
        required: true,
      },
    authorName:{type:String,required: true,},
    commentData:{type:String,required: true,},
    Designation:{type:String,required: true,} 
})

const commentModel=mongoose.model("comment",commentSchema)

module.exports=commentModel