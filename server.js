'use strict';

/**
 * Module dependencies.
 */
var app = require('./config/lib/app');
var server = app.start();


console.log('STARTING BOT EVERY 3 HOURS');

var bot = require('./modules/records/server/controllers/bot.server.controller');
var later = require('later');

later.date.localTime();

var schedule = {
    schedules:[
        {h: [0 ,3, 6 ,9, 12, 15, 18, 21]}
    ]
};

later.setInterval(bot.start(), schedule);

/*
console.log('STARTING CRON JOB EVERY 3 HOURS');

var CronJob = require('cron').CronJob;
//Alle 3 Stunden
new CronJob('* * *!/3 * * *', function() {

    console.log('Starting Cron Job');
    bot.start();

}, null, true, 'Europe/Berlin');

bot.start();
*/
