
const AWS = require('aws-sdk')
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
      pk1: 'church',
      sk1: 'AAA-TEST-FROM-NET-FUNC',
      address: 'address 1',
      year: 'c2020',
      mainNote: 'testing insert of church'
    }
  };

  let s = 'dtest handler: (asssumed) error'
  docClient.put(params).promise().then( r => {
    s = params.Item.pk1 + ` - put ok: data: ${r}`
    return {
      statusCode: 201,
      body: `dtest: s:${s}  --- VLCB_TABLE_NAME:${process.env.VLCB_TABLE_NAME} - ...i:${iStr}   .....   u:${uStr}`
    }
  }).catch(err => {
    s += ` error catch: ${err}`
    return {
      statusCode: 418,
      body: `dtest: s:${s}  --- VLCB_TABLE_NAME:${process.env.VLCB_TABLE_NAME} - ...i:${iStr}   .....   u:${uStr}`
    }
  })

};
