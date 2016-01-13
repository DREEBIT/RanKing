console.log('running ...');

var http = require('http');
/*var google = require('google');*/

/*google.resultsPerPage = 25;
 var nextCounter = 0;*/

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
                /*str += chunk;*/
                str = {
                    "responseData": {
                        "results": [
                            {
                                "GsearchResultClass": "GwebSearch",
                                "unescapedUrl": "http://www.vakuum.no/",
                                "url": "http://www.vakuum.no/",
                                "visibleUrl": "www.vakuum.no",
                                "cacheUrl": "http://www.google.com/search?q=cache:nmIZ48xjER4J:www.vakuum.no",
                                "title": "<b>Vakuum Service</b> AS |",
                                "titleNoFormatting": "Vakuum Service AS |",
                                "content": "<b>Vakuum Service</b> AS er et firma som siden 1972 har spesialisert seg innen ... \nForuten salg og <b>service</b> av vakuumteknisk utstyr konstruerer og produserer vi ..."
                            },
                            {
                                "GsearchResultClass": "GwebSearch",
                                "unescapedUrl": "http://www.oerlikon.com/leyboldvacuum/usa/en/",
                                "url": "http://www.oerlikon.com/leyboldvacuum/usa/en/",
                                "visibleUrl": "www.oerlikon.com",
                                "cacheUrl": "http://www.google.com/search?q=cache:8kbdLjohmOYJ:www.oerlikon.com",
                                "title": "Oerlikon Leybold <b>Vacuum</b> - USA",
                                "titleNoFormatting": "Oerlikon Leybold Vacuum - USA",
                                "content": "We are dedicated to providing you with the highest quality <b>vacuum</b> products at \ncompetitive pricing and top notch customer <b>service</b>. Please contact us to learn ..."
                            },
                            {
                                "GsearchResultClass": "GwebSearch",
                                "unescapedUrl": "http://www.oerlikon.com/leyboldvacuum/en/services/",
                                "url": "http://www.oerlikon.com/leyboldvacuum/en/services/",
                                "visibleUrl": "www.oerlikon.com",
                                "cacheUrl": "http://www.google.com/search?q=cache:cbx4fJkE0qgJ:www.oerlikon.com",
                                "title": "<b>Services</b> « Oerlikon Leybold <b>Vacuum</b>",
                                "titleNoFormatting": "Services « Oerlikon Leybold Vacuum",
                                "content": "Oerlikon Leybold Vacuum Pumps Pump systems Vacuum Oils Accessories \n<b>Services Vacuum</b> Technology and Solutions ensure your innovation processes."
                            },
                            {
                                "GsearchResultClass": "GwebSearch",
                                "unescapedUrl": "https://www.pfeiffer-vacuum.com/de/service/",
                                "url": "https://www.pfeiffer-vacuum.com/de/service/",
                                "visibleUrl": "www.pfeiffer-vacuum.com",
                                "cacheUrl": "http://www.google.com/search?q=cache:HEwdotPfn98J:www.pfeiffer-vacuum.com",
                                "title": "<b>Service</b> | Pfeiffer <b>Vacuum</b>",
                                "titleNoFormatting": "Service | Pfeiffer Vacuum",
                                "content": "Nach dem Kauf eines Produktes von Pfeiffer <b>Vacuum</b> ist unser <b>Service</b> noch \nlange nicht zu Ende. Oft fängt er dann erst richtig an. Natürlich in bewährter \nPfeiffer ..."
                            },
                            {
                                "GsearchResultClass": "GwebSearch",
                                "unescapedUrl": "https://www.pfeiffer-vacuum.com/de/service/serviceportfolio/praeventiver-service/",
                                "url": "https://www.pfeiffer-vacuum.com/de/service/serviceportfolio/praeventiver-service/",
                                "visibleUrl": "www.pfeiffer-vacuum.com",
                                "cacheUrl": "http://www.google.com/search?q=cache:gw94FfZ9NZwJ:www.pfeiffer-vacuum.com",
                                "title": "Präventiver <b>Service</b> | <b>Service</b> | Pfeiffer <b>Vacuum</b>",
                                "titleNoFormatting": "Präventiver Service | Service | Pfeiffer Vacuum",
                                "content": "Präventiver <b>Service</b> heißt: maximale Verfügbarkeit. Wartung, wenn Sie es sich \nleisten können – geplant nach Ihrem speziellen Betriebsablauf. Bei \nfachgerechter ..."
                            },
                            {
                                "GsearchResultClass": "GwebSearch",
                                "unescapedUrl": "https://www.pfeiffer-vacuum.com/de/service/service-anforderung/",
                                "url": "https://www.pfeiffer-vacuum.com/de/service/service-anforderung/",
                                "visibleUrl": "www.pfeiffer-vacuum.com",
                                "cacheUrl": "http://www.google.com/search?q=cache:SyYf-lT5PycJ:www.pfeiffer-vacuum.com",
                                "title": "<b>Service</b> Anforderung | Pfeiffer <b>Vacuum</b>",
                                "titleNoFormatting": "Service Anforderung | Pfeiffer Vacuum",
                                "content": "Ob präventiver Vor-Ort-<b>Service</b> oder Reparatur in einem <b>Service</b> Center in Ihrer \nNähe - Sie haben ... Nehmen Sie den Pfeiffer <b>Vacuum Service</b> in Anspruch."
                            },
                            {
                                "GsearchResultClass": "GwebSearch",
                                "unescapedUrl": "https://www.youtube.com/watch?v=yF13yOef3ZQ",
                                "url": "https://www.youtube.com/watch%3Fv%3DyF13yOef3ZQ",
                                "visibleUrl": "www.youtube.com",
                                "cacheUrl": "http://www.google.com/search?q=cache:WpitLeWUcK4J:www.youtube.com",
                                "title": "<b>Service</b> Vakuumpumpe Tischmodelle - YouTube",
                                "titleNoFormatting": "Service Vakuumpumpe Tischmodelle - YouTube",
                                "content": "Aug 5, 2015 <b>...</b> Serviceanleitung für die Wartung einer Vakuumpumpe bei Vakuummaschinen \nder Firma Boss <b>Vakuum</b>. Ölwechsel, Austausch ..."
                            },
                            {
                                "GsearchResultClass": "GwebSearch",
                                "unescapedUrl": "http://www.buschvacuum.com/at/de/solutions/customised-service",
                                "url": "http://www.buschvacuum.com/at/de/solutions/customised-service",
                                "visibleUrl": "www.buschvacuum.com",
                                "cacheUrl": "http://www.google.com/search?q=cache:PWn0pkwE_XgJ:www.buschvacuum.com",
                                "title": "Individueller <b>Service</b> - Busch Vakuumpumpen und Systeme",
                                "titleNoFormatting": "Individueller Service - Busch Vakuumpumpen und Systeme",
                                "content": "Vakuumsysteme, die regelmäßig und gründlich gewartet werden, arbeiten mit \noptimalem Wirkungsgrad und halten Ihre Betriebskosten niedrig. Außerdem ..."
                            }
                        ],
                        "cursor": {
                            "resultCount": "107,000",
                            "pages": [
                                {
                                    "start": "0",
                                    "label": 1
                                },
                                {
                                    "start": "8",
                                    "label": 2
                                },
                                {
                                    "start": "16",
                                    "label": 3
                                },
                                {
                                    "start": "24",
                                    "label": 4
                                },
                                {
                                    "start": "32",
                                    "label": 5
                                },
                                {
                                    "start": "40",
                                    "label": 6
                                },
                                {
                                    "start": "48",
                                    "label": 7
                                },
                                {
                                    "start": "56",
                                    "label": 8
                                }
                            ],
                            "estimatedResultCount": "107000",
                            "currentPageIndex": 0,
                            "moreResultsUrl": "http://www.google.com/search?oe=utf8&ie=utf8&source=uds&start=0&hl=en&q=Service+Vakuum",
                            "searchResultTime": "0.36"
                        }
                    }
                };



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
