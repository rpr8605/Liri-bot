var fs = require("fs");
var moment = require('moment');
var axios = require("axios");
var request = require('request');

var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var liriArg= process.argv[2];


var liriSub = process.argv.slice(3).join(" ");



switch (liriArg) {
    case "concert-this":
        concertThis(liriSub);
        break;
    case "spotify-this-song":
        spotifyThisSong(liriSub);
        break;
    case "movie-this":
        movieThis(liriSub);
        break;
    case "do-what-it-says":
        iWantItThatWay();
        break;
   
};