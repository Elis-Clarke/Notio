//Code by Elis Clarke

let allNotes = [
	["notio_media/grphx/1-C.jpg",  "notio_media/sound/1-C.wav",  "c"],
	["notio_media/grphx/2-D.jpg",  "notio_media/sound/2-D.wav",  "d"],
	["notio_media/grphx/3-E.jpg",  "notio_media/sound/3-E.wav",  "e"],
	["notio_media/grphx/4-F.jpg",  "notio_media/sound/4-F.wav",  "f"],
	["notio_media/grphx/5-G.jpg",  "notio_media/sound/5-G.wav",  "g"],
	["notio_media/grphx/6-A.jpg",  "notio_media/sound/6-A.wav",  "a"],
	["notio_media/grphx/7-B.jpg",  "notio_media/sound/7-B.wav",  "b"],
	["notio_media/grphx/8-C.jpg",  "notio_media/sound/8-C.wav",  "c"],
	["notio_media/grphx/9-D.jpg",  "notio_media/sound/9-D.wav",  "d"],
	["notio_media/grphx/10-E.jpg", "notio_media/sound/10-E.wav", "e"],
	["notio_media/grphx/11-F.jpg", "notio_media/sound/11-F.wav", "f"],
	["notio_media/grphx/12-G.jpg", "notio_media/sound/12-G.wav", "g"],
	["notio_media/grphx/13-A.jpg", "notio_media/sound/13-A.wav", "a"],
	["notio_media/grphx/14-B.jpg", "notio_media/sound/14-B.wav", "b"],
	["notio_media/grphx/15-C.jpg", "notio_media/sound/15-C.wav", "c"],
	["notio_media/grphx/16-B.jpg", "notio_media/sound/16-B.wav", "b"],
	["notio_media/grphx/17-A.jpg", "notio_media/sound/17-A.wav", "a"],
	["notio_media/grphx/18-G.jpg", "notio_media/sound/18-G.wav", "g"],
	["notio_media/grphx/19-F.jpg", "notio_media/sound/19-F.wav", "f"],
	["notio_media/grphx/20-E.jpg", "notio_media/sound/20-E.wav", "e"]
];

let level = 0;
let rightInRow = 0;
let correctStreak =0;
let wrongInRow = 0;
let incorrectStreak =0;
let noteSelected = 'r';
let previousNote = 's';
let activeNote = 't';

function generateNote() {
	previousNote = activeNote;
	while (previousNote === activeNote){
		if (level-3<=0) {
			randomElement = allNotes[Math.floor(Math.random()*(level+3))];
		} else if (level==18) {
			randomElement = allNotes[Math.floor(Math.random()*(19))];
		} else {
			randomElement = allNotes[(level-3)+Math.floor(Math.random() * 6)];
		}
		activeNote = randomElement[2];
	}
	document.getElementById("myImage").src = randomElement[0];
	document.getElementById("p2").innerHTML = `Current level = ${String(level+1)} / 19`;
};

function specialGen() {
	previousNote = activeNote;
	randomElement = allNotes[level+2];
	activeNote = randomElement[2];
	document.getElementById("myImage").src = randomElement[0];
	document.getElementById("p2").innerHTML = `Current level = ${String(level+1)} / 19`;
}

function firstGenerateNote() {
	randomElement = allNotes[0];
	activeNote = randomElement[2];
	previousNote = activeNote;
	document.getElementById("prevImage").src = randomElement[0];
	document.getElementById("myImage").src = randomElement[0];
	document.getElementById("p2").innerHTML = `Current level = ${String(level+1)} / 19`;
}

function markAnswer() {
	if (String(noteSelected) == String(activeNote)) {
		mark = "right"
	} else {
		mark = "wrong"
	}
	setUpNext()
}

function setUpNext() {
	document.getElementById("prevImage").src = randomElement[0];
	if (mark == "right") {
		document.getElementById("prevCaption").innerHTML = "Correct";
		correctStreak+=1
		incorrectStreak=0
		
		document.getElementById("prevImage").style.border = "10px solid green";
		document.getElementById("p3").innerHTML = `Your streak is ${String(correctStreak)} right in a row`;
		document.getElementById("prevAudio").src = randomElement[1];
		
		rightInRow += 1
		wrongInRow = 0
		if (rightInRow == 5) {
			rightInRow = 0
			if (level < 18){
				level += 1
			}
			if (level <= 17){
				specialGen()
			} else {
				generateNote()
			}
		} else {
			generateNote()
		}
	} else if (mark == "wrong") {
		if (randomElement[2]=="a" || randomElement[2]=="e" || randomElement[2]=="f"){
			document.getElementById("prevCaption").innerHTML = `Incorrect that was an ${String(randomElement[2]).toUpperCase()}`;
		}
		else {
			document.getElementById("prevCaption").innerHTML = `Incorrect that was a ${String(randomElement[2]).toUpperCase()}`;
		}
		incorrectStreak+=1
		correctStreak=0
		
		document.getElementById("prevImage").style.border = "10px solid red";
		document.getElementById("p3").innerHTML = `Your streak is ${String(incorrectStreak)} wrong in a row`;
		document.getElementById("prevAudio").src = "notio_media/sound/BUZZER.WAV";
		
		wrongInRow += 1
		rightInRow = 0
		
		if (wrongInRow == 5) {
			wrongInRow = 0
			if (level > 0) {
				level -= 1
			}
		}
		generateNote()
	} else {
		return "nothing"
		generateNote()
	}
}

firstGenerateNote()