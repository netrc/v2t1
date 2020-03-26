
exports.handler = async (event, context) => {
  const {identity, user} = context.clientContext;
  const iStr = (identity) ? JSON.stringify(identity) : 'no i val'
  const uStr = (user) ? JSON.stringify(user) : 'no u val'
  return {
    statusCode: 200,
    body: `Hello, World - VLCB_ENVA:${process.env.VLCB_ENVA} - set via netlifyFuncs...i:${iStr}   .....   u:${uStr}`
  };
};
