const yelp = require('yelp-fusion');
var config = require("./config");


yelp.accessToken(config.YELP_ID, config.YELP_SECRET).then(response => {
        const client = yelp.client(response.jsonBody.access_token);
        console.log(response.jsonBody.access_token);
        client.search({
            latitude: 38.9910405, 
            longitude: -76.94309439999999,
            radius: "500",
            limit: 50
        }).then(response => {
            //console.log(response.jsonBody.businesses);
            var data = response.jsonBody.businesses;
            console.log(data);
        });
    }).catch(e => {
        console.log(e);
    });
