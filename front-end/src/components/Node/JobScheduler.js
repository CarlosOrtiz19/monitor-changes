const schedule = require('node-schedule');


exports.createJob = () => {
    const job = schedule.scheduleJob('* * * * *', function () {
        console.log('The answer to life, the universe, and everything!');
    });

}
