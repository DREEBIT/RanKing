console.log('running ...');

var request = require('request');
var settings = require("./settings.json");
var _ = require("underscore");
var fs = require('fs');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/googleSearchBot');

var date = new Date();
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

var allKeywords = require('./keywords.json');
var fetchKeywordIndizes = _.range(settings.start, settings.start+settings.keywordsPerDay);

console.log(fetchKeywordIndizes);

var fetchKeyword = function(callback){

	if (fetchKeywordIndizes.length > 0){
		var fetchIndex = fetchKeywordIndizes.shift();


		var index = fetchIndex % allKeywords.length;
		fetchPage(index,0,function(){
			fetchKeyword(callback);
		});
	}else {
		if (typeof callback === "function"){
			callback();
		}
	}

};


var fetchPage = function(keywordIndex, index, callback){

	var keyword = allKeywords[index];
	var url = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&rsz=8&q=' + keyword + '&start=' + index

	console.log("[Request]");
	console.log("Keyword: "+keyword);
	console.log("Page: "+index);
	console.log("--------------------");

	request(url, function (error, response, body) {

		if (!error && response.statusCode == 200) {

			var json = JSON.parse(body);
			if (json.responseData != null) {
				for (var itemIndex = 1; itemIndex < 9; itemIndex++) {

					var e = new Record({
						date: date,
						keyword: keyword,
						rank: index + itemIndex,
						link: json.responseData.results[itemIndex - 1].url
					});

					e.save(function (err, obj) {
						if (err) console.log('error while saving');
					});
				}
			}

		} else {
			console.log("Got an error: ", error, ", status code: ", response.statusCode);
		}

		if (++index < settings.pageLimit){
			fetchPage(keywordIndex, index, callback);
		}else {


			settings.start = index;
			if (settings.start > allKeywords.length){
				settings.start = 0;
			}

			fs.writeFile("./settings.json", JSON.stringify(settings), function(err){
				if (typeof callback === "function"){
					callback();
				}
			});



		}

	});


};


fetchKeyword(function(){

	mongoose.disconnect(function () {
		console.log('Mongoose disconnected');
		process.exit(0);
	});

});

