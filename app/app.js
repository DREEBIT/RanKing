console.log('running ...');

var http = require('http');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/googleSearchBot');

var entry = mongoose.model('entry', mongoose.Schema({
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

googleSearchRequest = function(keywordList){
    var keyword = keywordList.shift();

    http.request('http://ajax.googleapis.com/ajax/services/search/web?v=1.0&rsz=8&q=' + keyword + '&start=' + '0',
        function (response) {
            var str = '';
            //another chunk of data has been received, so append it to `str`
            response.on('data', function (chunk) {
                str += chunk;

                if(str.responseData != null){
                    for (var i = 0; i < 8; i++){

                        var e = new entry({
                            date: date,
                            keyword: keyword,
                            rank: i+1,
                            link: str.responseData.results[i].url
                        });

                        e.save(function (err, obj) {
                            if (err) console.log('error while saving');
                        });
                    }
                }
            });

            //the whole response has been received, so we just print it out here
            response.on('end', function () {
                if(keywordList.length)
                    googleSearchRequest(keywordList);
            })
        }).end();
};

googleSearchRequest(keywords/*, function(){

    /!*mongoose.disconnect(function () {
        console.log('Mongoose disconnected');
        process.exit(0);
    });*!/
}*/);
