var frameModule = require("ui/frame");
var ObservableModule = require('data/observable');
var fetchModule = require('fetch');
var config = require('../../shared/config');
var dialogsModule = require('ui/dialogs');

var page;
var email;

var vm = new ObservableModule.fromObject({
    email: 'hxl@126.com',
    password: '111'
});


exports.signIn = function(){
    var email = page.getViewById('email');
    console.log(email.text);
    fetchModule.fetch(config.apiUrl + "oauth/token", {
        method: "POST",
        body: JSON.stringify({
            username: vm.get("email"),
            password: vm.get("password"),
            grant_type: "password"
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(handleErrors)
        .then(function(res){
            dialogsModule.alert({
                message: "登录成功！",
                okButtonText: "好的"
            });
            return res.json();
        })
        .then(function(data){
            console.dir(data);
            config.token = data.Result.access_token;
            frameModule.topmost().navigate("views/list/list")
        })
};
exports.signUp = function(){
    var topmost = frameModule.topmost();
    topmost.navigate("views/register/register");
};

function handleErrors(res){
    if(!res.ok) {
        dialogsModule.alert({
            message: "Unfortunately we could not find your account.",
            okButtonText: "好的"
        });
        return Promise.reject();
    }
    return res;

}

exports.loaded = function(args){
    page = args.object;
    page.bindingContext = vm;
};