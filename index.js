const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// Setting up Parsers for form.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// Setting ejs for view engine, helps in rendering files.
app.set('view engine', 'ejs');

// Routing to display the home/index.ejs page

app.get("/", (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        res.render("index", { files: files });
    })
});

// Routing to get the file-name and file-data from the frontend and showing it in the show.ejs page.

app.get("/file/:filename", (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
        res.render("show",{filename: req.params.filename , filedata: filedata}); 
    })
});

// Routing to create and save the file-title and file-details from the frontend locally. 

app.post("/create", (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, (err) => {
        res.redirect("/");
    })
});

app.listen(3000, () => {
    console.log("server is running on port 3000");
});