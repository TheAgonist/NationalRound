(function () {
    'use strict';
    angular
        .module('app')
        .controller('Play.IndexController', Controller);
    function Controller(PlayService) {
        initController();
        function initController(){
            //display music files from database
            PlayService.getAll().then(function (records) {
                var rank = 1;
                for(var record in records){
                    displayRecord(records[record], rank);
                    rank++;
                }
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
            var button = createUpvoteButton(record);
            fifth.appendChild(button);
            var sixth = document.createElement("TD");
            var button = createPlayButton(record);
            sixth.appendChild(button);
            var seven = document.createElement("TD");
            var button = createSheetButton(record);
            sixth.appendChild(button);
            var row = document.createElement("TR");
            row.id = "row";
            row.appendChild(first);
            row.appendChild(second);
            row.appendChild(third);
            row.appendChild(fourth);
            row.appendChild(fifth);
            row.appendChild(sixth);
            row.appendChild(seven);
            var table = document.getElementById("listRecords");
            table.appendChild(row);
        }

        function createSheetButton(record){
            var sheet = document.createElement("BUTTON");
            sheet.id = "sheetButton";
            sheet.onclick = function() {
                location.href ='./#/sheetMusic?bufferName='+record.name;
            };
            sheet.innerHTML = "Show sheet music";
            //console.log(record);
            return sheet;
        }

        function createUpvoteButton(record){
            var upvote = document.createElement("BUTTON");
            upvote.id = "upvoteButton";
            upvote.onclick = function() {
                upvoteFunc(record);
                 };
            upvote.innerHTML = "UPVOTE";
            //console.log(record);
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
            console.log(source.src);
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