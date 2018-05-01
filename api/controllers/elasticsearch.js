const elasticsearch = require('elasticsearch');
const schedule = require('node-schedule');
//const moment = require('moment')

const rule = new schedule.RecurrenceRule();
rule.minute = 30;

const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});


const checkEsStatus = schedule.scheduleJob(rule, function(){
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

const helpSkeleton = { 
        "body": { 
            "index": "name of elasticsearch index", 
            "data": "json data",
            "type": "type of data",
            "timestamp": "mm:hh dd-MM-yyyy"
            }
        };
    
exports.help = (req, res, next) => {
    res.status(200).json({
        message: "Hello World!",
        help: helpSkeleton
    });
}

exports.post_test = (req, res, next) => {
    res.status(200).json({
        message: "Successful POST"
    });

    console.log(req.body);
}

exports.post = (req, res, next) => {

    const index = req.body.index;
    if(!index){
        res.status(204).json({
            message: "Please specify an elasticsearch index."
        });
    }

    //TODO: if Es not available, save data

    //const now = moment().format('YYYY-MM-DD HH:mm:ss Z');
    client.index({
        index: index,
        type: req.body.type,
        body: req.body.data
    }, (error, response, status) => {
        if(error){
            console.log(error);
            res.status(500).json({
                message: "Internal error. Elasticsearch is not reachable."
            });
        }
        console.log(response);
        res.status(201).json({
            message: response,
            status: status
        });
    });
}