'use strict';

console.log('Starting Bot ...');

var request = require('request');
var _ = require('underscore');
var fs = require('fs');

var mongoose = require('mongoose');


var Record = mongoose.model('Record');
var Request = mongoose.model('Request');
var Keyword = mongoose.model('Keyword');

var allKeywords = [];//require('../../../../config/keywords.json');

module.exports = {

    date: new Date(),

    fetchKeywordIndizes: [],

    settings: {},

    fetchKeyword: function(callback){

        var me = this;
        var requestCount = this.settings.keywordsPerRun * this.settings.pageLimit;
        if (this.fetchKeywordIndizes.length > 0){
            var fetchIndex = this.fetchKeywordIndizes.shift();
            var index = fetchIndex % allKeywords.length;
            this.fetchPage(index,0,function(){
                me.fetchKeyword(callback);
            });
            requestCount++;
        }else {
            if (typeof callback === 'function'){
                callback();

                var re = new Request({
                    date: me.date,
                    count: requestCount
                });

                re.save(function (err, obj) {
                    if (err) console.log('error while saving');
                });

            }
        }
    },

    fetchPage: function(keywordIndex, index, callback){

        var me = this;
        var keyword = allKeywords[keywordIndex];
        var url = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&rsz=8&q=' + keyword + '&start=' + index;

        var options = {
            url: url,
            headers: {
                'Accept-Language': 'de-DE, de'
            }
        };

        console.log('[Request]');
        console.log('Keyword: '+keyword);
        console.log('Page: '+index);
        console.log('--------------------');

        request(options, function (error, response, body) {

            if (!error && response.statusCode === 200) {

                var json = JSON.parse(body);
                if (json.responseData !== null) {

                    var results = json.responseData.results;

                    _.each(results, function(element, i){
                        var results = json.responseData.results;

                        var r = new Record({
                            date: me.date,
                            keyword: keyword,
                            rank: (index * 8) + i + 1,
                            link: element.url
                        });

                        r.save(function (err, obj) {
                            if (err) console.log('error while saving');
                        });

                    });
                }
            } else {
                console.log('Got an error: ", error, ", status code: ', response.statusCode);
            }

            if (++index < me.settings.pageLimit){
                me.fetchPage(keywordIndex, index, callback);
            }else {

                me.settings.start = keywordIndex+1;
                if (me.settings.start > allKeywords.length){
                    me.settings.start = 0;
                }

                fs.writeFile('./config/settings.json', JSON.stringify(me.settings), function(err){
                    if (err){
                        console.log(err);
                    }
                    if (typeof callback === 'function'){
                        callback();
                    }
                });
            }
        });
    },

    start: function(){

        var me = this;
        console.log('Start Requesting');
        this.date = new Date();
        this.settings = JSON.parse(fs.readFileSync('./config/settings.json', 'utf8'));
        this.fetchKeywordIndizes = _.range(this.settings.start, this.settings.start+this.settings.keywordsPerRun);

        Keyword.find({},function(err, items){

            if (!err){
                var keywords = [];
                items.forEach(function(item){
                    keywords.push(item.title);
                });

                allKeywords = keywords;

                me.fetchKeyword(function(){
                    console.log('Done');
                });
            }

        });



    },

    log: function(message){

        console.log(message);
    }
};
