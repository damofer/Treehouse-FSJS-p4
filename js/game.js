
//Game constructor
 function Game(){


	this.turn = 0;
	this.boxes = ["","","","","","","","",""];
	this.dashboard =[];
	this.winner= "";
	this.isFinish = false;
	this.player1Score=0;
	this.player2Score= 0;
}

//player will use it once the game is ended.
Game.prototype.restart = function(){
	
	this.turn =0;
	this.dashboard = [];
	this.boxes = ["","","","","","","","",""];
	this.winner= "";
	this.isFinish = false;

	var box= $(".box");
	$.each(box, function(){
		$(this).removeClass("box-filled-2");
		$(this).removeClass("box-filled-1");
	});

	

}

//if someone wins or is a tie then this function runs
//shows who won this match, and take a record on the player score.
Game.prototype.finish = function(winner){

	$('#player2').toggleClass( "active" );
	$('#player1').toggleClass( "active" );

		if(winner == "X"){
			this.player2Score +=1;
			this.winner = "Player 2";
				$("#finish").removeClass();
				$("#finish").addClass("screen screen-win screen-win-two");

		} else{

			if(winner=="O"){
				this.player1Score +=1;
				this.winner ="Player 1";
				$("#finish").removeClass();
				$("#finish").addClass("screen screen-win screen-win-one");
				
			}
			else{
				this.winner ="DRAW";

				$("#finish").removeClass();
				$("#finish").addClass("screen  screen-win screen-win-tie");
			}
		}



	if(this.winner != "DRAW"){
			$(".message").html("Winner is " + this.winner ) ;

		


		}
		else{
			$(".message").html("DRAW");
		}

		
		this.isFinish = true;

		
		

		$("#board").hide();
		$("#finish").show();
		
		

		document.getElementById("#scorePlayer1").innerHTML ="<h1 style='text-align: center'>"+ this.player1Score+"</h1>";
		document.getElementById("#scorePlayer2").innerHTML ="<h1 style='text-align: center'>"+ this.player2Score+"</h1>"

}

//next turn.
Game.prototype.endTurn = function(){
	this.turn +=1;
}


//add a box to the array of current boxes filled.
Game.prototype.addBox=function(box){

	this.boxes[box.getIndex()]=box.getMark();
}

//get current turn
Game.prototype.getCurrentTurn = function(){
	return this.turn;
}


//main game function
//this function has the game logic handling, depending of the position of the box in a 3x3 board
//this will tell if someone has won.
   Game.prototype.isWinner=function(player){
		
		

        //HORIZONTAL
        var bool=(this.boxes[0] == player && this.boxes[1] == player && this.boxes[2]==player);
        bool=bool || (this.boxes[3] == player && this.boxes[4] == player && this.boxes[5]==player);
        bool=bool || (this.boxes[6] == player && this.boxes[7] == player && this.boxes[8]==player);
        //VERTical
        bool=bool || (this.boxes[0] == player && this.boxes[3] == player && this.boxes[6]==player);
        bool=bool || (this.boxes[1] == player && this.boxes[4] == player && this.boxes[7]==player);
        bool=bool || (this.boxes[2] == player && this.boxes[5] == player && this.boxes[8]==player);
        //DIAGONAl
        bool=bool || (this.boxes[0] == player && this.boxes[4] == player && this.boxes[8]==player);
        bool=bool || (this.boxes[2] == player && this.boxes[4] == player && this.boxes[6]==player);
        return bool;
    };
