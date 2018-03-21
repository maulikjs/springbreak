"use strict";

var jsonfile = require("jsonfile")
const rp = require("request-promise");
const cheerio = require("cheerio");

var file = './data.json'

const options = {
    uri: "https://www.studentcity.com/when-is-my-spring-break",
    transform: function(body) {
        return cheerio.load(body);
    }
};

rp(options)
    .then($ => {
        var schools = [];
        $(".views-field-title").each(function(i, elem) {
            schools[i] = $(this).text();
        });

        var dates = [];
        $(".views-field-field-spring-break-week-dates").each(function(i, elem) {
            dates[i] = $(this).text();
        });

        var dict = {};
        var i = 0;
        while (i < schools.length) {
            var datesplit = dates[i].trim().split(" to ");
            if (datesplit[1] === undefined) {
                i++;
            } else {
                dict[schools[i].trim()] = {
                    start: datesplit[0],
                    end: datesplit[1]
                };
                i++;
            }
        }

        console.log(dict)
        jsonfile.writeFile(file, dict, function (err) {
            console.error(err)
        })

    })
    .catch(err => {
        console.log(err);
    });
