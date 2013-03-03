$(function(){

	var truncateLength = 250;
	$(".truncate").each(function(){
		var self = $(this), text = self.text();
		if (text.length > truncateLength){
			self.data("fullText", text);
			self.text(text.slice(0, truncateLength) + "...");
			self.append($("<a href='javascript:;' class='read_more'>read more</a>"));
		}
	});

	$(".read_more").click(function(){
		var self = $(this), text = self.parent().data("fullText");
		self.parent().text(text);
	});

});