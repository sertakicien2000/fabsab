var authen = require('../Controller/authentification_controller');
var atelier = require('../Controller/cuisinier_controller');
var particulier = require('../Controller/particulier_controller');


const express = require('express')
const route = express.Router()

function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        
       console.log(" Forbidden ");
        res.sendStatus(403);
    }    
}

//login register
route.post('/register',authen.register)
route.post('/login',authen.login)

//poster atelier et image
route.post('/postAtelier',verifyToken,atelier.postAtelier)
route.get('/image/:im',atelier.image)

//get tous les atelier
route.get('/getAtelier',atelier.getAllAtelier)

//get tous les atelier d un cuisinier
route.get('/getAteliercuis/:id',verifyToken,atelier.getAtelierCuis)

//modifie un atelier
route.put('/update/:id',verifyToken,atelier.updateAtelier)

//modifie place reserve
route.put('/updPlaceRes',atelier.updatePlaceRes)

//update visibilite
route.put('/updateVisibilite',verifyToken,atelier.updateVisibilite)

//inscription particulier
route.post('/inscription',particulier.postInscription)
route.get('/getInscription/:idAtelier',particulier.getInscription)

//modification image
route.put('/modifImage',atelier.updateImage)

route.get('/',atelier.get)

//get profil
route.get('/profil/:id',atelier.getProfil)




module.exports = route
