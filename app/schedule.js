var schedule = require('node-schedule');

var bot = require('./bot');

var CronJob = require('cron').CronJob;

//Alle 3 Stunden
new CronJob('* * */3 * * *', function() {

  bot.start();

}, null, true, 'Europe/Berlin');

bot.start();
