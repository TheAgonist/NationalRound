(function () {
    'use strict';

    angular
        .module('app')
        .factory('sheetMusicService', Service);

    function Service($http, $q) {
        var service = {};
        service.getBuffer = getBuffer;
        service.song = null;
        return service;
        //var request = require('sync-request');

        function getBuffer(bufferName){
            console.log(bufferName);
            return $http.get('/api/sheetMusic/'+bufferName).then(handleSuccess,handleError);
        }

        function handleSuccess(res) {  
            console.log(res);
            return res;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }
})();
