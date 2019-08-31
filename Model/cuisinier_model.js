const mongoose = require('mongoose');

const CuisinierSchema = mongoose.Schema({
    _id: {type:Number,required:true},
    nom: String,
    prenom:String,
    email: String,
    specialite:{
        type:String,
        default:"Pas de specialite"
    },
    passWord: String
    
}, {
    timestamps: true
});
mongoose.set('useFindAndModify', false);


module.exports = mongoose.model('cuisinier',CuisinierSchema);