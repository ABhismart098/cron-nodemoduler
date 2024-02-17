// const mongoose = require('mongoose');

// const amountDetails = new mongoose.Schema({
//     username:{
//         type: String,
//         required: true
//     },
//     password:{
//         type: String,
//         required: true
//     },
//     amount:{
//         type: String,
//         required: true
//     },
//     deadline:{
//         type: Date,
//         required: true
//     }
// });
// const user = mongoose.model('user', amountDetails);

//  module.exports = user;
const mongoose = require('mongoose');

// Define the email schema
const emailSchema = new mongoose.Schema({
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  amount: { type: Number, required: true },
  deadline: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create a model from the schema
const Email = mongoose.model('Email', emailSchema);

module.exports = Email;
