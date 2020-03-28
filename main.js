
if (typeof(VLCB) == "undefined") {
  VLCB = { TABLE_NAME: 'no global vlcb' }
}
console.log(`VLCB_TABLE_NAME: ${VLCB.TABLE_NAME}`)

AWS.config.update({
  region: "us-east-1",
  accessKeyId: VLCB.AWS_ID,  // dyndb ro access only
  secretAccessKey: VLCB.AWS_SECRET 
})

const docClient = new AWS.DynamoDB.DocumentClient()
const mdConv = new showdown.Converter()

const DGEByID = (id) => document.getElementById(id)
const mapUrl = (ll) => `https://maps.google.com/maps?ll=${ll[0]},${ll[1]}&q=${ll[0]},${ll[1]} &hl=en&t=m&z=12`

// for calling netlify funcs with token: https://dev.to/moshe/implementing-access-control-with-netlify-identity-and-netlify-functions-3jpj

const mainDtestClick = (e) => {
  const U = 'https://ecstatic-albattani-acc6c5.netlify.com/.netlify/functions/dtest'  ;  // semi-c for IIFE
  (async () => { // see above URL for tools to put in separate file/module
const currentUser = netlifyIdentity.currentUser()
DGEByID('currentUser').innerHTML = (!user) ? `user is null` : `${user.email} ... ${user.user_metadata.full_name} roles:${user.user_metadata.roles.join(',')}`
    await currentUser.jwt() // gets new JWT token only if expired
    const btoken = currentUser.token.access_token

    // ?? return the fetch?
    fetch(U, {headers: { Authorization: `Bearer ${btoken}` }})
    .then((response) => { console.log(`mainDtestClick response status: ${response.status}`)
      return response.text()  // .text() and .json() are promises
    })
    .then((t) => { console.log(`mainDtestClick text: ${t}`)
    })
    .catch((err) => {
      console.log(`mainDtestClick error: ${err}`);
    });

  })()
}

const getChurch = (sk1Val) => {
  const pk1Val = "church"
  var params = {
    TableName: VLCB.TABLE_NAME,
    Key:{ pk1: pk1Val, sk1: sk1Val }
  }
  return docClient.get(params).promise()
}

const showChurch = (c) => {
    DGEByID('status').innerHTML = `getItem succeeded - ${c.sk1}`
    DGEByID('cname').innerHTML = c.sk1
    DGEByID('cyear').innerHTML = c.year
    DGEByID('caddress').innerHTML = c.address
    const ll = c.latlon.split(",")
    DGEByID('clatlon').href = mapUrl(ll)
    DGEByID('cmainNote').innerHTML = mdConv.makeHtml(c.mainNote)
    if (('mainPic' in c) && ('thumb' in c.mainPic)) {
      DGEByID('mainPic').src = c.mainPic.thumb
    }
}

const sk1Val = "St. Peter's"
getChurch(sk1Val).then( d => showChurch(d.Item) )
  .catch(err => { // !! bad sk1Val doesn't throw catch; goes to showChurch with d.Item==null
    DGEByID('status').innerHTML = "Unable to read item: " + JSON.stringify(err)
  }) 
