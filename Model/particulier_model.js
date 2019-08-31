const mongoose = require('mongoose');

const ParticulierSchema = mongoose.Schema({
    _id: {type:Number,required:true},
    nom: String,
    prenom:String,
    email: String,
    tel: {
        type:String,
        default:"Pas de tel"

    },
    idAtelier:String
    
}, {
    timestamps: true
});


module.exports = mongoose.model('pariculier',ParticulierSchema);