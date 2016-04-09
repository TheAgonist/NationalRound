(function () {
    'use strict';

    angular
        .module('app')
        .factory('PlayService', Service);

    function Service($http, $q) {
        var service = {};
        service.getAll = getAll;
	service.getBuffer = getBuffer;        
	service.upvote = upvote;
        return service;

        function getAll() {
            return $http.get('/api/play/all').then(handleSuccess, handleError);
        }

	function getBuffer(bufferName){
            console.log(bufferName);
            /*$http.get('/api/sheetMusic/'+bufferName).then(handleSuccess,handleError).then(function(song){
                //console.log(song);
                return song;
            });*/
            $http.get('/img/'+bufferName).then(handleSuccess,handleError);
            //console.log(contra);
            //return contra;
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
