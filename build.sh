#!/bin/bash

D=dist
mkdir -p ${D}

cp index.html main.js ${D}

cat > ${D}/env.js <<END_OF_HERE

// this does not keep the strings secret
// but it does keep them out of github

const VLCB = {
  TABLE_NAME: '$VLCB_TABLE_NAME',
  AWS_ID: '$VLCB_AWS_ID',
  AWS_SECRET: '$VLCB_AWS_SECRET'
}

END_OF_HERE

echo ....done with build.sh - $(pwd) : $(ls -l dist/env.js)
