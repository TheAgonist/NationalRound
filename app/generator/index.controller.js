(function () {
    'use strict';
    angular
        .module('app')
        .controller('Generator.IndexController', Controller);
    function Controller(GeneratorService) {
        initController();
        function initController(){
          // var oficialnoIm = GeneratorService.generate().then(function (name){

          // });
          
          var div = document.getElementById('showGenerated');
          div.appendChild(createSubmit());
        }
        function createSubmit(){
            var submit = document.createElement("BUTTON");
            submit.innerHTML = "generate";
            submit.id = "generateButton";
            submit.onclick = function(){
              submitFunc();
            }
            return submit;
          }
          function submitFunc(){
           var varum = GeneratorService.generate().then(function (name) {
                console.log(name);
            });
           console.log(varum);
          }
    }
})();
