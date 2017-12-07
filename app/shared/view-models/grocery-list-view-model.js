var config = require("../../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;

function GroceryListViewModel(items) {
    var viewModel = new ObservableArray(items);

    viewModel.load = function(){
        // console.log('loading data...');
        // return fetch(config.apiUrl + "Groceries", {
        //     headers: {
        //         "Authorization": "Bearer " + config.token
        //     }
        // })
        //     .then(handleErrors)
        //     .then(function(response) {
        //         return response.json();
        //     }).then(function(data) {
        //         data.Result.forEach(function(grocery) {
        //             viewModel.push({
        //                 name: grocery.Name,
        //                 id: grocery.Id
        //             });
        //         });
        //     });
        return new Promise(function(resolve, reject){
            var list = ['hello', 'world', 'data', '贺小雷','赵子龙'];
            setTimeout(function(){
                list.forEach(function(item){
                    viewModel.push({
                        name: item
                    });
                });
                resolve();
            }, 5000);
        });
    };

    viewModel.empty = function(){
        while(viewModel.length > 0) {
            viewModel.pop();
        }
    };

    viewModel.add = function (name) {
        viewModel.push({
            name: name
        });
    };

    viewModel.delete = function(index){
        viewModel.splice(index, 1);
    };


    return viewModel;
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

module.exports = GroceryListViewModel;