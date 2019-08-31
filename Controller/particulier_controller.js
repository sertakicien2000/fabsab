var Particulier = require('../Model/particulier_model');

module.exports.postInscription = function (req, res) {
    var nom = req.body.nom
    var prenom = req.body.prenom
    var email = req.body.email
    var tel = req.body.tel
    var idAtelier = req.body.idAtelier


    

    Particulier.find({ idAtelier: idAtelier })
        .then(resp => {
            var v = true
            for (let i = 0; i < resp.length; i++) {
                if (resp[i].email == email) {
                    res.send("email deja utilisé")
                    i = resp.length
                    v = false
                }

            }
            if (v) {
                if (nom && prenom && email) {
                    Particulier.find()
                        .then(note0 => {
                            if (note0.length == 0) {
                                id = 0;
                            } else {
                                id = parseInt(note0[note0.length - 1].id) + 1;
                            }
                            const articles = new Particulier({ _id: id, nom:nom, prenom:prenom, email:email, tel:tel, idAtelier:idAtelier });
                            articles.save()
                                .then(resp => {
                                    res.send(resp)
                                }).catch(err => {
                                    console.log(err);

                                })


                        }).catch(err => {
                            console.log(err);

                        })
                } else {
                    console.log(req.body);
                    
                    res.send("mank donnee")
                }
            }
        }).catch(err => {
            console.log(err);

        })
}


module.exports.getInscription = function (req, res) {
    Particulier.find({ idAtelier: req.params.idAtelier })
        .then(resp => {
            res.send(resp)
        }).catch(err=>{
            console.log(err);
            
        })
}