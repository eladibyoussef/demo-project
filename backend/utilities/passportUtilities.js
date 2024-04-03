// //  we will set the token to be sent in a cookie afer login so I  creted a function that will help to extract the token from the cookie related to every request 
// let  cookieExtractor = function(req) {
//     var token = null;
//     if (req && req.cookies) {
//         token = req.cookies['token'];
//     }
//     console.log(token);
//     return token;
// };

// module.exports = {
//     cookieExtractor
// }

//we dont need this anymore as we are sending the token in the response.
