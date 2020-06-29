//text progression related
var stopped = false;
var firstChunk = true;
var currTextChunk = -1;
var newWrongReadIndexes;
var texts = new Array(2);
var textindex;
var foundWrongIndexes;
var unfoundErrorCount;

//audio related
var audioplayer = new Audio("Audio/Correct/sample.wav");
//recording related
var recorder;
var gumStream;
var input;
var AudioContext;
var audioContext;
var aContainer;
var recordedAudio;

/*############################################################ Base Logic ############################################################*/
jQuery(document).ready(function() {
    CreateTestData();
    document.getElementById("taxi-tile").onclick = function() { LbtPrepareReading(0); };
    document.getElementById("test-tile").onclick = function() { LbtPrepareReading(1); };

});

function LbtPrepareReading(textindex) {
    document.getElementById('textselect-container').classList.add('d-none');
    document.getElementById('game-container').classList.remove('d-none');
    this.textindex = textindex;
    newWrongReadIndexes = new Array(texts[textindex].wrongReadIndexes);

    foundWrongIndexes = new Array(texts[textindex].textChunks.length);
    for (var i = 0; i < foundWrongIndexes.length; i++) {
        foundWrongIndexes[i] = false;
    }

    document.getElementById('textName').innerHTML = texts[textindex].textName;
    document.getElementById('StopBtn').addEventListener("click", function() { UserPause(textindex); });
    FillChunkArea();
    LbtProcess();
}

/*############################################################ Chunk Progression & Audioplayback Logic ############################################################*/

function LbtProcess() {
    //Check if end of text was reached and stop+reset if it was
    if (currTextChunk >= texts[textindex].textChunks.length - 1) {
        if (audioplayer.ended) {
            console.log("[Playback]: text finished...highlighting unfound errors...saving wrong played chunks...returning");
            HightlightUnfoundErrors();
            texts[textindex].wrongReadIndexes = newWrongReadIndexes;
            firstChunk = true;
            currTextChunk = -1;
            return;
        } else {
            setTimeout(function() {
                console.log("[Playback]: LAST CHUNK is playing or paused...waiting");
                LbtProcess();

            }, 250);
            return;

        }
    }
    setTimeout(function() {
        //Check if AudioPlayer is currently playing or stopped
        if (!stopped && audioplayer.ended || firstChunk) //If this is the first Text Chunk, audioplayer.ended can't be used because it likely didn't play yet.
        {
            //play next file if it isn't currently playing
            currTextChunk++; //count up to next Chunk
            HightlightCurrentChunk(); //Highlight current Textchunk
            PlayRightWrongAtRandom(textindex); //Play current chunk correct or wrong
            firstChunk = false; //first is permanently set to false after the first chunk
            LbtProcess();
        } else {
            //player is currently playing, try again in 1 second
            console.log("[Playback]: player is playing or paused...waiting");
            if (recorder != null) {
                if (recorder.recording) {
                    aContainer.innerHTML = "AUFNAHME LÄUFT!";
                }
            }
            LbtProcess();
        }
        return;

    }, 250);
}

function PlayRightWrongAtRandom() {
    //Check if current text chunk was already played wrong
    if (texts[textindex].wrongReadIndexes[currTextChunk] !== true) {
        //if it wasnt, there is a chance to play it wrong now
        if (Math.floor((Math.random() * 10) + 1) > 5) {
            console.log("[playerRNG]: Correct file is being played");
            //play correct file
            audioplayer = new Audio(texts[textindex].correctAudioFiles[currTextChunk]);
            audioplayer.play();
        } else {
            console.log("[playerRNG]: Wrong file is being played");
            newWrongReadIndexes[currTextChunk] = true;
            //Play wrong file
            audioplayer = new Audio(texts[textindex].wrongAudioFiles[currTextChunk]);
            audioplayer.play();
        }
    }
    //file was already played wrong so it can't be played wrong again
    else {
        //play correct file
        console.log("[playerRNG]: File already used, correct file is being played");
        audioplayer = new Audio(texts[textindex].correctAudioFiles[currTextChunk]);
        audioplayer.play();
    }
}

function HightlightCurrentChunk() {
    if (!firstChunk) {
        document.getElementById('chunk-' + (currTextChunk - 1)).classList.remove('bg-warning');

        if (!document.getElementById('chunk-' + (currTextChunk - 1)).classList.contains('bg-success')) {
            document.getElementById('chunk-' + (currTextChunk - 1)).classList.add('bg-light');
        }
    }
    document.getElementById('chunk-' + currTextChunk).classList.remove('bg-light');
    document.getElementById('chunk-' + currTextChunk).classList.add('bg-warning');
}

function FillChunkArea() {
    var container = document.getElementById("hoerspiel-content");

    //Remove all old textchunks
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
    //Create new textchunks and append them to the container
    for (var i = 0; i < texts[textindex].textChunks.length; i++) {
        var chunk = document.createElement('div');
        chunk.setAttribute('class', 'snippet container-fluid mt-1 mr-5 p-3 shadow rounded row bg-light');
        chunk.setAttribute('id', 'chunk-' + i);

        var leftCol = document.createElement('div');
        leftCol.setAttribute('class', 'col-9 m-auto');
        leftCol.innerHTML += texts[textindex].textChunks[i];

        var rightCol = document.createElement('div');
        rightCol.setAttribute('class', 'col-3');
        rightCol.setAttribute('id', 'chunkPlayerContainer-' + i)

        chunk.appendChild(leftCol);
        chunk.appendChild(rightCol);
        container.appendChild(chunk);
    }
}

function ResumeAudioPlayer() {
    audioplayer.play();
    stopped = false;
}

function HightlightUnfoundErrors() {
    unfoundErrorCount = 0;
    //iterate through found errors array
    for (var i = 0; i < foundWrongIndexes.length; i++) {
        document.getElementById('chunk-' + i).classList.remove('bg-warning');
        //If User missed the error AND the error is in the new error list AND not in the old error list (which means the Error was already counted)
        if (foundWrongIndexes[i] == false && newWrongReadIndexes[i] == true && texts[textindex].wrongReadIndexes[i] == false) {
            document.getElementById('chunk-' + i).classList.remove('bg-light');
            document.getElementById('chunk-' + i).classList.add('bg-danger');
            AttachChunkAudioPlayer(i);
            unfoundErrorCount++;
        }
    }
    if (unfoundErrorCount == 0) {
        alert("Gratulation, Sie haben alle Fehler gefunden!")
    } else {
        alert("Sie haben " + unfoundErrorCount + " Fehler übersehen, diese werden nun Rot markiert.");
    }
}

function AttachChunkAudioPlayer(chunkIndex) {
    var audioPl = document.createElement('audio');
    audioPl.controls = true;
    audioPl.src = texts[textindex].wrongAudioFiles[chunkIndex];
    document.getElementById(('chunkPlayerContainer-' + chunkIndex)).appendChild(audioPl);
}

/*############################################################ User Action Management ############################################################*/

function UserPause() {
    //check if current chunk is in new wrong played index
    if (newWrongReadIndexes[currTextChunk]) {
        //Check if current chunk is in old wrong played index
        if (texts[textindex].wrongReadIndexes[currTextChunk]) //current chunk was in old list so it was correct, user made an error
        {
            UserError();
        } else //current chunk was played wrong, user recognized that
        {
            jQuery("#aufnahmeModal").modal('show');
            audioplayer.pause();
            stopped = true;
            foundWrongIndexes[currTextChunk] = true;
            document.getElementById('chunk-' + currTextChunk).classList.add('bg-success');
        }
    } else //current file was correct, user made an error
    {
        UserError();
    }
}

function UserError() {
    alert("Aktueller Abschnitt wird korrekt vorgelesen.");
}


function EmptyAudioContainer() {
    aContainer = document.getElementById('audioContainer');
    if (aContainer.firstChild != null) {
        aContainer.removeChild(aContainer.firstChild);
    }
}

/*############################################################ Recording Logic ############################################################*/

/*############################################################ Testdata & Debug ############################################################*/

function CreateTestData() {
    texts[0] = new TextData("Eine Pangram Kurzgeschichte von Tom Candussi", ["Es folgt ein Auszug aus 'Tom Candussi - Franz jagt im komplett verwahrlosten Taxi quer durch Bayern.'", "Franz jagt im komplett verwahrlosten Taxi quer durch Bayern.", "Das ist jetzt zwar unerquicklich, geschieht aber weil er eine untypische, viel mehr paradoxe Erpressung erfüllen muss.", "Denn ein junger, zugleich aber verflixt hochwertiger Schurke, der nebenbei auch Yoga praktiziert, hat Franz ein Ultimatum gestellt.",
        "Franz muss sämtliche sechsundzwanzig Buchstaben des Alphabets finden, die der wahrlich jähzornige Verbrecher quer durchs ganze Land in zylinderförmigen und somit konvexen Behältern versteckt hat.", "Dieser herzlose, manipulative Schurke heißt Q-Jyx, was ein freigewählter Künstlername ist, den man 'Q-Jyx' schreibt.", "Q-Jyx hat das vermutlich wirklich optimale Druckmittel um Franz durch ganz Bayern zu schicken, er entführte nämlich von Franz das Xylophon.",
        "Das machte er -zwar nicht nur, doch auch- quasi aus Spaß, denn er hat es vermutlich ganz einfach in seiner DNA, also in seiner Desoxyribonukleinsäure.", "Aber Ihr müsst wissen, Franz ist begeisterter, jedoch leider auch nur selbsternannter Xylophonvirtuose, was seine komplette Nachbarschaft quält.", "Und der eloquente, zynische Schurke bewohnt das ganz reizvolle Apartment direkt unter Franz, was erklären dürfte, weshalb der jetzt im Taxi sitzt."
    ], ['Audio/Correct/Track0.mp3', 'Audio/Correct/Track1.mp3', 'Audio/Correct/Track2.mp3', 'Audio/Correct/Track3.mp3', 'Audio/Correct/Track4.mp3', 'Audio/Correct/Track5.mp3', 'Audio/Correct/Track6.mp3', 'Audio/Correct/Track7.mp3', 'Audio/Correct/Track8.wav', 'Audio/Correct/Track9.wav'], ['Audio/Wrong/testsound1.wav', 'Audio/Wrong/Track1.wav', 'Audio/Wrong/Track2.wav', 'Audio/Wrong/Track3.wav', 'Audio/Wrong/Track4.wav', 'Audio/Wrong/Track5.wav', 'Audio/Wrong/Track6.wav', 'Audio/Wrong/Track7.wav', 'Audio/Wrong/Track8.wav', 'Audio/Wrong/Track9.wav'], [true, false, false, false, false, false, false, false, false, false], null);
    //[true, true, true, true, true, true, true, true, true, true]
    //[true, false, false, false, false, false, false, false, false, false]

    texts[1] = new TextData("TestText", ["Testtext 1", "Testtext 2", "Testtext 3", "Testtext 4", "Testtext 5", "Testtext 6"], ['Audio/Correct/testsound1.wav', 'Audio/Correct/testsound2.wav', 'Audio/Correct/testsound1.wav', 'Audio/Correct/testsound2.wav', 'Audio/Correct/testsound1.wav', 'Audio/Correct/testsound2.wav'], ['Audio/Wrong/testsound1.wav', 'Audio/Wrong/testsound2.wav', 'Audio/Wrong/testsound1.wav', 'Audio/Wrong/testsound2.wav', 'Audio/Wrong/testsound1.wav', 'Audio/Wrong/testsound2.wav'], [true, false, false, true, true, false], null);

    console.log("Testdaten erzeugt");
}

function GetTextChunksLength(textindex) {
    console.log(texts[textindex].textChunks.length);
}