
const AWS = require("aws-sdk")

AWS.config.update({
  region: "us-east-1"
  //endpoint: "http://localhost:8000"
})

const docClient = new AWS.DynamoDB.DocumentClient()

const DTable = "dtest1"

const params = {
    TableName: DTable,
    Key:{ "pk1": "church", "sk1": "St. Mary's" }
}
docClient.get(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2))
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2))
    }
})

const params1 = {
    TableName : DTable,
    KeyConditionExpression: "pk1 = :cval",
    ExpressionAttributeValues: { ':cval': 'church' }
}
const params2 = {
    TableName : DTable,
    KeyConditionExpression: "pk1 = :qaz and begins_with(sk1, :valprefix)",
    ExpressionAttributeValues: {
      //':valprefix': 'churc'
      ':qaz': 'church',
      ':valprefix': 'St'
    }
}
//ExpressionAttributeNames:{  '#pk1': 'pk1' },

docClient.query(params1, (err, data) => {
    if (err) {
        console.error("1-Unable to query. Error:", JSON.stringify(err, null, 2))
    } else {
        console.log("1-Query succeeded.")
        data.Items.forEach(item => console.dir(item))
    }
})

docClient.query(params2, (err, data) => {
    if (err) {
        console.error("2-Unable to query. Error:", JSON.stringify(err, null, 2))
    } else {
        console.log("2-Query succeeded.")
        data.Items.forEach(item => console.dir(item))
    }
})

