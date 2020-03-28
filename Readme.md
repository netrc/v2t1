

# v2t1

first test of 2nd version of vlcb

[![Netlify Status](https://api.netlify.com/api/v1/badges/27ea6143-bee9-4650-9a99-3962ff90dad0/deploy-status)](https://app.netlify.com/sites/ecstatic-albattani-acc6c5/deploys)

Currently at https://ecstatic-albattani-acc6c5.netlify.com/

## Todo
* ok - hw func - need build.sh to put env in netlifyFuncs dir ?
* todo - dtest - use new env vars
* todo - build.sh - put new env vars in file
* ? dtest: aws-sdk ok? aws config ok? doc ok?
* hw func - return user info? !not via curl (of course)
* hw func - access control via settings/control panel? - don't see anything
* hw func - called from page itself - see user info?
* hw func - see role?
* hw func - use aws-sdk, access dtest1
* try netlify identity button
* so... all reads direct through client-side(browser) code (w/ caching)
* so... all writes through calls to netlify funcs
* netlify funcs - only 125K calls per month  / $25/month for 2m
* ? use netlify access controlled functions to manage who can write to dtest1? (with AWS secrets in func env?)
* should be able to see user.role - admin (can't see right now?)
* see what happens with netlify identity 
  ** working great; gets federated identity; manually sets role; need code to check
* how to programmatically change role?
* restrict dynamodb RO to just the dtest1 table
* why not work with .env.js ?


# Config
* dynamodb
* iam group/id made - ric-dd-rw, ric-dd-ro
* index.html/main.js run aws ddb read/query funcs directly
* netlify
** add repo to netlify app config
** added build env vars
** added build.sh, just to make env.js, w/ iam secrets
** added netlify test function
** setting 'admin' role to user manually


## Done
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
- used pre-existing user riciam1
- created new role dynmgr;  added riciam1 as assumeRole
- created new policy AssumeDynMgr; added dynMgr as role
- assigned AssumeDynMgr to riciam1
- got new access ID and secret; added to awscli via "aws configure"

				$ sudo apt-get install python-pip
				$ sudo pip install awscli
				$ which aws
				/usr/local/bin/aws
				$ aws --version
				aws-cli/1.11.81 Python/2.7.6 Linux/3.4.0+ botocore/1.5.44

				$ aws iam list-groups
				$ aws dynamodb list-tables
				$ aws dynamodb scan --table ctest
