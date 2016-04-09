(function () {
    'use strict';

    angular
        .module('app')
        .factory('GeneratorService', Service);
         //var spawn = require('child_process');
    function Service($http, $q) {
        var service = {};
        service.generate = generate;
        return service;
           // $http.get('/api/sheetMusic/'+b

        function generate(req, res) {
            console.log("maaaaaa");
            $http.post('/api/generator/generate').then(handleSuccess,handleError);
             console.log("maaaaaa");
        }

        function handleSuccess(res){
            console.log(res.data);
            return res.data;
        }
        function handleError(res){
            console.log('muuuuu2222u');
            return $q.reject(res.data);
        }
    }
})();
