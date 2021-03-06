var crypto = require('crypto');
var ecc = require('../lib/ecc');
var ECKey = ecc.ECKey;
var ECCurves = ecc.ECCurves;

var curve = ECCurves.secp128r1; // This is just an the OpenSSL int NID_secp128r1

// Regenerate Alice's key from a private key.
var AlicePrivateKey = new Buffer('7ab8dca0b1bea71136250271d60d8446', 'hex');
var AliceKey = new ECKey(curve, AlicePrivateKey);

// If we wanted to generate a new key for alice we would do this.
//var AliceKey = new ECKey(curve);

// Make a ECKey with just alice's public
var AlicePublicKey = new ECKey(curve, AliceKey.PublicKey, true); // The third parameter tells ECKey to make a Public only ECKey.
if (AlicePublicKey.HasPrivateKey) throw ('AlicePublicKey should not have a private key');

// Hash something so we can have a digest to sign.
var digest = crypto.createHash('sha256').update('Hello World').digest('hex');

// Sign it with Alice's key
var signature = AliceKey.sign(new Buffer(digest, 'hex')).toString('hex');
console.log('Sig:',signature);

// Verify it with AlicePublicKey
var valid = AlicePublicKey.verifySignature(new Buffer(digest, 'hex'), new Buffer(signature, 'hex'));
console.log('Signature is', valid ? 'valid' : 'invalid');
