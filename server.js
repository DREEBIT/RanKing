'use strict';

/**
 * Module dependencies.
 */
var app = require('./config/lib/app');
var server = app.start();

var bot = require('./modules/records/server/controllers/bot.server.controller');
/*
var later = require('later');
later.date.localTime();

/!*var schedule = {
    schedules:[
        {m: [0 ,3, 6 ,9, 12, 15, 18, 21]}
    ]
};*!/

var schedule = {
    schedules:
        [
            {m_b: [10]}
        ]
};

console.log(schedule);

later.setInterval(bot.start(), schedule);

bot.start();*/

console.log('STARTING CRON JOB EVERY 3 HOURS');

var CronJob = require('cron').CronJob;

new CronJob('00 0,3,6,9,12,15,18,21 * * *', function() {

    console.log('Starting Cron Job');
    bot.start();

}, null, true, 'Europe/Berlin');
