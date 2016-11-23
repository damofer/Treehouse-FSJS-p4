function Box(index,mark){
	this.index = index;
	this.mark= mark;

}

Box.prototype.getMark = function(){

	return this.mark;
}
Box.prototype.getIndex =function(){
	return this.index;
}