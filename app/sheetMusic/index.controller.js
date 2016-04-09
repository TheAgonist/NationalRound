(function () {
    'use strict';
    angular
        .module('app')
        .controller('sheetMusic.IndexController', Controller);
    function Controller(sheetMusicService, $scope) {
        initController();
        function initController(){
          console.log('hi');

          var songs = sheetMusicService.getBuffer('f.mid').then(function(response){
          //fromString(response.data);
          // var arrayBuffer = new ArrayBuffer(response.data.length, 'base64'); // Start transforming Buffer to ArrayBuffer
          // var views = new Uint8Array(toArrayBuffer(response.data));
          // //console.log(decode(response.data));
          // for(var i = 0; i < response.data.length; ++i) {
          //     //console.log("ff")
          //     views[i] = response[i];
          // }

          //   //console.log(Object.prototype.toString.call(arrayBuffer));
             //console.log(response.data);
            //readMidi(response.data);




    });
  }
          function toArrayBuffer(buffer) {
            var ab = new ArrayBuffer(buffer.length);
            var view = new Uint8Array(ab);
            var i;

            for (i = 0; i < buffer.length; ++i) {
              view[i] = buffer[i];
            }
            return ab;
          }
          function readMidi(arrayBuffer){
            

            // Creating the MIDIFile instance
            var midiFile = new MIDIFile(arrayBuffer);

            // Reading headers
            midiFile.header.getFormat(); // 0, 1 or 2
            midiFile.header.getTracksCount(); // n
            // Time division
            if(midiFile.header.getTimeDivision() === MIDIFileHeader.TICKS_PER_BEAT) {
                midiFile.header.getTicksPerBit();
            } else {
                midiFile.header.getSMPTEFrames();
                midiFile.header.getTicksPerFrame();
            }

            // MIDI events retriever
            var events = midiFile.getMidiEvents();
            events[0].subtype; // type of [MIDI event](https://github.com/nfroidure/MIDIFile/blob/master/src/MIDIFile.js#L34)
            events[0].playTime; // time in ms at wich the event must be played
            events[0].param1; // first parameter
            events[0].param2; // second one

            // Lyrics retriever
            var lyrics = midiFile.getLyrics();
            lyrics[0].playTime; // Time at wich the text must be displayed
            lyrics[0].text; // The text content to be displayed

            // Reading whole track events and filtering them yourself
            var trackEventsChunk = midiFile.getTrackEvents(0);
            var events = MIDIEvents.createParser(trackEventsChunk);

            var event;
            while(event=events.next()) {
                // Printing meta events containing text only
                if(event.type === MIDIFile.EVENT_META && event.text) {
                    console.log('Text meta: '+event.text);
                }
            }

          }

  }
})();