import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import Experts from "./Models/Experts";
import Students from "./Models/Students";
import Admin from "./Models/Admin";

const app = express();
app.use(cors());
app.use(bodyParser.json());


mongoose.connect("mongodb://localhost:27017/miras-egitim", {useNewUrlParser: true}, err => {
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
    Admin.find({username: username}).then(doc => {
        if (doc[0].password === password) {
            res.send("Successful");
        }
    })
})

app.post("/userLogin", (req, res) => {
    const { email, password } = req.body;
    Students.find({email: email}).then(doc => {
        if (doc[0].password === password) {
            res.send("Successful");
            res.end();
        }
    })
    Experts.find({email: email}).then(doc => {
        if (doc[0].password === password) {
            res.send("Successful");
            res.end();
        }
    })

})


app.post("/saveStudentUser", (req, res) => {
    console.log(req.body);
    
    const { emailAdress, password } = req.body;
    Students.create({
        email: emailAdress,
        password
    }, err => {
        if (err) res.sendStatus(400);
        res.sendStatus(200);
    })
})

app.post("/saveExpertUser", (req, res) => {
    console.log(req.body);
    
    const { emailAdress, password } = req.body;
    Experts.create({
        email: emailAdress,
        password
    }, err => {
        if (err) res.sendStatus(400);
        res.sendStatus(200);
    })
})





app.listen(3005);