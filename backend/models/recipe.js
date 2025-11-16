// const mongoose=require("mongoose")

// const recipeSchema=mongoose.Schema({
//     title:{
//         type:String,
//         required:true
//     },
//     ingredients:{
//         type:Array,
//         required:true
//     },
//     instructions:{
//         type:String,
//         required:true
//     },
//     time:{
//         type:String,
//     },
//     coverImage:{
//         type:String,
//     },
//     createdBy:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User"
//     }

// },{timestamps:true})

// module.exports=mongoose.model("Recipes",recipeSchema)


const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    time: {
        type: String,
    },
    coverImage: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    // New field: Array of user IDs who liked this recipe
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true });

// Virtual field to get like count
recipeSchema.virtual('likeCount').get(function() {
    return this.likes ? this.likes.length : 0;
});

// Make sure virtuals are included when converting to JSON
recipeSchema.set('toJSON', { virtuals: true });
recipeSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model("Recipes", recipeSchema);

