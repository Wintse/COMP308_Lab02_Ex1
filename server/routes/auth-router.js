//This uses CommonJS module pattern to export a single module function.
//This function takes an express object as argument 

//Load the 'index' controller
// var index = require('../controllers/auth-ctrl');
// //
// //handle routing for get and post request
// module.exports = function (app) {
//     //handle a get request made to root path
//     app.get('/', index.render); //go to http://localhost:3000/

//     //authenticate user
//     app.post('/signin', index.authenticate);
//     //
//     //app.get('/signout', index.signout);
//     app.get('/read-cookie', index.isSignedIn);

// };

const express = require('express')

const AuthCtrl = require('../controllers/auth-ctrl')

const router = express.Router()
console.log("auth-router read-cookie")
router.post('/signin', AuthCtrl.authenticate)
router.get('/read-cookie', AuthCtrl.isSignedIn)


module.exports = router


