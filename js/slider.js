$(function(){
	var agendaWait = $.Deferred(), achievementsWait = $.Deferred();

	jQuery('.camera_wrap').camera();

	// Custom code for initialising the ticker plugin
	$.get("/achievements.html", function(response){
		var contents = $($.parseHTML(response)).find("#achievementsList"), ticker = $("#ticker"), tickerUl;
		contents.removeClass("with-fav-icons").addClass("hidden").eq(0).removeClass("hidden"), count = 0;

		//  Setup the antiscroll
		contents = transformAchievements(contents);
		contents.appendTo("#ticker");
		contents.find("li");
		
		function tick () {
			contents.find("li").eq(0).slideUp("fast", function(){
				$(this).appendTo(this.parentNode).slideDown();
			});
		}
		agendaWait.resolve();
		achievementsWait.done(function(){
			setInterval(function(){ tick () }, 5000);
		});
	});

	$.get("/agenda.html", function(response){
		var contents = $($.parseHTML(response)).find("#events_agenda_rit"), ticker = $("#events"), tickerUl;
		contents.addClass("hidden").eq(0).removeClass("hidden"), count = 0;

		contents = transformAgenda(contents);
		contents.appendTo("#events");
		
		function tick () {
			contents.find("li").eq(0).slideUp("fast", function(){
				$(this).appendTo(this.parentNode).slideDown();
			});
		}

		achievementsWait.resolve();
		agendaWait.done(function(){
			setInterval(function(){ tick () }, 5000);
		});
	});

	function transformAchievements(root){
		var listItems = root.find("li");
		listItems.each(function(){
			var self = $(this), bq = $("<blockquote>");
			bq.append(self.contents()).appendTo(self);
		});
		return root;
	}

	function transformAgenda(root){
		var rows = root.find("tbody>tr"), base = $("<ul>");
		rows.each(function(){
			var self = $(this), columns = self.find("td"), listItem = $("<li>");
			columns.each(function(i){
				var thisColumn = $(this);
				if (i === 0){
					listItem.append("<h4>"+ thisColumn.html() +"</h4>");
				}
				else if (i === 1){
					listItem.append("<blockquote>"+ thisColumn.html() +"</blockquote>");
				}
				else {
					listItem.find("blockquote").append("<small>"+ thisColumn.html() +"</small>");
				}
			});
			base.append(listItem);
		});

		return base;
	}

});