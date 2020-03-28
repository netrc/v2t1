
const AWS = require("aws-sdk")
const axios = require('axios')

exports.handler = async (event, context) => {
  AWS.config.update({
    accessKeyId: process.env.VLCB_RW_AWS_ID,
    secretAccessKey: process.env.VLCB_RW_AWS_SECRET,
    region: 'us-east-1'
  })

  const docClient = new AWS.DynamoDB.DocumentClient()
  const DTable = process.env.VLCB_TABLE_NAME

  const {identity, user} = context.clientContext;
  const iStr = (identity) ? JSON.stringify(identity) : 'no i val'
  const uStr = (user) ? JSON.stringify(user) : 'no u val'

  const params = {
    TableName: DTable,
    Item: {
      pk1: "church",
      sk1: 'AAA-TEST-FROM-NET-FUNC',
      address: 'address 1',
      year: 'c2020',
      mainNote: 'testing insert of church'
    }
  };

  const s = await docClient.put(params, function(err, data) {
    const s = c.name + ((err) ? " - put error:"+JSON.stringify(err, null, 2) : " - put ok")
    return s
  })

  return {
    statusCode: 200,
    body: `dtest: s:${s}  --- VLCB_TABLE_NAME:${process.env.VLCB_TABLE_NAME} - set via netlifyFuncs...i:${iStr}   .....   u:${uStr}`
  };
};
