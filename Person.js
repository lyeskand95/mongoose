var mongoose =require('mongoose');
var Schema=mongoose.Schema;

module.exports=mongoose.model('Person',Schema({
      name: {
        type: String,
        required:true 
    },
    age: {
        type: Number
    },
    favoriteFoods: {
        type: [String]
    }
}))