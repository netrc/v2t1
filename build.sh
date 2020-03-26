#!/bin/bash

cat > .env.js <<END_OF_HERE

// this does not keep the strings secret
// but it does keep them out of github

const VLCB = {
  TABLE_NAME: '$VLCB_TABLENAME',
  AWS_ID: '$VLCB_AWS_ID',
  AWS_SECRET: '$VLCB_AWS_SECRET'
}

END_OF_HERE
