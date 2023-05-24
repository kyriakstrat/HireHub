const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employerSchema = new Schema({
  email:String,
  password:String,
  name:String,
  bio:String,
  avatar:{type:String,default:'/images/profiles/noPhoto.jpg'},
  applications: [{type:Schema.Types.ObjectId,ref:'Application'}],
});

// // Virtual for author's full name
// employerSchema.virtual("name").get(function () {
//   // To avoid errors in cases where an author does not have either a family name or first name
//   // We want to make sure we handle the exception by returning an empty string for that case
//   let fullname = "";
//   if (this.first_name && this.family_name) {
//     fullname = `${this.family_name}, ${this.first_name}`;
//   }
//   if (!this.first_name || !this.family_name) {
//     fullname = "";
//   }
//   return fullname;
// });

// // Virtual for author's URL
// employerSchema.virtual("url").get(function () {
//   // We don't use an arrow function as we'll need the this object
//   return `/catalog/author/${this._id}`;
// });

// Export model
module.exports = mongoose.model("Employer", employerSchema);