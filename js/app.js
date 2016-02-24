// Show searchbox if JavaScript is enabled on browser
//---------------------------------------------

$('#searchbox').show();

// Render Lightbox
//---------------------------------------------

function createLightbox(item) {
	$('#lightbox').children().remove();
	var lightboxLink = item.find('a').attr("href");
	var lightboxTitle = item.find('img').attr("title");
	var lightboxDescription = item.find('img').attr("alt");
	var isExternal = lightboxLink.indexOf("http");
	if (isExternal !== -1) {	
		lightboxLink = lightboxLink.replace("watch?v=", "embed/");
		$("#lightbox").append('<div id="lightbox-item"><iframe width="420" height="315" src="'+ lightboxLink + '?autoplay=1" frameborder="0" allowfullscreen></iframe><h2>' + lightboxTitle  + '</h2><p>' + lightboxDescription + '</p></div>');
	}
	else {
		$("#lightbox").append("<div id='lightbox-item'><a href='" + lightboxLink + "'><img src='" + lightboxLink  + "'></a><h2>" + lightboxTitle  + "</h2><p>" + lightboxDescription + "</p></div>");
	}
	$('#lightbox, #lightbox-extra, #lightbox-left, #lightbox-right').show();
}

// Lightbox Navigation
//---------------------------------------------

$(document).keydown(function(e) {
	navigate(e);
});

$('#lightbox-left').click( function(e) {
	navigateleft();
});

$('#lightbox-right').click( function(e) {
	navigateright();
});


$('#lightbox-bw').click( function(e) {
		$("#lightbox").toggleClass("desaturate");
});

function navigateleft() {
	var $selected = $('.selected');
	if($selected.is(':first-child')) {
		$selected.removeClass("selected");
		$(".gallery-item").last().addClass("selected");
	} else {
		$selected.removeClass("selected").prev().addClass("selected");
	}
	createLightbox($(".selected"));
}

function navigateright() {
	var $selected = $('.selected');
	if($selected.is(':last-child')) {
		$selected.removeClass("selected");
		$(".gallery-item").first().addClass("selected");
	} else {
		$selected.removeClass("selected").next().addClass("selected");
	}
	createLightbox($(".selected"));
}

function navigate(e) {
	var $selected = $('.selected');
	if(e.which == 39) {
		navigateright();
	}
	if(e.which == 37) {
		navigateleft();
	}
}

$("#lightbox").click( function(event) {
	$('.selected').removeClass('selected');
	$(this).children().remove();
	$(this).hide();
	$('#lightbox-extra, #lightbox-left, #lightbox-right').hide();
});

// Search Function
//---------------------------------------------

/*
var gallery = $('#gallery').html();

$(document).on('keyup','#searchbox', function(e) {
	var substring = $(this).val().toLowerCase();
	var galleryItem;
	var find;

	$("#gallery").html(gallery);
	$(".gallery-item").each( function() {
		galleryItem = ($(this).find('img').attr('title') + " " + $(this).find('img').attr('alt')).toLowerCase();
		find = galleryItem.indexOf(substring);
		if (find === -1) {
			$(this).fadeOut(200, function(){ $(this).detach()});
		}
	});
});
*/

var removedItems = [];

$(document).on('keyup','#searchbox', function(e) {
	var substring = $(this).val().toLowerCase();
	var galleryItem;
	var find;

	$(".gallery-item").each( function() {
		find = filter($(this), substring);
		if (find === -1) {
			removedItems.push($(this));
			$(this).hide(500, function() {$(this).detach()});
		}
	});
	
	for (var i = 0; i < removedItems.length; i++) {
		find = filter(removedItems[i], substring);
		if (find !== -1) {
			$('#gallery').append(removedItems[i]);
			removedItems[i].show('slow');
			removedItems.splice(i, 1);
			i--;
		}
		console.log(removedItems.length);
	}
});

function filter(string, substring) {
		galleryItem = (string.find('img').attr('title') + " " + string.find('img').attr('alt')).toLowerCase();
		return galleryItem.indexOf(substring);
}

$(document).on('click', '.gallery-item',function(event) {
	event.preventDefault();
	$(this).addClass('selected');
	createLightbox($('.selected'));
});

