const mongoose = require('mongoose');

const AtelierSchema = mongoose.Schema({
    _id: {type:Number,required:true},
    titre: String,
    description: String,
    date: String,
    heureDebut: String,
    duree: String,
    placeDispo: {
       type: String,
    },
    placeReserve: {
        type: String,
        default:0
     },
    prix: String,
    image: String,
    visibilite: {
        type: Boolean,
        default:true
     },
    id_cuisinier:String
   
}, {
    timestamps: true
});


module.exports = mongoose.model('atelier',AtelierSchema);