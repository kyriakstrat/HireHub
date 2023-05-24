const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const emploeeSchema = new Schema({
  email:String,
  password:String,
  name:String,
  bio:String,
  avatar:{type:String,default:'/images/profiles/noPhoto.jpg'},
  applications:[{app:{type:Schema.Types.ObjectId,ref:'Application'},statusOfApp:String}],
});

// // Virtual for book's URL
// emploeeSchema.virtual("url").get(function () {
//   // We don't use an arrow function as we'll need the this object
//   return `/catalog/book/${this._id}`;
// });

// Export model
module.exports = mongoose.model("Emploee", emploeeSchema);