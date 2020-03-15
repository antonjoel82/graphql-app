const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CompanySchema = new Schema({
  name: String,
  values: [String]
})

const CompanyModel = mongoose.model('Company', CompanySchema)

module.exports = {
  CompanyModel,
  CompanySchema
}
