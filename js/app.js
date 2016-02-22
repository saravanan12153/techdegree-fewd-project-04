$("#searchbox").show();

$(".gallery-item").click(function(event) {
	event.preventDefault();
	$(this).addClass("selected");
	createLightbox($(".selected"));
});

// TOOK ME TOO LONG TO FIGURE THIS OUT.
// MIGHT SCHEDULE A MEETING WITH A MENTOR TO
// FIND OUT IF THERE'S AN ALTERNATIVE METHOD.

$(window).keydown(function(e) {
	var $selected = $('.selected');
	if(e.which == 39) {
		if($selected.is(':last-child')) {
			$selected.removeClass("selected");
			$(".gallery-item").first().addClass("selected");
		} else {
			$selected.removeClass("selected").next().addClass("selected");
		}
		createLightbox($(".selected"));
	}
	if(e.which == 37) {
		if($selected.is(':first-child')) {
			$selected.removeClass("selected");
			$(".gallery-item").last().addClass("selected");
		} else {
			$selected.removeClass("selected").prev().addClass("selected");
		}
		createLightbox($(".selected"));
	}
});

$("#lightbox").click( function(event) {
	$('.selected').removeClass("selected");
	$(this).children().remove();
	$(this).hide();
});

$("#searchbox").keyup(function(e) {
	var substring = $(this).val();
	var galleryItem;
	var find;
	galleryItem = $(".gallery-item").first().find('img').attr("title") + " " +  $(".gallery-item").first().find('img').attr("alt");
	console.log(galleryItem.indexOf(substring));
});

function createLightbox(item) {
	$('#lightbox').children().remove();
	var lightboxLink = item.find('a').attr("href");
	var lightboxTitle = item.find('img').attr("title");
	var lightboxDescription = item.find('img').attr("alt");
	$("#lightbox").show().append("<div id='lightbox-item'><a href='" + lightboxLink + "'><img src='" + lightboxLink  + "'></a><h2>" + lightboxTitle  + "</h2><p>" + lightboxDescription + "</p></div>");
}
