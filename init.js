const fs = require('fs')

fs.copyFileSync('.env.sample', '.env')
fs.copyFileSync('.env.sample', 'packages/server/.env')
