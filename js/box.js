

//this Box constructor creates a new Box depending of the index of the board field and the mark 
function Box(index,mark){
	this.index = index;
	this.mark= mark;

}
//each box will have a mark, this mark can be X or O
Box.prototype.getMark = function(){

	return this.mark;
}
//each box will have an index, this index depends on the board position.
Box.prototype.getIndex =function(){
	return this.index;
}
