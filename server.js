import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import nodemailer from "nodemailer"; 

import Experts from "./Models/Experts";
import Students from "./Models/Students";
import Admin from "./Models/Admin";

import { Date } from "mongoose";
import { major } from "semver";

const app = express();
app.use(cors());
app.use(bodyParser.json());


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
        res.send(doc);
    }).catch(err => {
        console.log(err);
    });

})




app.post("/sendVerificationMail", (req, res) => {
    console.log(req.body);
    console.log(req.body.email);
    console.log(req.body.manner);

    var userId;

    if (req.body.manner == "searcher") {
        const searcher = Students.findOne({email: req.body.email});
        console.log(searcher)
    }
    if (req.body.manner == "adviser") {
        Experts.findOne({email: req.body.email}).then(doc => {
            userId = doc._id
            console.log(userId);
        });
    }
    console.log(userId);

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
            <h2>${this.userId}</h2>
            <h4>Lütfen aşağıdaki linke tıklayarak mailinizi onaylayınız.</h4>
            <a href="http://localhost:3000/onaylandi/${req.body.email}">ONAYLA</a>
        `
    };

    transfer.sendMail(mailInfo, (err) => {
        if (err) console.log(err);
        else {
            console.log("Your mail was sent.");
            Students.updateOne({email: req.body.email, manner: "searcher"}, {$set:{verified: true}}, (err) => {
                if (err) throw err;
                console.log("Updated");
            });

            Experts.updateOne({email: req.body.email, manner: "adviser"}, {$set:{verified: true}}, (err) => {
                if (err) throw err;
                console.log("Updated");
            });
        };
    });
})





app.post("/saveUser", (req, res) => {
    console.log(req.body);

    const {email, password, fullName, city, manner, major, image, verified, desc} = req.body.user;

    console.log(email, password, fullName, city, manner, image, verified)
    if (manner == "searcher") {
        Students.create({
            email: email,
            password: password,
            fullName: fullName,
            city: city,
            verified: verified,
            image: image,

            // signedDate: Date.now(),

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



app.post("/imageUpload", (req, res) => {
    console.log(req.body);
    const image = req.body;
    
})



app.listen(3005);