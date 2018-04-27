var elasticsearch = require('elasticsearch');
var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
rule.minute = 30;

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});


var checkEsStatus = schedule.scheduleJob(rule, function(){
    client.ping(
        {
        requestTimeout: 3000
        },
        (error) => {
            if (error){
                console.trace('Elasticsearch cluster is down!');    
            } else {
                console.log('Elasticsearch cluster is okay.') // TODO: UPLOAD DATA
            }
        }
    
    );
});


exports.get_test = (req, res, next) => {
    res.status(200).json({
        message: "Successful GET"
    });
}

exports.post = (req, res, next) => {
    client.index({
        index: '',
        type: '',
        body: req.body
    }, (error, response) => {
        console.log(error);
    });
}