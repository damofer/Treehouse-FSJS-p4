

(function(){

	

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



	var box= $(".box");
	var game = new Game();

	$('#player2').toggleClass( "active" );

$.each(box, function(index){
	this.addEventListener("click", function(){
		var mark;
	if (!($( this ).hasClass( "box-filled-2" ) || $( this ).hasClass( "box-filled-1" ))){
		if(game.getCurrentTurn()%2 == 0){
			$('#player1').toggleClass( "active" )
			$('#player2').toggleClass( "active" )
			mark = new Box(index,"X")
			$(this).addClass("box-filled-2");
			
		}else{
			$('#player1').toggleClass( "active" )
			$('#player2').toggleClass( "active" )
			mark = new Box(index,"O")
			$(this).addClass("box-filled-1");
		
		}

		console.log("Turn " + game.getCurrentTurn());
		console.log("Square " + mark.getIndex() + " with value :  " + mark.getMark());

		game.addBox(mark);

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

	
	
			game.endTurn();
		
			if(game.getCurrentTurn() == 9){
				if(!isWinnerO && !isWinnerX)
					game.finish("DRAW");
			}
		
		}
	});

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





})();

