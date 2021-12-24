document.addEventListener('DOMContentLoaded', function() {

	initTabs()
	initSlider()
	initMenu()
	initPopup()
	initSearch()

	// $("select").niceSelect()

	function initSlider() {

		$(".header-slider").on("init", function(event, slick) {

			let buttons = $(".header-slider__dots li button");

			buttons.each(function(){
				let text = "0" + $(this).text()
				$(this).html(text)
			})

		})

		$(".header-slider").slick({
			slidesToShow: 1,
			fade: true,
			speed: 1000,
			arrows: false,
			dots: true,
			dotsClass: "header-slider__dots"
		})

	}

	function initMenu() {

		let submenuTrigg = $(".header-menu .has-submenu")
		let submenu = $(".header-menu__submenu")

		submenuTrigg.on("click", function(){
			if($(this).hasClass("active")) {
				$(this).removeClass("active")
				submenu.fadeOut(500)
			} else {
				$(this).addClass("active")
				submenu.fadeIn(500)
			}
		})

	}

	function initTabs() {
		let tabsLink =	$(".tabs__nav .tab-link")
		let tabs = $(".tabs .tab")
		tabsLink.on("click", function(){
			let num = $(this).data("tab")
			$(this).parent().find(".active").removeClass("active")
			$(this).parent().parent().find(".tab.active").fadeOut(0).removeClass("active")
			$(this).addClass("active")
			$(this).parent().parent().find(".tab[data-tab-item='" + num + "']").fadeIn(400).addClass("active")
		})
	}

	function initPopup() {
		
		$('.open-popup-link').magnificPopup({
			type:'inline',
			midClick: true,
			mainClass: 'mfp-fade'
		})
	}

	function initSearch() {

		let headerSearch = $(".header-search")
		let closeSearch = $(".header-search__close")
		let b = $("body")

		$(".header-ui__search").on("click", function(e){
			e.preventDefault()
			headerSearch.addClass("active")
			b.addClass("unscroll")
		})

		closeSearch.on("click", function(){
			headerSearch.removeClass("active")
			b.removeClass("unscroll")
		})

	}
})
