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
            //console.log(bufferName);
            /*$http.get('/api/sheetMusic/'+bufferName).then(function(song){
                console.log(song);
                return song;
            }).then(handleSuccess,handleError);*/
            return $http.get('/api/sheetMusic/'+bufferName).then(handleSuccess,handleError);
            //var res = request('GET', '/img/'+bufferName);
            //console.log(res.getBody());
            //return contra;
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
