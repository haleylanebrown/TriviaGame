var triviaQuestions = [{
	question: "What is Lady GaGa's birth name?",
	answerList: ["Stephanie Glenda Germanotta", "Stacey Gabriel Germanotta", "Sara Gabby Germanotta", "Stefani Joanne Angelina Germanotta"],
	answer: 3
},{
	question: "From 'The Fame' album, which song was Lady GaGa's first American single?",
	answerList: ["Money Honey", " Poker Face", "Just Dance", "Love Game"],
	answer: 2
},{
	question: "On which 'MTV' hit show did Lady GaGa make a special guest appearance?",
	answerList: ["Cribs", "Made", " The Hills", "Making The Band 4"],
	answer: 2
},{
	question: "At what age did Lady GaGa begin working with 'Interscope Records'?",
	answerList: ["Twenty", "Twenty-one", "Twelve", "Eighteen"],
	answer: 0
},{
	question: "'I love this record baby, but I can't see straight anymore' are lyrics from which song?",
	answerList: ["Starstruck", "Just Dance", "Paparazzi", "Again Again"],
	answer: 1
},{
	question: "Which of the following is Lady GaGa's catch phrase?",
	answerList: ["Pop Music Will Never Be Low Brow", "Pop Music Is Delicious", "Pop Music Will Never Be The Same", "Lady GaGa's Low Brow"],
	answer: 0
},{
	question: "At which 'American Music Festival' did Lady GaGa perform in August, 2007?",
	answerList: ["Lollapalooza", "Mid-American Music Festival", "Verizon Wireless American Music Festival", "Music Festival 2007"],
	answer: 0
},{
	question: "Which singer/band did Lady GaGa produce songs for?",
	answerList: ["New Kids on the Block", "Rihanna", "Vanessa Hudgens", "Pink"],
	answer: 0
},{
	question: "'We just like to party, like to p-p-party yeah' are lyrics from which song?",
	answerList: ["Dirty Ice Cream", "Beautiful, Dirty, Rich", "Eh Eh", "Rock Show"],
	answer: 1
},{
	question: "'LoveGame intuition, play the cards with Spades to start' come from which song?",
	answerList: ["Brown Eyes", "Poker Face", "Summerboy", "Disco Heaven"],
	answer: 1
}];

var gifArray = ['ladygaga1', 'ladygaga2', 'ladygaga3', 'ladygaga4', 'ladygaga5', 'ladygaga6', 'ladygaga7', 'ladygaga8', 'ladygaga9', 'ladygaga10'];
var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;
var messages = {
	correct: "Correct!",
	incorrect: "Nope.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and will set-up answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect === rightAnswerIndex) && (answered === true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered === true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion === (triviaQuestions.length-1)){
		setTimeout(scoreboard, 4000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 4000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('START OVER?')
}