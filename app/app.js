console.log('running ...');

var http = require('http');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/googleSearchBot');

var Entry = mongoose.model('Entry', mongoose.Schema({
    date: {
        type: Date
    },
    keyword: {
        type: String
    },
    rank: {
        type: Number
    },
    link: {
        type: String
    }
}));

var keywords = require('./keywords.json');
var date = new Date();
var requests = [];

prepareRequests = function (keywords) {
    while(keywords.length > 0) {
        var keyword = keywords.shift();
        for (var i = 0; i < 2; i++) {
            var j = i * 8;
            requests.push(
                {
                    page: i,
                    start: j,
                    keyword: keyword,
                    requestUrl: 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&rsz=8&q=' + keyword + '&start=' + j
                }
            );
        }
    }
};
prepareRequests(keywords);
 /*
saveResults = function(){

};

var doRequests = function (requests) {

    if (requests.length) {
        var request = requests.shift();

        console.log(request);

        http.request(request.Url, function(response){

            var str = '';

            //another chunk of data has been received, so append it to `str`
            response.on('data', function (chunk) {
                str += chunk;
                console.log('this is a chunk' + chunk);

                var json = JSON.parse(chunk);

                if(json.responseData != null){

                    for (var i = 0 ; i < 8 ; i++){

                        var e = new Entry({
                            date: date,
                            keyword: request.keyword,
                            rank: request.start + i,
                            link: json.responseData.results[i].url
                        });

                        e.save(function (err, obj) {
                            if (err) console.log('error while saving');
                        });
                    }
                }

            });

            //the whole response has been received, so we just print it out here
            response.on('end', function () {
                console.log(str);

                doRequests(requests);
            })
        }).end();


    }
};

doRequests(requests);*/
/*
googleSearchRequest = function(requests){

    var request = requests.shift();

        http.request('http://ajax.googleapis.com/ajax/services/search/web?v=1.0&rsz=8&q=' + request.keyword + '&start=' + request.start,
            function (response) {
                var str = '';
                //another chunk of data has been received, so append it to `str`
                response.on('data', function (chunk) {
                    str += chunk;

                });

                //the whole response has been received, so we just print it out here
                response.on('end', function () {
                    json = JSON.parse(str);

                    if(json.responseData != null){
                        for (var pageIndex = 1 ; pageIndex < 9 ; pageIndex++){

                            var e = new Entry({
                                date: date,
                                keyword: request.keyword,
                                rank: pageIndex + request.start,
                                link: json.responseData.results[pageIndex-1].url
                            });

                            e.save(function (err, obj) {
                                if (err) console.log('error while saving');
                            });
                        }
                    }

                    if(requests.length)
                        googleSearchRequest(requests);
                })
            }).end();

    };

googleSearchRequest(requests/!*, function(){


}*!/);*/

var compareWith = require('./compareWith.json');

compareWithStrings = function(){

    var re = new RegExp('' + compareWith.join('|') + '', "ig");

    Entry.find({link: re}, function(err, entries) {
        if (err) return console.error(err);

        console.log(entries);
        /*if(entries.length){
            entry = entries.shift();
        }*/
        dbDisconnect();
    });
};

compareWithStrings();

var dbDisconnect = function(){
    mongoose.disconnect(function () {
        console.log('Mongoose disconnected');
        process.exit(0);
    });
};