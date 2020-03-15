const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ApplicationSchema = new Schema({
  position: String,
  coverLetter: String,
  tags: [String],
  companyId: mongoose.SchemaTypes.ObjectId
})

const ApplicationModel = mongoose.model('Application', ApplicationSchema)

module.exports = {
  ApplicationModel,
  ApplicationSchema
}
