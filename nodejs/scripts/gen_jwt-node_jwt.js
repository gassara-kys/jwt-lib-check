var fs = require('fs');
var jwt_node = require('jwt-node');

// sign with RSA SHA256
var secretKey = fs.readFileSync('../samplekey/private-key.pem');  // get private key
var publicKey = fs.readFileSync('../samplekey/public-key.pem');  // get public key

var sampleJson = {
  foo: 'bar'
}

// create alg=RS256 JWT
var rs256token = new jwt_node.Jwt(sampleJson)
      .setSigningAlgorithm('RS256')
      .setSigningKey(secretKey)
      .compact();

console.log('RS256: \n' + rs256token);

// create alg=HS256 JWT
var hs256token = new jwt_node.Jwt(sampleJson)
      .setSigningAlgorithm('HS256')
      .setSigningKey(publicKey)
      .compact();

console.log('HS256: \n' + hs256token);


// create alg=none JWT
var noneToken = new jwt_node.Jwt(sampleJson)
      .setSigningAlgorithm('none')
      .compact();

console.log('none: \n' + noneToken);
