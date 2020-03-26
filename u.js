
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1"
  //endpoint: "http://localhost:8000"
});

const iam = new AWS.IAM();

const params = {}
iam.getUser(params, (err,data) => {
  if (err) { console.error('getuser error'); console.dir(err) }
  else { console.dir(data) }
})
