

"use strict";


(function(){

	





//GAME
var Game = (function(){
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
		Game.prototype ={

			restart: function(){
				
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

				

			},

			//if someone wins or is a tie then this function runs
			//shows who won this match, and take a record on the player score.
			finish: function(winner){

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
					document.getElementById("#scorePlayer2").innerHTML ="<h1 style='text-align: center'>"+ this.player2Score+"</h1>";

			},

			//next turn.
			endTurn: function(){
				this.turn +=1;
			},


			//add a box to the array of current boxes filled.
			addBox: function(box){

				this.boxes[box.getIndex()]=box.getMark();
			},

			//get current turn
			getCurrentTurn: function(){
				return this.turn;
			},


			//main game function
			//this function has the game logic handling, depending of the position of the box in a 3x3 board
			//this will tell if someone has won.
			  isWinner: function(player){
					
					

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
			    }


			};

			return Game;

})();

//BOX
var Box = (function(){


		//this Box constructor creates a new Box depending of the index of the board field and the mark 
		function Box(index,mark){
			this.index = index;
			this.mark= mark;

		}
		//each box will have a mark, this mark can be X or O
		Box.prototype ={

			getMark: function(){

				return this.mark;
			},
			//each box will have an index, this index depends on the board position.
			getIndex: function(){
				return this.index;
			}
		};
		return Box;
})();


/*As the snippets are inside our index.html file, we need to
 hide those snippets with js or jquery and show only the snippet we need to show*/
	$("#start").show();	
	$("#board").hide();
	$("#finish").hide();

	$(".start").click(function(){
		$("#start").hide();	
		$("#board").show();
	});

	$(".restart").click(function(){
		$("#finish").hide();
		$("#board").show();
		game.restart();

	});


// Get all the .box elements
	var box= $(".box");

	// instance a Game object from local scope
	var game = new Game();
	

	// toggle class handling and turn handling here.
	$('#player2').toggleClass( "active" );

$.each(box, function(index){
	this.addEventListener("click", function(){
		var mark;
	if (!($( this ).hasClass( "box-filled-2" ) || $( this ).hasClass( "box-filled-1" ))){
		if(game.getCurrentTurn()%2 === 0){
			$('#player1').toggleClass( "active" );
			$('#player2').toggleClass( "active" );
			mark = new Box(index,"X");
			$(this).addClass("box-filled-2");
			
		}else{
			$('#player1').toggleClass( "active" );
			$('#player2').toggleClass( "active" );
			mark = new Box(index,"O");
			$(this).addClass("box-filled-1");
		
		}

		console.log("Turn " + game.getCurrentTurn());
		console.log("Square " + mark.getIndex() + " with value :  " + mark.getMark());

		//add this box to the game.boxes
		game.addBox(mark);

		// handle if one of the players has with this move.
		if(game.getCurrentTurn()%2 === 0){
				var isWinnerX =	game.isWinner("X");
				if(isWinnerX){
				console.log("X " +isWinnerX);
				game.finish("X");
				}

		}else{
			var isWinnerO =	game.isWinner("O");
				if(isWinnerO){				
				console.log("O " +isWinnerO);
				game.finish("O");
			}
		}

	//no player has won at this
	//once the player clicks and all the code above runs, we end the turn.
			game.endTurn();
		
	//as the board has only 9 fields, once we reach the last one and fill it,
	// if there is no winner yet, then the game ends and "its a tie"	
			if(game.getCurrentTurn() == 9){
				if(!isWinnerO && !isWinnerX)
					game.finish("DRAW");
			}
		
		}
	});

	//some svg animations.

	$(this).mouseover(function(){
		if (!($( this ).hasClass( "box-filled-2" ) || $( this ).hasClass( "box-filled-1" ))){
		if(game.getCurrentTurn()%2 === 0){
			$(this).css("background-image","url(img/x.svg)");
		}
		else{
			$(this).css("background-image","url(img/o.svg)");
		}
	}
	});

	$(this).mouseleave(function(){
		
			$(this).css("background-image","");
		

	});

});












}());

