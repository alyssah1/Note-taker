// dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");
var db = require("./db/db.json");

// sets up express app and port
var app = express();
var PORT = process.env.PORT || 8000;

// express app to handle data parsing
app.use(express.static(__dirname + "/public"));
// middleware(easier interface that allow post request that include data)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});



app.get("/api/notes", function(req, res) {
    fs.readFile("./db/db.json", function(err, data) {
        if(err) throw err;
        return res.json(JSON.parse(data))
    })
});

// saving the note
app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    db.push(newNote);
    console.log(newNote);
    console.log(db);
    fs.writeFile("./db/db.json", JSON.stringify(db), function(err) {
        if(err) throw err;
        return res.json(newNote)
    })
});

// deleting the note 
app.delete("/api/notes:id", function(req,res) {
    var deleteNotes = req.params.id;
    for( var i=0; i < db.length; i++){
        if(deleteNotes == db[i].id){
            db.splice(i, 1);

            fs.writeFile("./db/db.json", JSON.stringify(db), function(err) {
                if (err) throw err;
                return;
            })
        }
    }
    res.end();
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});