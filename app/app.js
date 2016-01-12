console.log('running ...');

var http = require('http');

var fs = require('fs');

var keywordsList = require('./keywords.json');
var results = require("./results/result.json");

googleRequest = function(keywordlist, callback){
    console.log('sending search requests to google for strings:');

    var result = {
        'date': new Date().toString('yyyy-MM-dd'),
        'queries': []
    };

    keywordlist.forEach(function(keyword){
        http.request('http://ajax.googleapis.com/ajax/services/search/web?v=1.0&rsz=8&q=' + keyword, function (response){

            var str = '';

            //another chunk of data has been received, so append it to `str`
            response.on('data', function (chunk) {
                str += chunk;
            });

            //the whole response has been received, so we just print it out here
            response.on('end', function () {

                result.queries.push({
                    'searchphrase': keyword,
                    'responseData': JSON.parse(str).responseData
                });

                callback(result);
            })
        }).end();


    });
};

googleRequest(keywordsList, function(result){
    results.push(result);

    fs.writeFile('.' + '/results/result.json', JSON.stringify(results[results.length - 1]), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
});

