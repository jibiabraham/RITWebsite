$(function(){
	jQuery('.camera_wrap').camera();

	// Custom code for initialising the ticker plugin
	$.get("/achievements.html", function(response){
		var contents = $($.parseHTML(response)).find("#achievementsList"), 
			antiscrollWrapper = $("<div class='antiscroll-wrap' style='height:75px;'><div class='antiscroll-inner' style='height:75px;'></div></div>");
		contents.removeClass("with-fav-icons");

		//  Setup the antiscroll
		antiscrollWrapper.find("div").append(contents).end().appendTo("#ticker").antiscroll();

		// Center the list elements
		/*contents.find("li").each(function(){
			var self = 
		});*/

		/*
			Set a timer to keep scrolling the items
			The scrollable item here is the antiscroll-inner element
		*/
		var timer, inner = antiscrollWrapper.find(".antiscroll-inner"), activeIndex = -1, newsFeedHeight = contents.height(),
			newsFeed = contents.find("li"), newsLength = newsFeed.length, scrollTimer = 2000;
		
		timer = setInterval(function() {
			++activeIndex;
			activeIndex >= newsLength && (activeIndex = 0);
			// Center the list element

			/*newsFeed.eq(activeIndex).scrollintoview();*/

		}, scrollTimer);

	});

	function centerElement (item) {
		var parent = item.parent(), heightSelf = item.height();
	}

});