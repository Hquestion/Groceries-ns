var frameModule = require("ui/frame");

exports.loaded = function(){

};
exports.signIn = function(){
    alert('login');
};
exports.signUp = function(){
    var topmost = frameModule.topmost();
    topmost.navigate("views/register/register");
};