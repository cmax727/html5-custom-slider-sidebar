$(function() {
	var lastSlideNo;
	$(window).bind("hashchange", function() {
		var fragment = $.param.fragment();
		if(!isNaN(fragment) && parseInt(fragment) > 0 && parseInt(fragment) <= $("#contents .slide").length) {
			var slideNo = parseInt(fragment);
			var delta = 1;
			if(slideNo < lastSlideNo) {
				delta = -1;
			}
			lastSlideNo = slideNo;
			$("#contents .slide").eq(slideNo - 1).addClass("current").stop().css({
				"left": (delta * $("#wrap").width()) + "px"
			}).show().animate({
				"left": 0
			}).siblings().removeClass("current").stop().animate({
				"left": (-delta * $("#wrap").width()) + "px"
			}, {
				"complete": function() {
					$(this).hide();
				}
			});
			if(slideNo == 1) {
				$("#nav").stop().fadeOut();
			} else {
				$("#nav").stop().delay(250).fadeIn();
			}
			switch(slideNo) {
				case 1:
					$("#contents .slide:nth-child(1) .box").css({
						"top": "155px",
						"left": "155px",
						"right": "155px",
						"z-index": 999999
					}).hide();
				case 2:
					$("#contents .slide:nth-child(2) .special").show();
				case 3:
					$("#contents .slide:nth-child(3) .box").css({
						"top": $("#contents .slide:nth-child(3) .group").position().top,
						"width": $("#contents .slide:nth-child(3) .group").width(),
						"height": $("#contents .slide:nth-child(3) .group").height()
					}).hide();
					$("#contents .group img").css("opacity", 0).delay(500).animate({
						"opacity": 1
					});
					$("#contents .slide:nth-child(3) .chart div").eq(0).css({
						"top": "-100px",
						"left": "-101px",
						"opacity": 0
					}).delay(750).animate({
						"top": "1px",
						"left": "-1px",
						"opacity": 1
					});
					$("#contents .slide:nth-child(3) .chart div").eq(1).css({
						"top": "151px",
						"left": "-101px",
						"opacity": 0
					}).delay(750).animate({
						"top": "51px",
						"left": "-1px",
						"opacity": 1
					});
					$("#contents .slide:nth-child(3) .chart div").eq(2).css({
						"top": "-112px",
						"left": "182px",
						"opacity": 0
					}).delay(750).animate({
						"top": "12px",
						"left": "82px",
						"opacity": 1
					});
					$("#contents .slide:nth-child(3) .chart div").eq(3).css({
						"top": "199px",
						"left": "185px",
						"opacity": 0
					}).delay(750).animate({
						"top": "99px",
						"left": "85px",
						"opacity": 1
					});
					break;
				case 4:
					$("#contents .slide:nth-child(4) .group").show();
					$("#contents .slide:nth-child(4) .chart div div").stop().css({
						"height": 0,
						"opacity": 0
					}).each(function(i) {
						var fullHeight = 256;
						$(this).delay(500 + 750 * i).animate({
							"height": Math.round((fullHeight * parseFloat($(this).attr("data-value")) / 10)) + "px",
							"opacity": 1
						});
					});
					break;
				case 6:
					$("#contents .slide:nth-child(6) .box").css({
						"top": $("#contents .slide:nth-child(6) .group").position().top,
						"width": $("#contents .slide:nth-child(6) .group").width(),
						"height": $("#contents .slide:nth-child(6) .group").height()
					}).hide();
					$("#contents .slide:nth-child(6) .chart .bars div").stop().css({
						"width": 0,
						"opacity": 0
					}).each(function(i) {
						var fullWidth = $(this).parent().width() - 10;
						$(this).delay(500 + 750 * i).animate({
							"width": Math.round((fullWidth * parseFloat($(this).attr("data-value")) / 10)) + "px",
							"opacity": 1
						});
					});
					break;
				case 7:
					$("#contents .slide:nth-child(7) .box").css({
						"top": "50%",
						"left": "50%",
						"margin": "-380px 0 0 -165px",
						"padding": "60px"
					}).hide();
					break;
				case 8:
					$("#contents .slide:nth-child(8) img").stop().show().filter(":gt(1)").hide();
					$("#contents .slide:nth-child(8)").data("state", 0);
					break;
				case 9:
					$("#contents .slide:nth-child(9) .box").css({
						"top": "-35px",
						"left": "-35px",
						"right": "-35px"
					});
				case 10:
					$("#contents .slide:nth-child(10) .box").css({
						"top": "-35px",
						"left": "-35px",
						"right": "-35px"
					});
					break;
				case 11:
					$("#contents .slide:nth-child(11) .box").css({
						"top": "30px",
						"left": "30px",
						"right": "30px"
					}).hide();
					break;
			}
			$("#surface").hide();
		} else {
			location.hash = "1"
		}
	}).trigger("hashchange");
	$("a[href^='#S'], area[href^='#S']").click(function() {
		var href = $(this).attr("href");
		var slideRef = href.replace(/^#S(\d+|\w+)$/, "$1");
		if(!isNaN(slideRef) && parseInt(slideRef) > 0 && parseInt(slideRef) <= $("#contents .slide").length) {
			location.hash = slideRef + "";
		} else {
			var slideNo = parseInt(location.hash.replace(/^#(\d+)$/, "$1"))
			switch(slideRef) {
				case "b":
					history.go(-1);
					break;
				case "f":
					history.go(1);
					break;
				case "p":
					location.hash = Math.max(1, slideNo - 1)
					break;
				case "n":
					location.hash = Math.min($("#contents .slide").length, slideNo + 1)
					break;
			}
		}
		return false;
	});
	$("a.box-btn, area.box-btn").click(function() {
		$("#contents .slide.current .box").eq(parseInt($(this).attr("data-boxno")) - 1).fadeIn();
		return false;
	});
	$("a[href='#']").click(function() {
		return false;
	});
	$("#contents .slide .box").each(function(_, box) {
		$(".close-btn", this).click(function() {
			$(box).fadeOut();
			return false;
		});
	});
	$("#surface").jSignature({
		"width": 1024,
		"height": 768,
		"color": "#C00000",
		"lineWidth": 4
	});
	$("#nav a img").hover(function() {
		$(this).attr("src", $(this).attr("src").replace(".png", "-hover.png"));
	}, function() {
		$(this).attr("src", $(this).attr("src").replace("-hover.png", ".png"));
	})
	$("#nav .pen-btn").click(function() {
		$("#surface").toggle();
		$("#surface").jSignature("clear");
	});
	var carouselA = $("#contents .slide:nth-child(1) .carousel").CloudCarousel({
		"xPos": 452,
		"yPos": 140,
		"minScale": 0.75,
		"xRadius": 350,
		"yRadius": 25,
		"FPS": 60,
		"buttonLeft": $("#contents .slide:nth-child(1) .arrows a:first-child"),
		"buttonRight": $("#contents .slide:nth-child(1) .arrows a:last-child"),
		"complete": function(front) {
			$("#contents .slide:nth-child(1) .bubbles a").eq((4 + front) % 4).delay(850).fadeIn().siblings().fadeOut();
		}
	});
	$("#contents .slide:nth-child(2) .special table tbody tr:nth-child(2)").click(function() {
		$(this).parents(".special").fadeOut();
	});
	$("#contents .slide:nth-child(4) .chart div").css({
		"float": "left"
	})
	$("#contents .slide:nth-child(4) .chart .hide-area div").click(function() {
		$("#contents .slide:nth-child(4) .group").fadeOut();
	});
	$("#contents .slide:nth-child(4) .chart div div").css({
		"position": "absolute",
		"bottom": "172px",
		"width": "40px",
		"font-size": "1.5em",
		"text-align": "right",
		"color": "#0B4EA2",
		"box-shadow": "5px -5px 20px #98A2D1",
		"cursor": "pointer"
	});
	$("#contents .slide:nth-child(4) .chart div div").each(function(i) {
		$(this).css({
			"left": (100 + (70 * Math.round((i + 1) / 2)) + (i * 40)) + "px",
			"background": i % 2 == 0 ? "#B5D8AC" : "#98A2D1"
		});
	});
	$("#contents .slide:nth-child(4) .chart div div span").css({
		"position": "absolute",
		"top": "-20px",
		"left": "3px",
		"font-size": "0.7em"
	});
	$("#contents .slide:nth-child(6) .chart .bars div").css({
		"height": "23px",
		"padding": "8px 5px",
		"font-size": "1.5em",
		"text-align": "right",
		"color": "#0B4EA2",
		"box-shadow": "5px 5px 20px #98A2D1",
		"cursor": "pointer"
	}).click(function() {
		$("#contents .slide.current .box").eq(parseInt($(this).attr("data-boxno")) - 1).fadeIn();
	});
	$("#contents .slide:nth-child(8) img:gt(0)").click(function() {
		switch($(this).parent().data("state")) {
			case 0:
				$("#contents .slide:nth-child(8) img:eq(2)").fadeIn();
				$(this).parent().data("state", 1);
				break;
			case 1:
				$("#contents .slide:nth-child(8) img:eq(3)").fadeIn();
				$(this).parent().data("state", 2);
				break;
			case 2:
				$("#contents .slide:nth-child(8) img:gt(0)").fadeOut();
				$(this).parent().data("state", 3);
				break;
		}
	});
	$("#contents .slide:nth-child(9) a[href^='pdf_jpg']").click(function() {
		$("#contents .slide:nth-child(9) .box:nth-child(2)").fadeIn();
		return false;
	});
	$("#contents .slide:nth-child(9) .box:nth-child(2)").hide();
	$("#contents .slide:nth-child(11) ul li a").click(function() {
		$(this).parents('.slide').find('video').attr("src", $(this).attr("href"));
		$(this).parents('.slide').find('video')[0].play();
		$("#contents .slide:nth-child(11) .box").fadeIn();
		return false;
	})
	$("#contents .slide:nth-child(11) .box .close-btn").click(function() {
		$(this).parents('.box').find('video')[0].pause();
	});
});
