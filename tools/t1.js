
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1"
  //endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "dtest1";

var year = 2015;
var title = "The Big New Movie";

var params = {
    TableName: table,
    Key:{
        "pk1": "church1",
        "sk1": "St. Mary's"
    }
};

docClient.get(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
});

