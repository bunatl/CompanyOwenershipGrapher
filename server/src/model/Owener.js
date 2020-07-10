var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// String is shorthand for {type: String}
var owenerSchema = new Schema({
  title:  {
    type: String,
    required: true,
  },
  companies: [{ 
    ico: number 
  }],
});

const Owener = mongoose.model('Owener', owenerSchema );

module.exports = Owener;