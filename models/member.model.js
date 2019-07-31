const mongoose = require('mongoose')
const Schema = mongoose.Schema

const memberSchema = new Schema({
  numberCard: String,
  numberId: String,
  firstName: String,
  lastName: String,
  email: String,
  tel: String,
  sex: String,
  age: Number,
  addr: String
}, {
  timestamps: true
})

const Model = module.exports = mongoose.model('member', memberSchema);