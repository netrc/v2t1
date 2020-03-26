

# v2t1

first test of 2nd version of vlcb

[![Netlify Status](https://api.netlify.com/api/v1/badges/27ea6143-bee9-4650-9a99-3962ff90dad0/deploy-status)](https://app.netlify.com/sites/ecstatic-albattani-acc6c5/deploys)

Currently at https://ecstatic-albattani-acc6c5.netlify.com/

## Todo
* see what happens with netlify identity
* set bash build.sh as build script (to make .env.js script)
* can't see e file
* hw func - return user info? !not via curl (of course)
* hw func - access control via settings/control panel? - don't see anything
* hw func - called from page itself - see user info?
* hw func - see role?
* hw func - use aws-sdk, access dtest1
* so... all reads direct through client-side(browser) code (w/ caching)
* so... all writes through calls to netlify funcs
* netlify funcs - only 125K calls per month  / $25/month for 2m
* ? use netlify access controlled functions to manage who can write to dtest1? (with AWS secrets in func env?)
* should be able to see user.role - admin (can't see right now?)
* ok - changed user role in netlify identity user interface
* how to programmatically change role?
* ddb RO access token visible in github (AWS called!)
* restrict dynamodb RO to just the dtest1 table


# Config
* dynamodb
* iam group/id made - ric-dd-rw, ric-dd-ro
* netlify
** add repo to netlify app config
** no build, no publish steps


## Done
* ok - added netlify 
* ok - (how would i convert from who (g@gmail.com) to user name?)
* ok - how do my scripts know who is logged in?
* ok - added standard netlify identity script and signup/login menu items
* ok - add google as login provider
* ok - google 'login' / now shows 'Logged in as gnetrc@gmail.com/logout'
* ok - test netlify deployment
* ok - test that dyno db calls from netlify to dynamodb work
* ok - set func directory name in settings
* ok - hello world function working?
* ok - hw func - see env vars; VLCB_ENVA works
