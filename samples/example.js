// Sample code to demonstrate the nodejs getdns API usage

var getdns = require('getdns');
var options = {
    // request timeout time in millis
    timeout : 5000,
    // always return dnssec status
    return_dnssec_status : true
};

// getdns query callback
var callback = function(err, result) {
        
        // if not null, err is an object w/ msg and code.
        // code maps to a GETDNS_CALLBACK_TYPE
        // result is a response dictionary
        if (result == null ) {
            process.stdout.write("Error: no result\n");
        } else {
            for ( var index in result.replies_tree) {
                process.stdout.write(JSON.stringify(result.replies_tree[index], null, 2));
            } 
        }
        // A third argument is also supplied as the transaction id
        // See below for the format of response
        // when done with a context, it must be explicitly destroyed
        context.destroy();
}

// create the context with the above options
var context = getdns.createContext(options);

// getdns general
// third argument may be a dictionary for extensions
// last argument must be a callback
var transactionId = context.lookup("getdnsapi.net", getdns.RRTYPE_A, callback);

// cancel a request
// context.cancel(transactionId);

// other methods, TODO: dont destroy context in callback to reuse
//context.getAddress("getdnsapi.net", callback);
//context.getService("getdnsapi.net", callback);
//context.getHostname("8.8.8.8", callback);

// extensions are passed as dictionaries
// where the value for on / off are normal bools
//context.getAddress("cnn.com", { return_both_v4_and_v6 : true }, callback);


