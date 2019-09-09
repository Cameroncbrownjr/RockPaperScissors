$(document).ready(function () {
    // firebase config
    var config = {
        apiKey: "AIzaSyCNavK4Jf2AegFt0oVRPmnAcPRV0-7ebCM",
        authDomain: "coding-class-9291c.firebaseapp.com",
        databaseURL: "https://coding-class-9291c.firebaseio.com",
        projectId: "coding-class-9291c",
        storageBucket: "coding-class-9291c.appspot.com",
        messagingSenderId: "657572293308",
        appId: "1:657572293308:web:fb213e6f6d8a829d"
    };

    firebase.initializeApp(config);
    // firebase config

    var my_database = firebase.database();
    var display = $("#display");

    var player;

    AssignPlayer()

    function AssignPlayer() {
        my_database.ref().once("value", function (snapshot) {
            var sv = snapshot.val();

            if (sv == null) {
                display.html('<p> You Are <strong>Player 1 </strong> </p>')
                $("#player").text('Player 1 ')
                my_database.ref('game').set({ player1: 'null' })
                player = 1;
                game()
            }
            else if (Object.keys(sv.game).length === 1) {
                display.html('<p> You Are <strong>Player 2 </strong> </p>')
                $("#player").text('Player 2 ')
                my_database.ref('game').update({ player2: "null" })
                player = 2;
                game()
            }
            else {
                display.html('<p> Sorry ,Game Is Full </strong> </p>')
            }
        });
    }

    function game() {
        display.append('<button>PLAY</button>')
        $('button').on("click", function () {
            display.html('')
            display.append("<button id ='hand' data='rock' >ROCK</button>")
            display.append("<button id ='hand' data='paper' >PAPER</button>")
            display.append("<button id ='hand' data='scissors'>SCISSORS</button>")
        })
    }

    $(document).on('click', '#hand', function () {
        var chossen = $(this).attr('data')
        my_database.ref('game/player' + player).update({ chossen })
        display.html('<p>you picked <strong>' + chossen + '<strong></p>')
        winner()

    })

    $(document).on('click', '#playagain', function () {
        my_database.ref('game').remove()
        location.reload()
    })

    function winner() {
        my_database.ref('game').on("value", function (snapshot) {
            var sv = snapshot.val();
            if (sv.player1 === "null" || sv.player2 === "null") {
                display.html('<p>waiting for player move</p>')
            }
            else {
                console.log(sv.player1.chossen + " || " + sv.player2.chossen)
                if (sv.player1.chossen === "rock" && sv.player2.chossen === "scissors" ||
                    sv.player1.chossen === "scissors" && sv.player2.chossen === "paper" ||
                    sv.player1.chossen === "paper" && sv.player2.chossen === "rock") {

                    display.html("<h1>Player 1 Wins!!</p>")
                    display.append("<button id='playagain'>PLAY AGAIN")
                }
                else {
                    display.append("<button id='playagain'>PLAY AGAIN")
                }
            }
        })
    }

});
