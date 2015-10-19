// 11_TicTacToe
// JavaScript & jQuery


var p1 = [],
    p2 = [],
    turn = "X",
    winner = "",
    score = {
        X: 0,
        O: 0    
    };


$(function() {
    $('.grid').on('click', '.square', function() {
        var current = $(this).html();
        
        if (turn === "X" && !current && !winner) {
            $(this).html("X");
            p1.push($(this).attr('id'));
            checkForWin(p1);
            checkForDraw(p1);
            turn = "O";
        } else if (turn === "O" && !current && !winner) {
            $(this).html("O");
            p2.push($(this).attr('id'));
            checkForWin(p2);
            checkForDraw(p2);
            turn = "X";
        }
    });
});


function checkForWin(player) {
    for (var i = 0; i < player.length; i++) {
        if (player[i] === "bl") {
            for (var j = 0; j < player.length; j++) {
                checkCondition(player, j, "ml", "tl");
                checkCondition(player, j, "mm", "tr");
                checkCondition(player, j, "bm", "br");
            }
        }
        if (player[i] === "mm") {
            for (var j = 0; j < player.length; j++) {
                checkCondition(player, j, "bm", "tm");
                checkCondition(player, j, "br", "tl");
                checkCondition(player, j, "mr", "ml");
            }
        }
        if (player[i] === "tr") {
            for (var j = 0; j < player.length; j++) {
                checkCondition(player, j, "tm", "tl");
                checkCondition(player, j, "mr", "br");
            }
        }
    }
}


function checkCondition(player, j, square2, square3) {
    if (player[j] === square2) {
        for (var k = 0; k < player.length; k++) {
            if (player[k] === square3) {
                winner = turn;
                updateScore();
                resetGame();
            }
        }
    }
}


function checkForDraw(player) {
    if (player.length === 5 && !winner) {
        winner = "draw";
        resetGame();
    }
}


function updateScore() {
    score[winner] += 1;
    $('.' + winner + '-score').empty().html(score[winner]);
}


function resetGame() {
    setTimeout( function() {
        if (winner === "draw") {
            $('.result').show().addClass('draw').html("Draw");
        } else {
            $('.result').show().addClass('win').html(winner + " wins!");
        }
    }, 1);

    $('.result').on('click', function() {
        p1 = [];
        p2 = [];
        turn = "X";
        winner = "";
        $('.square').empty();
        $('.result').hide().removeClass('draw win');
    });
}