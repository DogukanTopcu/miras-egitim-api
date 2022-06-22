import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import nodemailer from "nodemailer"; 
import url from "url";

import Experts from "./Models/Experts";
import Students from "./Models/Students";
import Admin from "./Models/Admin";
import Comments from "./Models/Comments";

import { Date } from "mongoose";
import { major } from "semver";

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text({ limit: '200mb' }));


// mongodb://localhost:27017/miras-egitim
mongoose.connect("mongodb+srv://dogukantopcu35:11Mart2003@cluster0.0fzxo.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true}, err => {
    if (err) throw err;
    console.log("Connected");
})


/*
    YENİ BİR ADMİN KAYDI İÇİN;
        ALTTAKİ KOD SATIRLARINI YORUMDAN ÇIKAR.
        NODE İLE SERVER.JS'İ ÇALIŞTIR.
        localhost:5555/createAdmin sayfasını aç.
*/

// app.get("/createAdmin", (req, res) => {
//     Admin.create({
//         username: "doguk",
//         password: "02584560"
//     }, err => {
//         if (err) res.sendStatus(400);
//         res.sendStatus(200);
//     })
// });



app.post("/adminLogin", (req, res) => {
    const {username, password} = req.body;
    Admin.findOne({username: username, password: password}).then((doc) => {
        res.send(doc);
    }).catch(err => {
        console.log(err);
    })
})

app.post("/userLogin", (req, res) => {
    const { email, password } = req.body;

    Students.findOne({email: email, password: password}).then((doc) => {
        if (doc != undefined) {
            res.send(doc);
        }
        if (doc == undefined) {
            Experts.findOne({email: email, password: password}).then(docs => {
                if (docs != undefined) {
                    res.send(docs);
                }
                if (docs == undefined) {
                    res.send("Undefined");
                }
            })
        }

    }).catch(err => {
        console.log(err);
    });

})


app.post("/sendNewVerificationMail", (req, res) => {
    Students.findOne({email: req.body.email}).then(doc => {
        if (doc.verifiedCode) {
            var transfer = nodemailer.createTransport({
                service: "hotmail",
                auth:{
                    user: "dogukan_topcu35@hotmail.com",
                    pass: "dT={11.03.2003}"
                }
            });
        
            var mailInfo = {
                from: "dogukan_topcu35@hotmail.com",
                to: req.body.email,
                subject: "Send a mail with NodeJs",
                text: "My first mail sent with NodeJs.",
                html: `
                    <h1>Doğrulama Kodu</h1>
                    <h2>${doc.verifiedCode}</h2>
                    <h4>${doc.fullName} lütfen aşağıdaki linke tıklayarak mailinizi onaylayınız.</h4>
                    <a href="http://localhost:3005/verified?email=${doc.email}&verifiedCode=${doc.verifiedCode}">ONAYLA</a>
                `
            };
        
            transfer.sendMail(mailInfo, (err) => {
                if (err) throw err;
                else {
                    console.log("Your mail was sent.");
                };
            });
        }
        if (!doc.verifiedCode) {
            Experts.findOne({email: req.body.email}).then(docs => {
                if (doc.verifiedCode) {
                    var transfer = nodemailer.createTransport({
                        service: "hotmail",
                        auth:{
                            user: "dogukan_topcu35@hotmail.com",
                            pass: "dT={11.03.2003}"
                        }
                    });
                
                    var mailInfo = {
                        from: "dogukan_topcu35@hotmail.com",
                        to: req.body.email,
                        subject: "Send a mail with NodeJs",
                        text: "My first mail sent with NodeJs.",
                        html: `
                            <h1>Doğrulama Kodu</h1>
                            <h2>${doc.verifiedCode}</h2>
                            <h4>${doc.fullName} lütfen aşağıdaki linke tıklayarak mailinizi onaylayınız.</h4>
                            <a href="http://localhost:3005/verified?email=${doc.email}&verifiedCode=${doc.verifiedCode}">ONAYLA</a>
                        `
                    };
                
                    transfer.sendMail(mailInfo, (err) => {
                        if (err) console.log(err);
                        else {
                            console.log("Your mail was sent.");
                        };
                    });
                }

                if (doc.verifiedCode) {
                    res.send("Warning");
                }
            })
        }
    })
})

app.post("/sendVerificationMail", (req, res) => {


    if (req.body.manner == "searcher") {
        Students.findOne({email: req.body.email, fullName: req.body.userName}).then(doc => {

            var transfer = nodemailer.createTransport({
                service: "hotmail",
                auth:{
                    user: "dogukan_topcu35@hotmail.com",
                    pass: "dT={11.03.2003}"
                }
            });
            console.log(transfer);
            console.log(doc.verifiedCode);
            const verifiedCode = doc.verifiedCode
        
            var mailInfo = {
                from: "dogukan_topcu35@hotmail.com",
                to: req.body.email,
                subject: "Send a mail with NodeJs",
                text: "My first mail sent with NodeJs.",
                html: `
                    <h1>Doğrulama Kodu</h1>
                    <h2>${verifiedCode}</h2>
                    <h4>${doc.fullName} lütfen aşağıdaki linke tıklayarak mailinizi onaylayınız.</h4>
                    <a href="http://localhost:3005/verified?email=${doc.email}&verifiedCode=${doc.verifiedCode}">ONAYLA</a>
                `
            };
        
            transfer.sendMail(mailInfo, (err) => {
                if (err) throw err;
                else {
                    console.log("Your mail was sent.");
                };
            });
        });
    }

    if (req.body.manner == "advisor") {
        Experts.findOne({email: req.body.email, fullName: req.body.userName}).then(doc => {

            var transfer = nodemailer.createTransport({
                service: "hotmail",
                auth:{
                    user: "dogukan_topcu35@hotmail.com",
                    pass: "dT={11.03.2003}"
                }
            });
        
            var mailInfo = {
                from: "dogukan_topcu35@hotmail.com",
                to: req.body.email,
                subject: "Send a mail with NodeJs",
                text: "My first mail sent with NodeJs.",
                html: `
                    <h1>Doğrulama Kodu</h1>
                    <h2>${doc.verifiedCode}</h2>
                    <h4>${doc.fullName} lütfen aşağıdaki linke tıklayarak mailinizi onaylayınız.</h4>
                    <a href="http://localhost:3005/verified?email=${doc.email}&verifiedCode=${doc.verifiedCode}">ONAYLA</a>
                `
            };
        
            transfer.sendMail(mailInfo, (err) => {
                if (err) console.log(err);
                else {
                    console.log("Your mail was sent.");
                };
            });
        });
    }

});

app.get("/verified", (req, res) => {

    var q = {
        email: req.query.email.toString(),
        verifiedCode: req.query.verifiedCode
    }
    
    Students.updateOne(q, {$set:{verified: true}}, (err, docs) => {
        if (err) throw err;
        if (docs.modifiedCount == 1) {
            res.sendFile(__dirname + "/Views/verification.html");
        }
    });
    
    Experts.updateOne(q, {$set:{verified: true}}, (err, docs) => {
        if (err) throw err;
        if (docs.modifiedCount == 1) {
            res.sendFile(__dirname + "/Views/verification.html");
        }
    });

})




app.post("/saveUser", (req, res) => {

    const {email, password, fullName, city, manner, major, image, verified, desc, verifiedCode} = req.body.user;


    if (manner == "searcher") {

        Students.create({
            email: email,
            password: password,
            fullName: fullName,
            city: city,
            verified: verified,
            verifiedCode: verifiedCode,
            image: image,


        }, err => {
            if (err) res.sendStatus(400);
            res.sendStatus(200);
        })
    }

    if (manner == "advisor") {
        Experts.create({
            email: email,
            password: password,
            fullName: fullName,
            
            city: city,
            desc: desc,
            major: major,

            verified: verified,
            verifiedCode: verifiedCode,


            image: image,
            isVipOfWeek: false,
            isVip: false,

            // signedDate: Date.now,
            // verifiedDate: Date.now,

            // weeklyVipDate: Date,
            // vipDate: Date,
            weeklyVipNumber: 0,
            vipNumber: 0,

        }, err => {
            if (err) res.sendStatus(400);
            res.sendStatus(200);
        })
    }
})




app.post("/sendNewPass", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    Students.updateOne({email: email}, {$set: {password: password}}, (err, docs) => {
        if (err) throw err;

        if (docs.modifiedCount == 1) {
            res.send("Success");

            var transfer = nodemailer.createTransport({
                service: "hotmail",
                auth:{
                    user: "dogukan_topcu35@hotmail.com",
                    pass: "dT={11.03.2003}"
                }
            });
        
            var mailInfo = {
                from: "dogukan_topcu35@hotmail.com",
                to: email,
                subject: "Yeni Şifre",
                text: "Miras Eğitim",
                html: `
                    <h1>Doğrulama Kodu</h1>
                    <h2>${password}</h2>
                    <h4>Yeni şifreniz.</h4>
                    <a href="http://localhost:3000/giris-yap">Giriş Yap</a>
                `
            };
        
            transfer.sendMail(mailInfo, (err) => {
                if (err) throw err;
                else {
                    console.log("Your mail was sent.");
                };
            });


        }

        if (docs.modifiedCount == 0) {
            Experts.updateOne({email: email}, {$set: {password: password}}, (err, docs) => {
        if (err) throw err;

        if (docs.modifiedCount == 1) {
            res.send("Success");

            var transfer = nodemailer.createTransport({
                service: "hotmail",
                auth:{
                    user: "dogukan_topcu35@hotmail.com",
                    pass: "dT={11.03.2003}"
                }
            });
        
            var mailInfo = {
                from: "dogukan_topcu35@hotmail.com",
                to: email,
                subject: "Yeni Şifre",
                text: "Miras Eğitim",
                html: `
                    <h1>Doğrulama Kodu</h1>
                    <h2>${password}</h2>
                    <h4>Yeni şifreniz.</h4>
                    <a href="http://localhost:3000/giris-yap">Giriş Yap</a>
                `
            };
        
            transfer.sendMail(mailInfo, (err) => {
                if (err) throw err;
                else {
                    console.log("Your mail was sent.");
                };
            });


        }

        if (docs.modifiedCount == 0) {
            res.send("Undefined");
        }
            })
        }
    })

    
})





// **********************************************************************************

// Get Proccess


// ---------Login----Register----------------
app.get("/getUserEmails", (req, res) => {
    Students.find({}).then((doc) => {
        res.send(doc);
    }).catch(err => console.log(err));
});

app.get("/getExpertsEmails", (req, res) => {
    Experts.find({}).then((doc) => {
        res.send(doc);
    }).catch(err => console.log(err));
});



app.get("/getComments", (req, res) => {
    console.log(req.body);
    console.log(req.body.handle);
    Comments.find({}).then(doc => {
        res.send(doc);
    }).catch(err => console.log(err));
})



// -------Admin Panel--------------

app.get("/students", (req, res) => {
    Students.find({}).then((doc) => {
        res.send(doc);
    }).catch(err => console.log(err));
});

app.get("/experts", (req, res) => {
    Experts.find({}).then((doc) => {
        res.send(doc);
    }).catch(err => console.log(err));
});

app.get("/vipExperts", (req, res) => {
    Experts.find({isVip: true}).then((doc) => {
        res.send(doc);
    }).catch(err => console.log(err));
});

app.get("/vipOfWeek", (req, res) => {
    Experts.find({isVipOfWeek: true}).then((doc) => {
        res.send(doc);
    }).catch(err => console.log(err));
});

app.get("/admins", (req, res) => {
    Admin.find({}).then((doc) => {
        res.send(doc);
    }).catch(err => console.log(err));
});


app.listen(process.env.PORT || 3005, () => {
    console.log(`Server is working on ${process.env.PORT || 3005} port.`);
});