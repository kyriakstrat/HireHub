const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "Employer", required: true }, // reference to the associated employer
  typeOfWork: String,
  region: String,
  companyName: String,
  field: String,
  description: String,
  photo:{type:String,default:'images/applications/noPhoto.jpg'},
  interview:String,
  applicants: [{userId:{type:Schema.Types.ObjectId,ref:"Emploee"},status:Number,name:String}],

},
{timestamps:true});

module.exports = mongoose.model("Application", applicationSchema);