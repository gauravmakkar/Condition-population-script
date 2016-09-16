#!/usr/bin/env node
var mongoDb         = require('mongodb');
var mongoClient     = mongoDb.MongoClient;

if(process.argv.length<5){
	console.log("Not enough parameters passed")
	return
}
// var dbname          = process.argv[2];
// var url             = 'mongodb://localhost:27017/'+dbname;
var url             = process.argv[2];
//var filename        = 'C:\\Script\\icd10cm_codes_2017.txt';
//var filename        = process.argv[4];
var filename        = process.argv[4]?process.argv[4]:"./icd10cm_codes_2017.txt";
console.log(url)
mongoClient.connect(url,function(err,db){
    if(err){
        console.log('error on connection '+err);
    }
    else{
        console.log('***************Successfully connected to mongodb');
		var collectionName=process.argv[3]
        var collection  = db.collection(collectionName);
        var fs          = require('fs');
        var readline    = require('readline');
        var stream      = require('stream');
        var instream    = fs.createReadStream(filename);
        var outstream   = new stream;
        var rl          = readline.createInterface(instream,outstream);
        var bulk = collection.initializeUnorderedBulkOp();
        console.log('***************Parsing, please wait ...');
        rl.on('line',function(line){
            try{
				var arr         = line.split('\t');
                var object   = {};
                //Parse them here
                //Example
				var code= arr[0].substr(0,arr[0].indexOf(" "))
				var text=arr[0].substr(arr[0].indexOf(" "),arr[0].length).trim()
                console.log({code:code,text:text,description:text,system:"ICD10"})
				bulk.insert({code:code,text:text,description:text,system:"ICD10"});
            }
            catch (err){
                console.log(err);
            }
        });

        rl.on('close',function(){
            bulk.execute()
            db.close();
            console.log('***************completed');
        });
    }
});