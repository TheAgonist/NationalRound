(function () {
    'use strict';

    angular
        .module('app')
        .factory('PlayService', Service);

    function Service($http, $q) {
        var service = {};
        service.getAll = getAll;
        service.getAllForUser = getAllForUser;
    	service.getBuffer = getBuffer;        
    	service.upvote = upvote;
        service.deleteRecord = del;
        service.changeShowStatus = changeShowStatus;
        service.upload = upload;
        return service;

        function getAll() {
            return $http.get('/api/play/all').then(handleSuccess, handleError);
        }
        function getAllForUser(userName){
            return $http.get('/api/play/'+userName).then(handleSuccess, handleError);
        }

	    function getBuffer(bufferName){
            $http.get('/img/'+bufferName).then(handleSuccess,handleError);
        }
        
        function changeShowStatus(record){
            return $http.put('/api/upload/changeShowStatus',record).then(handleSuccess, handleError);
        }
        
        function upvote(record){
            //console.log(record);
            return $http.put('/api/play/' + record._id,record).then(handleSuccess, handleError);
        }

        function upload(record){
            return $http.post('/api/upload/post',record).then(handleSuccess, handleError);
        }

        function del(record){
            console.log(record);
            return $http.put('/api/play/delete',record).then(handleSuccess,handleError);
        }

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
