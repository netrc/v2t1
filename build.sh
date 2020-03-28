#!/bin/bash

D=dist
mkdir -p ${D}

cp index.html main.js ${D}

cat > ${D}/env.js <<END_OF_HERE

// this does not keep the strings secret
// but it does keep them out of github

const VLCB = {
  AWS_ID: '$VLCB_AWS_ID',
  AWS_SECRET: '$VLCB_AWS_SECRET',
  AWS_RW_ID: '$VLCB_RW_AWS_ID',
  AWS_RW_SECRET: '$VLCB_RW_AWS_SECRET',
  TABLE_NAME: '$VLCB_TABLE_NAME'
}

END_OF_HERE

echo doing funcs npm install
(cd netlifyFuncs ; npm install)

echo ....done with build.sh - $(pwd) : $(ls -l dist/env.js)
