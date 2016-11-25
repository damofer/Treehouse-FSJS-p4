

!function(_g, _b){

	// where _g is a Game import and _b is a Box


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
	var game = new _g();

	// toggle class handling and turn handling here.
	$('#player2').toggleClass( "active" );

$.each(box, function(index){
	this.addEventListener("click", function(){
		var mark;
	if (!($( this ).hasClass( "box-filled-2" ) || $( this ).hasClass( "box-filled-1" ))){
		if(game.getCurrentTurn()%2 == 0){
			$('#player1').toggleClass( "active" )
			$('#player2').toggleClass( "active" )
			mark = new _b(index,"X")
			$(this).addClass("box-filled-2");
			
		}else{
			$('#player1').toggleClass( "active" )
			$('#player2').toggleClass( "active" )
			mark = new _b(index,"O")
			$(this).addClass("box-filled-1");
		
		}

		console.log("Turn " + game.getCurrentTurn());
		console.log("Square " + mark.getIndex() + " with value :  " + mark.getMark());

		//add this box to the game.boxes
		game.addBox(mark);

		// handle if one of the players has with this move.
		if(game.getCurrentTurn()%2 == 0){
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
		if(game.getCurrentTurn()%2 == 0){
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



//get imports from Game and Box  modules.

}(Game, Box);

