

const axios = require('axios')

exports.handler = async (event, context) => {
  const {identity, user} = context.clientContext;
  const iStr = (identity) ? JSON.stringify(identity) : 'no i val'
  const uStr = (user) ? JSON.stringify(user) : 'no u val'

  const res = await axios.get("http://httpbin.org/uuid")
  const resj = JSON.parse(res)
  const uuid = res

  return {
    statusCode: 200,
    body: `Hello, World - res:${res} .... VLCB_TABLE_NAME:${process.env.VLCB_TABLE_NAME} - set via netlifyFuncs...i:${iStr}   .....   u:${uStr}`
  };
};
