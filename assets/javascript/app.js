'use strict';

var question = $('#question');
var answers = $('#answers');
var questionCounter = 0;

var questionArr = [
  {
    question:
      'What was the first console video game that allowed the game to be saved?',
    correct: 'The Legend of Zelda',
    incorrect1: 'Final Fanstasy',
    incorrect2: 'Zombies Ate My Neighbors',
    incorrect3: 'Super Mario Bros.'
  },
  {
    question: 'Regarding data storage, what does the acronym SSD stand for?',
    correct: 'Solid State Drive',
    incorrect1: 'Seriously Salty Doritos',
    incorrect2: 'Seared Salmon Donburi',
    incorrect3: 'Something Something D'
  },
  {
    question:
      'When talking about computer memory, what does the acronym ROM stand for?',
    correct: 'Read-only Memory',
    incorrect1: 'Rung-out Monkey',
    incorrect2: 'Random-only Memory',
    incorrect3: 'Really Old Magistrate'
  },
  {
    question:
      'The first person shooter video game Doom was first released in what year?',
    correct: '1993',
    incorrect1: '1995',
    incorrect2: '1989',
    incorrect3: '1990'
  },
  {
    question: 'In what year was the first Apple computer released?',
    correct: '1976',
    incorrect1: '1985',
    incorrect2: '1990',
    incorrect3: '2001'
  },
  {
    question:
      'With over 17 million units produced, what was the highest selling single model of personal computer ever?',
    correct: 'The Commodore 64',
    incorrect1: 'Dell XPS 13',
    incorrect2: 'Apple Macbook',
    incorrect3: 'Giant, beige Windows 95 Computers'
  },
  {
    question:
      'The Connecticut Leather Company later became what toy company that was popular in the 1980s for its Cabbage Patch Kids and video game consoles?',
    correct: 'Coleco',
    incorrect1: 'Nintendo',
    incorrect2: 'Atari',
    incorrect3: 'Epic'
  },
  {
    question:
      'The first VR gaming console was released in 1995, was panned by critics, and was a huge commercial failure. What was it?',
    correct: 'Virtual Boy',
    incorrect1: 'Atari Lynx',
    incorrect2: 'Philips CD-i',
    incorrect3: 'Sega Saturn'
  },
  {
    question:
      'In 1975 an engineer created the first electronic camera while working for what company?',
    correct: 'Kodak',
    incorrect1: 'Canon',
    incorrect2: 'Philips',
    incorrect3: 'Nikon'
  },
  {
    question:
      'What corporate chat software made by Microsoft is worse than IRC in every way and generally regarded as a mistake?',
    correct: 'Skype for Business',
    incorrect1: 'Click Skype for Business',
    incorrect2: 'Click Skype for Business',
    incorrect3: 'Click Skype for Business'
  }
];

var funcs = {
  questionCounter: 0,
  seconds: 25,
  intervalPID: 0,
  startScreen: function() {
    
  },
  quizGen: function() {

    var questionObj = questionArr[questionCounter];
    question.text(questionObj.question);
    
    $.each(questionObj, function(key, val) {
      if (key !== 'question') {
        if (key === 'correct') {
          var goodAnsw = $('<div>');
          goodAnsw.text(val);
          goodAnsw.addClass('answer');
          goodAnsw.attr('data-correct', 'true');
          answers.append(goodAnsw);
        } else {
          var badAnsw = $('<div>');
          badAnsw.text(val);
          badAnsw.addClass('answer');
          badAnsw.attr('data-correct', 'false');
          answers.append(badAnsw);
        }
      }
    });

    $('#timer').text(`Time Remaining: ${this.seconds}`);
    
  },
  startTimer: function() {
    this.intervalPID = setInterval(function() {
      funcs.seconds -= 1;
      $('#timer').text(`Time Remaining: ${funcs.seconds}`);
    }, 1000);
  },
  stopTimer: function() {
    clearInterval(this.intervalPID);
  }
}

funcs.quizGen();
funcs.startTimer();


