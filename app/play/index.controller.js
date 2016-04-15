(function () {
    'use strict';
    angular
        .module('app')
        .controller('Play.IndexController', Controller);
    function Controller(PlayService, UserService) {
        initController();
        var curUser = this;
        function initController(){
            //display music files from database
            PlayService.getAll().then(function (records) {
                var rank = 1;
                UserService.GetCurrent().then(function (user) {
                    curUser = user;
                    for(var record in records){
                        if(records[record].delete == 0){
                            displayRecord(records[record], rank);
                            rank++;
                        }
                    }
                });
            });
        }

        function displayRecord(record, rank){
            var first = document.createElement("TD");
            first.innerHTML = rank;
            var second = document.createElement("TD");
            second.innerHTML = record.name;
            var third = document.createElement("TD");
            third.innerHTML = record.user
            var fourth = document.createElement("TD");
            fourth.innerHTML = record.votes
            var fifth = document.createElement("TD");
            var upvote = createUpvoteButton(record);
            fifth.appendChild(upvote);
            var sixth = document.createElement("TD");
            var play = createPlayButton(record);
            sixth.appendChild(play);
            var seventh = document.createElement("TD");
            var sheetButton = createSheetButton(record);
            seventh.appendChild(sheetButton);
            var delButton = createDeleteButton(record);
            var eighth = document.createElement("TD");
            eighth.appendChild(delButton);
            var row = document.createElement("TR");
            row.id = "row";
            row.appendChild(first);
            row.appendChild(second);
            row.appendChild(third);
            row.appendChild(fourth);
            row.appendChild(fifth);
            row.appendChild(sixth);
            row.appendChild(seventh);
            if(curUser.role == "mod"){
                row.appendChild(eighth);
            }
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

        function createSheetButton(record){
            var sheet = document.createElement("BUTTON");
            sheet.id = "sheetButton";
            sheet.onclick = function() {
                location.href ='./#/sheetMusic?bufferName='+record.name;
            };
            sheet.innerHTML = "Show sheet music";
            return sheet;
        }

        function createUpvoteButton(record){
            var upvote = document.createElement("BUTTON");
            upvote.id = "upvoteButton";
            upvote.onclick = function() {
                upvoteFunc(record);
                 };
            upvote.innerHTML = "UPVOTE";
            return upvote;
            
        }
        function createPlayButton(record){
            var play = document.createElement("BUTTON");
            play.id = "playButton";
            play.onclick = function() {
                createAudioTag(record);
                 };
            play.innerHTML = "PLAY";
            return play;
            
        }
        function createAudioTag(record){
            var audio = document.createElement("AUDIO");
            audio.controls = true;
            var source = document.createElement("SOURCE");
            source.src = "http://localhost:3000/img/Night.mp3";
            source.type = "audio/mpeg"
            audio.appendChild(source);
            var row = document.getElementById("row");
            row.appendChild(audio);
        }


        function upvoteFunc(record){
            PlayService.upvote(record);
        }

        // function sheetFunc(record){
        //     // PlayService.getBuffer(record.name);

        // }
    }
})();