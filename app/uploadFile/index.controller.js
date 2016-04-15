(function () {
    'use strict';
    angular
        .module('app')
        .controller('Upload.IndexController', Controller);
    function Controller($window, PlayService, UserService) {
        initController();
        function initController(){
            UserService.GetCurrent().then(function (user) {
                //console.log(user);
                PlayService.getAllForUser(user.firstName).then(function (records) {
                    for(var record in records){
                        if(records[record].delete == 0){
                            displayRecord(records[record]);
                        }
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
            var fourth = document.createElement("TD");
            var deleteButton = createDeleteButton(record);
            fourth.appendChild(deleteButton);
            var row = document.createElement("TR");
            row.id = "row";
            row.appendChild(first);
            row.appendChild(second);
            row.appendChild(third);
            row.appendChild(fourth);
            var table = document.getElementById("listRecords");
            table.appendChild(row);
    	}
    	function createDeleteButton(record){
            var del = document.createElement("BUTTON");
            del.id = "deleteButton";
            del.onclick = function(){
                PlayService.deleteRecord(record);
            }
            del.innerHTML = "delete";
            return del;
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
    		PlayService.changeShowStatus(record);
    	}
	}
})();
