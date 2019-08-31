var Atelier = require('../Model/atelier_model');
var Cuisinier = require('../Model/cuisinier_model');
const jwt = require('jsonwebtoken');
const fs = require('fs');


module.exports.image = (req, res) => {
    try {
        let a = fs.readFileSync('./Controller/public/' + req.params.im + ".jpg")
        res.write(a)
        res.end()
    } catch (e) {
        console.log("tsy lasa le sary", e.stack);
    }
}

module.exports.postAtelier = function (req, res) {

    var titre = req.body.titre
    var description = req.body.description
    var date = req.body.date
    var heureDebut = req.body.heureDebut
    var duree = req.body.duree
    var placeDispo = req.body.placeDispo
    var prix = req.body.prix
    var id_cuisinier = req.body.id_cuisinier



    var imageFile = req.files.file;



    console.log(req.body);


    if (titre && description && date && heureDebut && duree && placeDispo && prix && id_cuisinier&&imageFile) {
        Atelier.find()
            .then(note0 => {
                if (note0.length == 0) {
                    id = 0;
                } else {
                    id = parseInt(note0[note0.length - 1].id) + 1;
                }

                const articles = new Atelier({ _id: id, titre, description, date, heureDebut, duree, placeDispo, prix, id_cuisinier, image: id });
                articles.save()
                    .then((note) => {

                        jwt.verify(req.token, 'test', (err, authData) => {
                            if (err) {
                                console.log("forbidden2", req.token);

                                res.sendStatus(403);
                            } else {

                                imageFile.mv(`${__dirname}/public/${id}.jpg`, function (err) {
                                    if (err) {
                                        return res.status(500).send(err);
                                    }
                                });

                                res.json({
                                    message: 'Post created...',
                                    authData,
                                    note
                                });
                            }
                        });
                    })
                    .catch(e => {
                        console.log(e);

                        res.status(500).send({ mes: e.mes || "erreur" })
                    })
            })

    } else {
        console.log(req.file);


        res.send("not ok")
    }

}



module.exports.getAllAtelier = function (req, res) {

    Atelier.find()
        .then(resp => {
            
            res.send(resp)
        }).catch((err) => {
            console.log(err);

        })
}



module.exports.getAtelierCuis = function (req, res) {
    

    Atelier.find({ id_cuisinier: req.params.id })
        .then(resp => {
            jwt.verify(req.token, 'test', (err, authData) => {
                if (err) {
                    console.log("forbidden2", req.token);

                    res.sendStatus(403);
                } else {
                    res.json({
                        message: 'Post created...',
                        authData,
                        resp
                    });
                }
            })
         
        }).catch((err) => {
            console.log(err);

        })
}










module.exports.updateAtelier = function (req, res) {
    var titre = req.body.titre
    var description = req.body.description
    var date = req.body.date
    var heureDebut = req.body.heureDebut
    var duree = req.body.duree
    var placeDispo = req.body.placeDispo
    var prix = req.body.prix
    var image=req.body.image
    



    var imageFile = req.files.file;
    if (titre && description && date && heureDebut && duree && placeDispo && prix&&imageFile) {
        Atelier.findByIdAndUpdate(req.params.id, { titre, description, date, heureDebut, duree, placeDispo, prix, image})
        .then(resp => {
            console.log("date", req.body.date);
            jwt.verify(req.token, 'test', (err, authData) => {
                if (err) {
                    console.log("forbidden2", req.token);

                    res.sendStatus(403);
                } else {
                    imageFile.mv(`${__dirname}/public/${image}.jpg`, function (err) {
                        if (err) {
                            return res.status(500).send(err);
                        }
                    });

                    res.json({
                        message: 'Post created...',
                        authData,
                        resp
                    });
                }
            })
        }).catch(err => {
            console.log(err);

        })
    }else {
        console.log(req.file);


        res.send("not ok")
    }
    
    
}







module.exports.updatePlaceRes = function (req, res) {
    console.log();
    
    Atelier.findById(req.body.id)
        .then(resp => {
            var a = parseInt(resp.placeReserve) + 1
            Atelier.findByIdAndUpdate(req.body.id, {placeReserve:a})
                .then(resp => {
                    res.send(resp)
                }).catch(err => {
                    console.log(err);

                })

        }).catch(err => {
            console.log(err);

        })
}




module.exports.updateVisibilite = function (req, res) {
    Atelier.findById(req.body.id)
        .then(resp => {
           
            Atelier.findByIdAndUpdate(req.body.id, {visibilite:!resp.visibilite})
                .then(resp => {
                    jwt.verify(req.token, 'test', (err, authData) => {
                        if (err) {
                            console.log("forbidden2", req.token);
        
                            res.sendStatus(403);
                        } else {
        
                            res.json({
                                message: 'Post created...',
                                authData,
                                resp
                            });
                        }
                    })
                }).catch(err => {
                    console.log(err);

                })

        }).catch(err => {
            console.log(err);

        })

}


module.exports.updateImage = function (req, res) {
     var imageFile = req.files.file;
    Atelier.findByIdAndUpdate(req.body.id,{image:req.body.image})
        .then(resp => {
            imageFile.mv(`${__dirname}/public/${req.body.image}.jpg`, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
            });
           res.send(resp)

        }).catch(err => {
            console.log(err);

        })
}

module.exports.get = function (req, res) {
    res.send("hello")
}



module.exports.getProfil = function (req, res) {
    Cuisinier.findById(req.params.id)
    .then(resp=>{
        res.send(resp)
    }).catch(err=>{
        console.log(err);
        
    })
}