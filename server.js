"use strict";

var express = require("express");
var path = require("path");
var compress = require("compression");
var bodyParser = require("body-parser");
var request = require("request");
var jsonfile = require("jsonfile");
var moment = require("moment")

var app = express();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(compress());
app.set("port", process.env.PORT || 5000);
app.use(express.static(path.join(__dirname, "public")));

var file = "./data.json";

app.get("/schools", function(req, res) {
    jsonfile.readFile(file, function(err, obj) {
        if (err) {
            console.log(err);
        }
        var arr = Object.keys(obj)
        var resObj = []
        for(var i=0; i < arr.length; i++){
            resObj.push({"title": arr[i]})
        }
        res.send(resObj);
    });
});

app.post("/dates", function(req, res) {
    var school = req.body.school;
    jsonfile.readFile(file, function(err, obj) {
        if (err) {
            console.log(err);
        }
        var start = moment(obj[school].start)
        var end =moment(obj[school].end)

        res.send({"title": school, "start":start, "end":end})
    });

});

app.listen(app.get("port"), function() {
    console.log("Node app is running on port", app.get("port"));
});
