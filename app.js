//basic dependencies, express for server & bodyParser for JSON
const express = require("express");
const bodyParser = require("body-parser");
//initialize express, not the simplest yet not a bad practice either. could have initialize with const app = require("express")
const app = express();
var dateItems = ["Buy Food", "Cook Food", "Eat Food"];
var workItems = [];

app.set('view engine', 'ejs');
app.use(express.static("public")); //so that html dependencies(CSS, images, etc) get fetched as well.
app.use(bodyParser.urlencoded({ extended: true })); //to enable body-parser

//get method to display default webpage
app.get("/", (req, res) => {
    let options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };
    let today = new Date();
    let dateTitle = today.toLocaleDateString("en-US", options);

    res.render('list', { titleEJS: dateTitle, itemsEJS: dateItems });

});

app.get("/work", (req, res) => {
    res.render('list', { titleEJS: "Work List", itemsEJS: workItems });
});

app.get("/about", (req, res) => {
    res.render('about', {titleEJS: "About Us"});
});

app.post("/", (req, res) => {
    if (req.body.list === "Work List") {
        workItems.push(req.body.nextToDo);
        res.redirect("/work");
    } else {
        dateItems.push(req.body.nextToDo);
        res.redirect("/");
    }
})

//set up port to listen/host your app
app.listen(process.env.PORT || 3000, () => console.log("Running on port: 3000"));