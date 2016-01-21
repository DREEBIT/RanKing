console.log('running ...');

var http = require('http');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/googleSearchBot');

var Record = mongoose.model('Record', mongoose.Schema({
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
        //iteration to do 2 requests a 8 results each keyword
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

var dbDisconnect = function(){
    mongoose.disconnect(function () {
        console.log('Mongoose disconnected');
        process.exit(0);
    });
};

doRequests = function(requests) {

    if (requests.length) {
        var request = requests.shift();

        http.request(request.requestUrl,
            function (response) {
                var str = '';
                //another chunk of data has been received, so append it to `str`
                response.on('data', function (chunk) {
                    str += chunk;

                });

                //the whole response has been received, so we just print it out here
                response.on('end', function () {
                    json = JSON.parse(str);

                    if (json.responseData != null) {
                        for (var pageIndex = 1; pageIndex < 9; pageIndex++) {

                            var e = new Record({
                                date: date,
                                keyword: request.keyword,
                                rank: pageIndex + request.start,
                                link: json.responseData.results[pageIndex - 1].url
                            });

                            e.save(function (err, obj) {
                                if (err) console.log('error while saving');
                            });
                        }
                    }
                    doRequests(requests);
                })
            }).end();
    }
};

doRequests(requests);
