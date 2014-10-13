// Sample to demonstrate the usage of getdns nodejs API and host it
// in an express web context.
// Install from http://expressjs.com/ and follow instructions to setup in the Readme
//
var express = require('../../../../expressjs/express-master');
var app = module.exports = express();

// getdns includes. set LD_LIBRARY_PATH to /usr/local/lib
var getdns = require('getdns');

var options = {
    // request timeout time in millis
    timeout : 5000,
    // always return dnssec status
    return_dnssec_status : true
    };

// getdns query callback
var callback = function(err, result) {
        
    process.stdout.write("testing app err = " + JSON.stringify(err));
    // if not null, err is an object w/ msg and code.
    // code maps to a GETDNS_CALLBACK_TYPE
    // result is a response dictionary
    var res1 = "<h1>Response tree for getdnsapi.net</h1>";
    if (result == null ) {
        res1 += "<p>No result</p>";
        process.stdout.write("no result\n");
    } else {
        for ( var index in result.replies_tree) {
            process.stdout.write("tree = " +  JSON.stringify(result.replies_tree[index], 0 , 2));
            res1 += "<h3>QUESTION</h3><pre> " + JSON.stringify(result.replies_tree[index].question, 0, 4) + "</pre>";
            res1 += "<h3>HEADER</h3><pre> " + JSON.stringify(result.replies_tree[index].header, 0, 2) + "</pre>";
            res1 += "<h3>DNSSEC_STATUS</h3><pre> " + JSON.stringify(result.replies_tree[index].dnssec_status, 0, 2) + "</pre>";
            res1 += "<h3>CANONICAL_NAME</h3><pre> " + JSON.stringify(result.replies_tree[index].canonical_name, 0, 2) + "</pre>";
            for ( var index1 in result.replies_tree[index].answer) {
                res1 += "<h3>ANSWER</h3><pre> " + JSON.stringify(result.replies_tree[index].answer[index1], 0, 2) + "</pre>";
            }
            for ( var index1 in result.replies_tree[index].authority) {
                res1 += "<h3>AUTHORITY</h3><pre> " + JSON.stringify(result.replies_tree[index].authority[index1], 0, 2) + "</pre>";
            }
            for ( var index1 in result.replies_tree[index].additional) {
                res1 += "<h3>AUTHORITY</h3><pre> " + JSON.stringify(result.replies_tree[index].additional[index1], 0, 2) + "</pre>";
            }
         } 
    }
    app.get('/', function(req, res){
        res.send(res1);
    });
    // when done with a context, it must be explicitly destroyed
    context.destroy();
}

// create the context with the above options
var context = getdns.createContext(options);

// getdns general
// last argument must be a callback

var transactionId = context.lookup("getdnsapi.net", getdns.RRTYPE_A, callback);

// extensions are passed as dictionaries
// where the value for on / off are normal bools
//context.getAddress("cnn.com", { return_both_v4_and_v6 : true }, callback);


if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
