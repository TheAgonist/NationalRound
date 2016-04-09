(function () {
    'use strict';

    angular
        .module('app')
        .factory('UploadService', Service);

    function Service($http, $q) {
        var service = {};
        service.upload = upload;
        service.getAll = getAll;
        service.changeShowStatus = change;
        return service;

        function upload(record){
            return $http.post('/api/upload/post',record).then(handleSuccess, handleError);
        }

        function getAll(userName){
            return $http.get('/api/upload/'+userName).then(handleSuccess, handleError);
        }

        function change(record){
            return $http.put('/api/upload/'+record._id,record).then(handleSuccess, handleError);
        }

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
