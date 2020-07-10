var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 // String is shorthand for {type: String}
var companySchema = new Schema({
  id: { type: Number,
        required: true
    },
  name: String,
  founded: Date,
  owener: [{ 
      name: String
    }],
});

const Company = mongoose.model('Company', companySchema );

module.exports = Company;