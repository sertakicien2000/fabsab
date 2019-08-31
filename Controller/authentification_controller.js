
var Cuisinier = require('../Model/cuisinier_model');
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');



module.exports.register = (req, res) => {

    console.log("tafiditra");


    nom = req.body.nom
    prenom = req.body.prenom
    specialite = req.body.specialite
    email = req.body.email
    passWord = req.body.passWord


    Cuisinier.find({ email: email })
        .then((res0) => {
            console.log(res0);
            if (res0.length == 0) {
                Cuisinier.find()
                    .then(note0 => {
                        if (note0.length == 0) {
                            id = 0;
                            console.log('mbola', id);

                        } else {
                            id = parseInt(note0[note0.length - 1].id) + 1;
                        }

                        var hash = bcrypt.hashSync(passWord, salt);
                        if (nom && email && passWord && prenom) {
                            const insert = new Cuisinier({ _id: id, nom: nom, prenom: prenom, email: email, passWord: hash, specialite: specialite });
                            insert.save()
                                .then((e) => {
                                    var token = jwt.sign({ e }, "test", { expiresIn: 1296000 });
                                    res.status(200).json({
                                        e,
                                        token
                                    })

                                })
                                .catch(e => {
                                    console.log(e);

                                    res.status(500).send({ mes: e.mes || "erreur" })
                                })
                        } else {
                            console.log(nom, prenom, email, passWord);

                            res.send("manque donne")
                        }


                    })

            }else{
                res.send("Ce mail est deja utilise")
            }

        }).catch(err => {
            console.log(err);

        })

};




module.exports.login = (req, res) => {

    email = req.body.email
    passWord = req.body.passWord
    console.log("email pwd", email, passWord);

    Cuisinier.findOne({ email })
        .then(note0 => {
            console.log(note0);
            if (bcrypt.compareSync(passWord, note0.passWord)) {

                var token = jwt.sign({ note0 }, "test", { expiresIn: 12960 });
                res.status(200).json({
                    note0,
                    token
                })
            } else {
                res.send("not ok")
            }

        })
        .catch(e => {
            res.status(500).send( "not ok")
        })


};


