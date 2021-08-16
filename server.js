const express = require('express')
const expressFileUpload = require('express-fileupload')
const fs = require('fs')

const app = express()
const config = {
    limits: {fileSize: 5000000},
    abortOnLimit: true,
    responseOnLimit: "Se ha sobrepasado el límite de tamaño de imagen."
}
app.use(expressFileUpload(config))
app.use(express.json())
app.use("/imgs", express.static(__dirname + "/imgs"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/formulario.html")
})

app.get("/collage", (req, res) => {
    res.sendFile(__dirname + "/collage.html")
})

app.post("/imagen", (req, res) => {
    const {posicion} = req.body
    const {target_file} = req.files 
    target_file.mv(`${__dirname}/imgs/imagen-${posicion}.jpg`, (err) => {
        res.sendFile(__dirname + "/collage.html")
    })
})

app.get("/deleteImg/:imagen", (req, res) => {
    const {imagen} = req.params
    fs.unlinkSync(__dirname + `/imgs/${imagen}`)
    res.redirect("/collage")
})

app.listen(3000)
