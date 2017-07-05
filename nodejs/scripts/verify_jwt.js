var fs = require('fs');
var jwt = require('jsonwebtoken');

if(process.argv.length < 3 ){
  console.error('lack argument(jwt).');
  process.exit(1);
}

var token = process.argv[2];

var cert = fs.readFileSync('../samplekey/public-key.pem');  // get public key
jwt.verify(token, cert, function(err, decoded) {
  if(err) console.log(err);return;
  console.log(decoded) // bar
});
