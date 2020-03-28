

# v2t1

first test of 2nd version of vlcb

[![Netlify Status](https://api.netlify.com/api/v1/badges/27ea6143-bee9-4650-9a99-3962ff90dad0/deploy-status)](https://app.netlify.com/sites/ecstatic-albattani-acc6c5/deploys)

Currently at https://ecstatic-albattani-acc6c5.netlify.com/

## Todo
* try netlify identity button
* so... all reads direct through client-side(browser) code (w/ caching)
* so... all writes through calls to netlify funcs
* netlify funcs - only 125K calls per month  / $25/month for 2m
* see what happens with netlify identity 
  * working great; gets federated identity; manually sets role; need code to check
* how to programmatically change role?
* restrict dynamodb RW&RO to just the dtest1 table
* why doesn't front-end work with .env.js filename?


# Config
* AWS
  * dynamodb
  * iam group/id made - ric-dd-rw, ric-dd-ro
* Front-End
  * index.html/main.js run aws ddb read/query funcs directly
  * git push copies to netlify
  * Need to get bearer token when invoking netflify func
* Netlify front end
  * add repo to netlify app config
  * setting 'admin' role to user(me)  manually
  * added build env vars
    * build.sh makes env.js w/ iam secrets for front end
    * env vars part of functions process.env 
* Netlify functions
  * converts bearer token to identity/roles automatically


## Done
* ok - hw func - need build.sh to put env in netlifyFuncs dir ?
* ok - dtest - use new env vars
* ok - build.sh - put new env vars in file // build runs this with env set; we write to file to be used by index.html front end
* ok dtest: aws-sdk ok? aws config ok? doc ok?
* ok - front end has to get JWT token and send it (Auth Bearer) to netlify funcs
* ok - dtest - Auth Bearer token is translated back to user context and roles
* ok - funcs/dtest - no explicit access control from front panel (that I can see) (i.e. no true Gateway functionality)
* ok - yes, you can see the roles array in metadata
* ok - should be able to see user.role - admin 
* ok - dtest - uses aws-sdk
* ok - moved token to env.js file; was: ddb RO access token visible in github (AWS called!)
* ok set bash build.sh as build script (to make env.js script)
* ok - added netlify 
* ok - (how would i convert from who (g@gmail.com) to user name?)
* ok - changed user role in netlify identity user interface
* ok - how do my scripts know who is logged in? see docs netlifyIdentity.currentUser()
* ok - added standard netlify identity script and signup/login menu items
* ok - add google as login provider
* ok - google 'login' / now shows 'Logged in as gnetrc@gmail.com/logout'
* ok - test netlify deployment
* ok - test that dyno db calls from netlify to dynamodb work
* ok - set func directory name in settings
* ok - hello world function working?
* ok - hw func - see env vars; VLCB_ENVA works


### two year old tools - aws cli
Fri Apr 28 18:52:09 DST 2017

Followed http://docs.aws.amazon.com/cli/latest/userguide/cli-roles.html
* used pre-existing user riciam1
* created new role dynmgr;  added riciam1 as assumeRole
* created new policy AssumeDynMgr; added dynMgr as role
* assigned AssumeDynMgr to riciam1
* got new access ID and secret; added to awscli via "aws configure"

				$ sudo apt-get install python-pip
				$ sudo pip install awscli
				$ which aws
				/usr/local/bin/aws
				$ aws --version
				aws-cli/1.11.81 Python/2.7.6 Linux/3.4.0+ botocore/1.5.44

				$ aws iam list-groups
				$ aws dynamodb list-tables
				$ aws dynamodb scan --table ctest
