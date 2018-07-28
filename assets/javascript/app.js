'use strict';

var question = $('#question');
var answers = $('#answers');

var questionArr = [
    {
        question:
            'What was the first console video game that allowed the game to be saved?',
        incorrect1: 'Final Fanstasy',
        correct: 'The Legend of Zelda',
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
        incorrect1: 'Rung-out Monkey',
        incorrect2: 'Random-only Memory',
        incorrect3: 'Really Old Magistrate',
        correct: 'Read-only Memory'
    },
    {
        question:
            'The first person shooter video game Doom was first released in what year?',
        incorrect1: '1995',
        incorrect2: '1989',
        correct: '1993',
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
        incorrect1: 'Dell XPS 13',
        incorrect2: 'Apple Macbook',
        correct: 'The Commodore 64',
        incorrect3: 'Giant, beige Windows 95 Computers'
    },
    {
        question:
            'The Connecticut Leather Company later became what toy company that was popular in the 1980s for its Cabbage Patch Kids and video game consoles?',
        incorrect1: 'Nintendo',
        correct: 'Coleco',
        incorrect2: 'Atari',
        incorrect3: 'Epic'
    },
    {
        question:
            'The first VR gaming console was released in 1995, was panned by critics, and was a huge commercial failure. What was it?',
        incorrect1: 'Atari Lynx',
        incorrect2: 'Philips CD-i',
        incorrect3: 'Sega Saturn',
        correct: 'Virtual Boy'
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
    right: 0,
    wrong: 0,
    questionCounter: 0,
    seconds: 30,
    intervalPID: 0,
    heartCounter: 10,
    startScreen: function () {
        var newBtn = $('<h1>');
        newBtn.addClass('startBtn');
        newBtn.text('Press Here to Start!');
        newBtn.click(function () {
            funcs.quizGen();
            funcs.startTimer();
            funcs.heartBar();
        });
        question.append(newBtn);
    },
    quizGen: function () {

        answers.empty();

        var questionObj = questionArr[funcs.questionCounter];
        question.text(questionObj.question);

        $.each(questionObj, function (key, val) {
            if (key !== 'question') {
                var answ = $('<div>');
                answ.text(val);
                answ.addClass('answer');

                answ.click(function () {
                    if ($(this).attr('data-correct') === 'true') {
                        funcs.answerCorrect();
                    } else {
                        funcs.answerWrong();
                    }
                });

                if (key === 'correct') {
                    answ.attr('data-correct', 'true');
                    answers.append(answ);
                } else {
                    answ.attr('data-correct', 'false');
                    answers.append(answ);
                }
            }
        });
        $('#timer').text(`Time Remaining: ${this.seconds}`);

    },
    startTimer: function () {
        this.intervalPID = setInterval(function () {
            funcs.seconds -= 1;
            $('#timer').text(`Time Remaining: ${funcs.seconds}`);
            if (funcs.seconds === 0) {
                funcs.timeOut();
            }
        }, 1000);
    },
    stopTimer: function () {
        clearInterval(this.intervalPID);
    },
    answerCorrect: function () {
        this.stopTimer();
        this.seconds = 30;
        answers.empty();
        this.gifGen('right');
        question.text('Good job! Get ready for the next question.');
        this.questionCounter += 1;
        this.right += 1;
        if (this.questionCounter === 10) {
            funcs.endScreen();
        } else {
            setTimeout(function() {
                funcs.quizGen();
                funcs.startTimer();
            }, 3000);
        }
    },
    answerWrong: function () {
        var rightAnsw = questionArr[this.questionCounter].correct;
        question.text(`Sorry! The correct answer is ${rightAnsw}`);
        this.stopTimer();
        answers.empty();
        this.gifGen('wrong');
        this.seconds = 30;
        this.wrong += 1;
        this.questionCounter += 1;
        this.heartCounter -= 1;
        this.heartBar();
        if (this.questionCounter === 10) {
            funcs.endScreen();
        } else {
            setTimeout(function() {
                funcs.quizGen();
                funcs.startTimer();
            }, 3000);
        }
    },
    timeOut: function () {
        var rightAnsw = questionArr[this.questionCounter].correct;
        question.text(`Time's up! The correct answer is ${rightAnsw}`);
        this.stopTimer();
        answers.empty();
        this.gifGen('time');
        this.seconds = 30;
        this.wrong += 1;
        this.questionCounter += 1;
        this.heartCounter -= 1;
        this.heartBar();
        if (this.questionCounter === 10) {
            funcs.endScreen();
        } else {
            setTimeout(function() {
                funcs.quizGen();
                funcs.startTimer();
            }, 4850);
        }
    },
    endScreen: function () {
        answers.empty();
        question.empty();
        this.stopTimer();
        this.gifGen();

        var banner = $('<h1>');
        banner.text(`Finished! You got ${this.right} correct and missed ${this.wrong}`);
        question.append(banner);

        var restartBtn = $('<h3>');
        restartBtn.text('Press here to restart!');
        restartBtn.click(function () {
            location.reload();
        });
        answers.append(restartBtn);
    },
    gifGen: function(cond) {
        var newImg = $('<img>');
        switch (cond) {
            case 'right':
                newImg.attr('src', 'assets/images/win.gif');
                break;
            case 'wrong':
                newImg.attr('src', 'assets/images/miss.gif');
                break;
            case 'time':
                newImg.attr('src', 'assets/images/time-up.gif');
                break;
            default:
                newImg.attr('src', 'assets/images/game-over.gif');
        }
        answers.append(newImg);
    },
    heartBar: function() {
        $('#hearts').empty();
        for (var i = 0; i < funcs.heartCounter; i++) {
            var newImg = $('<img>');
            newImg.attr('src', 'assets/images/heart.png');
            $('#hearts').append(newImg);
        }
    }
}

funcs.startScreen();
