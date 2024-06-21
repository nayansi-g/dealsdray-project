const mongoose = require("mongoose")

module.exports = mongoose.connect("mongodb+srv://nayansigupta:xZfkWmjDRdRpNk23@cluster0.vubmh26.mongodb.net/Employee?retryWrites=true&w=majority&appName=Cluster0").then(
    connection =>{
        console.log("connected to database")
    }).catch(err=>{
        console.log("not connected to database",err)
    })


    