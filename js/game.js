 function Game(){

	this.turn = 0;
	this.boxes = ["","","","","","","","",""];
	this.dashboard =[];
	this.winner= "";
	this.isFinish = false;
	this.player1Score=0;
	this.player2Score= 0;
}

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
Game.prototype.endTurn = function(){
	this.turn +=1;
}

Game.prototype.checkBoxes=function(){


}
Game.prototype.addBox=function(box){

	this.boxes[box.getIndex()]=box.getMark();
}
Game.prototype.getCurrentTurn = function(){
	return this.turn;
}



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