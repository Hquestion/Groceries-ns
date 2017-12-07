var ObservableModule = require('data/observable');
var ObservableArray = require('data/observable-array').ObservableArray;
var dialogsModule = require('ui/dialogs');
var socialShare = require("nativescript-social-share");

var GroceryListViewModel = require("../../shared/view-models/grocery-list-view-model");
var groceryList = new GroceryListViewModel([]);

var page;
var vm = new ObservableModule.fromObject({
    groceryList: groceryList,
    grocery: '',
    isLoading: false
});

exports.loaded = function(args){
    page = args.object;
    page.bindingContext = vm;
    var ListView = page.getViewById('groceryList');

    vm.isLoading = true;
    groceryList.empty();
    groceryList.load().then(function(){
        vm.isLoading = false;
        ListView.animate({
            opacity: 1,
            duration: 1000
        });
    });

};

exports.add = function(){
    if(!vm.grocery.trim()) {
        dialogsModule.alert({
            message: "请输入名称！",
            okButtonText: "好的"
        });
        return;
    }
    groceryList.add(vm.grocery);
    vm.grocery = '';
};

exports.share = function() {
    var list = [];
    for (var i = 0, size = groceryList.length; i < size ; i++) {
        list.push(groceryList.getItem(i).name);
    }
    var listString = list.join(", ").trim();
    socialShare.shareText(listString);
};

exports.delete = function(args) {
    var item = args.view.bindingContext;
    console.dir(item);
    var index = groceryList.indexOf(item);
    groceryList.delete(index);
};