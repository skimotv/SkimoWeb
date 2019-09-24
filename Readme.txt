rm -rf node_modules/ package-lock.json
npm install ajv@^6.9.1
npm install --no-audit
cd functions
rm -rf node_modules/ package-lock.json
npm install --no-audit
cd..
firebase login
firebase  use --add
firebase setup:web --json > ./src/firebase-config.json
npm run serve
