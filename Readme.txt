Install node
npm install -g firebase-tools
rm -rf node_modules/ package-lock.json
npm install ajv@^6.9.1
sudo npm install materialize-css@next
npm install --no-audit
cd functions
rm -rf node_modules/ package-lock.json
npm install --no-audit
cd..
firebase login
firebase  use --add
firebase setup:web --json > ./src/firebase-config.json
npm run serve
Go to the firebase console, authentication and signin method and add the IP address of the domain
