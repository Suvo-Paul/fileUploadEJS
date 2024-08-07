const path = require("path")
const express = require("express")
const multer = require('multer')

const app = express()
const port = 8000

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "./uploads")
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage })

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    return res.render("homepage")
})

app.post("/upload", upload.single("profileImage"), (req, res) => {
    console.log(req.body);
    console.log(req.file);

    return res.redirect("/")
})

app.listen(port, () => {
    console.log("Server is running on", port);
})
