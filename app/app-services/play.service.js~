(function () {
    'use strict';

    angular
        .module('app')
        .factory('PlayService', Service);

    function Service($http, $q) {
        var service = {};
        service.getAll = getAll;
        service.upvote = upvote;
        return service;

        function getAll() {
            return $http.get('/api/play/all').then(handleSuccess, handleError);
        }

        function upvote(record){
            //console.log(record);
            return $http.put('/api/play/' + record._id,record).then(handleSuccess, handleError);
        }

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
