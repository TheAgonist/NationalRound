(function () {
    'use strict';
    angular
        .module('app')
        .controller('Upload.IndexController', ['$scope', '$q', 'UploadService', function ($scope, $q, UploadService) {
    $scope.fileInputContent = "";
    $scope.onFileUpload = function (element) {
        $scope.$apply(function (scope) {
            console.log(scope);
            var file = element.files[0];
            UploadService.upload(file).then(function (fileInputContent) {
                $scope.fileInputContent = fileInputContent;
            });
        });
    };
}]);
})();