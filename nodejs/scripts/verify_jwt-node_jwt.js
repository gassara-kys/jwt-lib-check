var fs = require('fs');
var jwt_node = require('jwt-node');



if(process.argv.length < 3 ){
  console.error('lack argument(jwt).');
  process.exit(1);
}

var token = process.argv[2];
var cert = fs.readFileSync('../samplekey/public-key.pem');  // get public key


jwt_node.verify(token,cert,function(err, verifiedJwt){
  if(err) console.log("err"+err);return;
  console.log("verifiedJwt: "+ verifiedJwt) // bar
});

var verifier = new jwt_node.Verifier()
      .setSigningKey(cert)
      .verify(token, function (err, verifiedJwt) {
        if(err) console.log("err"+err);return;
        console.log("verifiedJwt: "+ verifiedJwt);
      });
