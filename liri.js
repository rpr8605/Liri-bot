require("dotenv").config();

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



//bands-concerts

function concertThis(subject) {
    var queryURL = "https://rest.bandsintown.com/artists/" + subject + "/events?app_id=CODEBOOT-RPR";

    axios.get(queryURL)
        .then(function (response) {
            if (response.statusText == 'Ok') {
                let data = response.data[0];
                console.log("Venue name: " + data.venue.name +
                    "\nVenue location: " + data.venue.city +
                    "\nDate of Event: " + moment(data.datetime).format("MM/DD/YYYY") +
                    "\nTickets Still  Available" + data.offers.status
                    );
            }
        })
};








//movies

function movieThis(movie) {
   
    if (movie === '') {
        request("http://www.omdbapi.com/?t='mr+nobody'&y=&plot=short&apikey=trilogy", function (error, response, body) {
            if (!error ) {
                var movieObject = JSON.parse(body);
                
                var movieResults =
                    "------------------------------"            + "\r\n" +
                    "Title: " + movieObject.Title               + "\r\n" +
                    "Year: " + movieObject.Year                 + "\r\n" +
                    "Imdb Rating: " + movieObject.imdbRating    + "\r\n" +
                    "Country: " + movieObject.Country           + "\r\n" +
                    "Language: " + movieObject.Language         + "\r\n" +
                    "Plot: " + movieObject.Plot                 + "\r\n" +
                    "Actors: " + movieObject.Actors             + "\r\n" +
                    "Rotten Tomatoes Rating: " + 
                        movieObject.tomatoRating                + "\r\n" +
                    "Rotten Tomatoes URL: " + 
                        movieObject.tomatoURL                   + "\r\n" +
                    "------------------------------"            + "\r\n";
                console.log(movieResults);
            } else {
                console.log("Error: " + error);
                console.log(movie);
                return;
            }
        });
    } else {
        request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
            if (!error ) {
                var movieObject = JSON.parse(body);
                
                var movieResults =
                    "------------------------------"            + "\r\n" +
                    "Title: " + movieObject.Title               + "\r\n" +
                    "Year: " + movieObject.Year                 + "\r\n" +
                    "Imdb Rating: " + movieObject.imdbRating    + "\r\n" +
                    "Country: " + movieObject.Country           + "\r\n" +
                    "Language: " + movieObject.Language         + "\r\n" +
                    "Plot: " + movieObject.Plot                 + "\r\n" +
                    "Actors: " + movieObject.Actors             + "\r\n" +
                    "Rotten Tomatoes Rating: " + 
                        movieObject.tomatoRating                + "\r\n" +
                    "Rotten Tomatoes URL: " + 
                    movieObject.tomatoURL                       + "\r\n" +
                    "------------------------------"            + "\r\n";

                    
                console.log(movieResults);
            } else {
                console.log("Error: " + error);
                console.log(movie);
                return;
            }
        })
    }
}




function spotifyThisSong(songName) {
    if (!songName) {
        songName = "The Sign by Ace of Base";
    }
    spotify.search({
        type: "track",
        query: songName
    }, function (err, data) {
        var songInfo = data.tracks.items;
        for (var i = 0; i < 5; i++) {
            if (songInfo[i] != undefined) {
                var spotifyResults =
                    "Artist: " + songInfo[i].artists[0].name + "\r\n" +
                    "Song: " + songInfo[i].name + "\r\n" +
                    "Album the song is from: " + songInfo[i].album.name + "\r\n" +
                    "Preview URL: " + songInfo[i].preview_url + "\r\n" +
                    "------------------" + i + "------------------" + "\r\n";
                console.log(spotifyResults);
            } else {
                console.log("Error: " + err);
                return;
            }
        }
    });
};
