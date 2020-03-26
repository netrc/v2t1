
const AWS = require("aws-sdk")
const fs = require('fs')

AWS.config.update({
  region: "us-east-1" //endpoint: "http://localhost:8000"
})

const docClient = new AWS.DynamoDB.DocumentClient()
const DTable = "dtest1"

const jsonRead = ( f ) => {
  const lines = fs.readFileSync(f, {encoding:'utf8'} ).split('\n')
  console.log(`${f}.length:${lines.length}`)

  return lines.map( l => {
    let c = {}
    try { c = JSON.parse(l) } 
      catch { c = {}  }
    return c
  })
}

pics = jsonRead('d18/Pic.json')
const getPic = ( n ) => {
  const z = pics.filter( p => p.name==n )[0]
//console.log(`${n} - ${typeof(z)}`)
  return { thumb: z.thumb, full: z.full }
}

const maybeTBD = ( k, c ) => (k in c)&&c[k]!='' ? c[k] : `${k} tbd`
const maybePic = ( k, c ) => (k in c)&&c[k]!='' ? getPic(c[k]) : `{}`

cArray = jsonRead('d18/Church.json').filter( c => ('name' in c) )
cArray.forEach( c => {
//  console.log(c.name)
  const params = {
    TableName: DTable,
    Item: {
      pk1: "church",
      sk1: c.name,
    }
  };
  // add other fields
  ['address', 'latlon', 'year', 'mainNote', 'mainPic'].forEach( k => { params.Item[k] = maybeTBD(k, c) } )
  params.Item.mainPic = maybePic('mainPic', c) 
console.log(`${params.Item.sk1} mainpic:${params.Item.mainPic}`)

  docClient.put(params, function(err, data) {
if(err) { console.error(err) }
    const s = c.name + ((err) ? " - put error:"+JSON.stringify(err, null, 2) : " - put ok")
    console.log(s)
  })
})
