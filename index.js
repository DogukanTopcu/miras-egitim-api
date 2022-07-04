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
import Rates from "./Models/Rates";
import CommentRates from "./Models/CommentRates";



require("dotenv").config();


const app = express();
app.use(cors({
    origin: "http://localhost:81",
}));
// app.use(cors({
//     origin: 'https://illustrious-monstera-3ac08f.netlify.app/',
//     credentials: true,
//     optionsSuccessStatus: 200
// }));
// app.all("/", (req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "https://illustrious-monstera-3ac08f.netlify.app/");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
// })

// app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));
// app.use(express.bodyParser({limit: '50mb'}));
// app.use(bodyParser.text({ limit: '1000mb' }));


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
                service: "outlook",
                auth:{
                    user: "dogukantopcu35@outlook.com",
                    pass: "dT-{02584560}"
                }
            });
        
            var mailInfo = {
                from: "dogukantopcu35@outlook.com",
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
                        service: "outlook",
                        auth:{
                            user: "dogukantopcu35@outlook.com",
                            pass: "dT-{02584560}"
                        }
                    });
                
                    var mailInfo = {
                        from: "dogukantopcu35@outlook.com",
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
                service: "outlook",
                auth:{
                    user: "dogukantopcu35@outlook.com",
                    pass: "dT-{02584560}"
                }
            });
            console.log(doc.verifiedCode);
            const verifiedCode = doc.verifiedCode
        
            var mailInfo = {
                from: "dogukantopcu35@outlook.com",
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
                res.send("Success");
            });
        });
    }

    if (req.body.manner == "advisor") {
        Experts.findOne({email: req.body.email, fullName: req.body.userName}).then(doc => {

            var transfer = nodemailer.createTransport({
                service: "outlook",
                auth:{
                    user: "dogukantopcu35@outlook.com",
                    pass: "dT-{02584560}"
                }
            });
        
            var mailInfo = {
                from: "dogukantopcu35@outlook.com",
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

    const {email, password, fullName, city, manner, major, image, verified, desc, rating, certificates, pricePerHour, verifiedCode} = req.body.user;
    console.log(verifiedCode);
    // console.log(email, password, fullName, city, manner, major, image, verified, desc, rating, certificates, pricePerHour, verifiedCode);

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

            certificates: certificates,
            pricePerHour: pricePerHour,

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
                service: "outlook",
                auth:{
                    user: "dogukantopcu35@outlook.com",
                    pass: "dT-{02584560}"
                }
            });
        
            var mailInfo = {
                from: "dogukantopcu35@outlook.com",
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
                service: "outlook",
                auth:{
                    user: "dogukantopcu35@outlook.com",
                    pass: "dT-{02584560}"
                }
            });
        
            var mailInfo = {
                from: "dogukantopcu35@outlook.com",
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


app.post("/postComment", (req, res) => {
    const receiverId = req.body.userId;
    const senderId = req.body.commenterId;
    const comment = req.body.comment;

    Comments.create({
        userId: receiverId,
        commenterId: senderId,
        comment: comment
    }, err => {
            if (err) res.sendStatus(400);
            res.sendStatus(200);
    })
});

app.post("/updateCommentRate", (req, res) => {
    const rate = req.body.rate;
    const commentId = req.body.id;

    Comments.updateOne({_id: commentId}, {$set:{rate: rate}}, (err, docs) => {
        if (err) throw err;
        res.sendStatus(200);
    })
})


app.post("/rateUser", (req, res) => {
    const receiverId = req.body.userId;
    const voterId = req.body.voterId;
    const rate = req.body.rate;

    Rates.find({userId: receiverId, voterId: voterId}).then(doc => {
        console.log(doc)
        if (doc.length === 0) {
            Rates.create({
                userId: receiverId,
                voterId: voterId,
                rate: rate,
            }, err => {
                if (err) res.sendStatus(400);
                res.sendStatus(200);
            });
            console.log("created");
        }
        else{
            var q = {
                userId: receiverId,
                voterId: voterId
            }
            Rates.updateOne(q, {$set:{rate: rate, updated: true, date: Date.now()}}, (err, docs) => {
                if (err) res.sendStatus(400);
                console.log(docs);
                res.sendStatus(200);
            });
            console.log("Updated");
        }
    });
})


app.post("/postCommentVote", (req, res) => {
    const commentId = req.body.commentId;
    const userId = req.body.userId;
    const commenterId = req.body.commenterId;
    const voterId = req.body.voterId;
    const rate = req.body.rate;
    var rateCount = req.body.rateCount;


    CommentRates.findOne({commentId: commentId, voterId: voterId}).then(doc => {
        if (doc) {
            CommentRates.updateOne({_id: doc._id}, {$set:{rate: rate, updated: true}}, (err, docs) => {
                if (err) res.sendStatus(400);
            });
        }
        else {
            console.log("inside create");
            CommentRates.create({
                commentId: commentId,
                userId: userId,
                commenterId: commenterId,
                voterId: voterId,
                rate: rate,
            });
        }
    });
    
    // CommentRates.find({commentId: commentId}).then(doc => {
    //     console.log(doc);
    //     doc.map(value => {
    //         console.log(value.rate);
    //         if (value.rate == "up") {
    //             rateCount += 1
    //         }
    //         if (value.rate == "down") {
    //             rateCount -= 1
    //         }
    //     });

    //     Comments.updateOne({_id: commentId}, {$set:{rate: rateCount}}, (err, docs) => {
    //         if (err) res.sendStatus(400);
    //         console.log(docs);
    //         res.sendStatus(200);
    //     })
    // });

    // if (rate == "up") {
    //     var rateCount = 0
    //     Comments.findOne({_id: commentId}).then(doc => {
    //         console.log(doc);
    //         rateCount = doc.rate + 1;
    //         console.log(rateCount)
    //     })
    //     Comments.updateOne({_id: commentId}, {$set:{rate: rateCount}}, (err, docs) => {
    //         if (err) res.sendStatus(400);
    //         console.log(docs);
    //         res.sendStatus(200);
    //     })
    // }
    // if (rate == "down") {
    //     var rateCount = 0
    //     Comments.findOne({_id: commentId}).then(doc => {
    //         console.log(doc);
    //         rateCount = doc.rate - 1;
    //         console.log(rateCount)
    //     })
    //     Comments.updateOne({_id: commentId}, {$set:{rate: rateCount}}, (err, docs) => {
    //         if (err) res.sendStatus(400);
    //         console.log(docs);
    //         res.sendStatus(200);
    //     })
    // }
})




// **********************************************************************************

// Get Proccess

app.get("/getComments/:id", (req, res) => {
    const advisorId = req.params.id;

    Comments.find({userId: advisorId}).then((docs) => {
        res.send(docs);
    }).catch(err => console.log(err));
});

app.get("/getRatesForUser/:userId/:voterId", (req, res) => {
    const userId = req.params.userId;
    const voterId = req.params.voterId;
    Rates.findOne({userId: userId, voterId: voterId}).then(doc => {
        res.send(doc);
    }).catch(err => console.log(err));
});

app.get("/getCommenter/:id", (req, res) => {
    const commenterId = req.params.id;

    Students.findOne({_id: commenterId}).then(doc => {
        if (doc != undefined) {
            res.send(doc);
        }
        if (doc == undefined) {
            Experts.findOne({_id: commenterId}).then(docs => {
                if (docs != undefined) {
                    res.send(docs);
                }
                if (docs == undefined) {
                    res.send("Undefined");
                }
            })
        }
    }).catch(err => console.log(err));
});

app.get("/isVoted/:currentId/:commentId", (req, res) => {
    console.log(req.params)
    const commentId = req.params.commentId;
    const currentUserId = req.params.currentId;

    CommentRates.find({commentId: commentId, voterId: currentUserId}).then(doc => {
        if (doc.length >= 1) {
            res.send(doc);
        }
        else{
            res.send("no comments");
        }
    }).catch(err => console.log(err));
});

app.get("/getCommentRates/:commentId", (req, res) => {
    const id = req.params.commentId;
    CommentRates.find({commentId: id}).then(doc => {
        res.send(doc);
    })
})




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

app.get("/getAdmin/:id", (req, res) => {
    const id = req.params.id;
    Admin.find({_id: id}).then(doc => {
        res.send(doc);
    }).catch(err => console.log(err));
})



app.get("/experts/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    Experts.findOne({_id: id}).then(doc => {
        res.send(doc);
    }).catch(err => console.log(err));
});
app.get("/students/:id", (req, res) => {
    const id = req.params.id;
    Students.findOne({_id: id}).then(doc => {
        res.send(doc);
    }).catch(err => console.log(err));
})







app.listen(process.env.PORT || 3005, () => {
    console.log(`Server is working on ${process.env.PORT || 3005} port.`);
});