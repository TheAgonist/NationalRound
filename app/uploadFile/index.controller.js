(function () {
    'use strict';
    angular
        .module('app')
        .controller('Upload.IndexController', Controller);
    function Controller($window, UploadService, UserService) {
        initController();
        function initController(){
            UserService.GetCurrent().then(function (user) {
                UploadService.getAll(user.name).then(function (records) {
                for(var record in records){
                    displayRecord(records[record]);
                }
            }); 
            });
        }

        function displayRecord(record){
            var first = document.createElement("TD");
            first.innerHTML = record.name;
            var second = document.createElement("TD");
            second.innerHTML = record.votes
            var checkbox = createCheckBox(record);
            var third = document.createElement("TD");
            third.appendChild(checkbox);
            var row = document.createElement("TR");
            row.id = "row";
            row.appendChild(first);
            row.appendChild(second);
            row.appendChild(third);
            var table = document.getElementById("listRecords");
            table.appendChild(row);
    	}
    	function createCheckBox(record){
    		var checkbox = document.createElement('input');
			checkbox.type = "checkbox";
			checkbox.id = "checkbox";
			checkbox.onclick = function OnChangeCheckbox (){
				updateShow(record);
			}
			checkbox.checked = false;
			if(record.show == true){
				checkbox.checked = true;
			}	
			return checkbox;
    	}

    	function updateShow(record){
    		UploadService.changeShowStatus(record);
    	}
	}
})();
