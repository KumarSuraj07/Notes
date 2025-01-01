const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// Setting up Parsers for form.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
const filesDirectory = path.join(__dirname, 'files');

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

// Route to delete a file (task)
app.post('/delete', (req, res) => {
    const taskName = req.body.taskName;

    const filePath = path.join(filesDirectory, taskName);

    // Check if the file exists and delete it
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`${taskName} deleted.`);
        res.status(200).send('Task deleted successfully.');
    } else {
        res.status(404).send('Task not found.');
    }
});

app.listen(3000, () => {
    console.log("server is running on port 3000");
});