var contextMenus,
	console = console || {"log":function(){}};

var scripts = document.getElementsByTagName("script"), sd = '';
try{
	for(var i=0;i<scripts.length;i++){
		var s = scripts[i];

		if(s.src && (s.src.search('contextMenu.js') >= 0 || s.src.search('contextMenu.js') >= 0 || s.src.search('contextMenu-min.js') >= 0 || s.src.search('contextMenu-min.js') >= 0)){
			sd = s.src.toLowerCase().replace('http://','').replace('https://','');
			sd = sd.substring(0, sd.indexOf("/"));
			sd = "//" + sd;
		}

	}

	if(sd === ''){throw "serviceDomain is empty";}
	if(sd.search('localhost') >= 0){sd = "";}

}
catch(e){
	console.log(e);
	sd = 'http://eadview.lds.org';
}

if(document.createStyleSheet){
	document.createStyleSheet('' + sd + '/resources/css/contextMenu.css');
}
else{
	document.write('<style>@import "' + sd + '/resources/css/contextMenu.css";</style>');
}
(function($, undefined) {
	var _cm;
	contextMenus = function() {_cm=this;};
	contextMenus.prototype.init = function(options){

		this.settings = {
			passedMenus : [],
			defaultMenu : {},
			menus: []
		};

		if(options){$.extend(this.settings, options);}
		this.buildMenus();
		this.applyMenus();
	};

	contextMenus.prototype.buildMenus = function(){

		this.settings.defaultMenu =		{
										name: "default",
										selector: "body",
										back: {
											text: "Back",
											action: "window.history.back();",
											order: 0
										},
										collection:{
											text: "Collections",
											url: "/ead-module/collections/home",
											order: 1
										}

									};

		this.settings.menus.push(this.settings.defaultMenu);
		for(i=0;i<this.settings.passedMenus.length;i++){
			var item = this.settings.passedMenus[i];
			var arr = $.extend({}, this.settings.defaultMenu);
			$.extend(arr, item);
			this.settings.menus.push(arr);
		}
		$('body').append('<div class="contextMenu"></div>');
		this.settings.$cm = $('.contextMenu');
		this.settings.cm = this.settings.$cm[0];
		this.settings.$cm.mousedown(function(e){
										e.stopPropagation();
										if(e.which === 3){
											_cm.settings.$cm.fadeOut(100);

										}
									});
		this.settings.$cm.on('mouseup','a,span', function(e){

										if(e.which === 1){
											_cm.settings.$cm.fadeOut(100);

										}
									});
	};

	contextMenus.prototype.applyMenus = function(){
		for(i=0;i<this.settings.menus.length;i++){
			var obj = this.settings.menus[i];
			$(document).on('mousedown' ,obj.selector, obj, function(e){_cm.createMenu(e, this);});
		}
		if(this.settings.menus.length > 0){
			$(document).on('contextmenu', function(){return false;});
		}
		// stop propagation

	};
	contextMenus.prototype.createMenu = function(e, elem){
		//render the menu.
		// clear the previous menu.
		this.settings.currentE = e;
		if(e.which === 3){
			e.preventDefault();
			e.stopPropagation();
			_cm.settings.$cm.html('');
			for (var prop in e.data) {
				if (e.data.hasOwnProperty(prop) && typeof(e.data[prop]) === "object") {
					var t = e.data[prop];
					if(typeof(t.url) !== "undefined"){
						_cm.settings.$cm.append('<a href="' + t.url + '" >' + t.text + '</a>');
					}
					else if(typeof(t.action) !== "undefined"){
						_cm.settings.$cm.append('<span onclick="' + t.action + '" >' + t.text + '</span>');
					}
					else{
						_cm.settings.$cm.append(t.text);
					}
				}
			}

			var top = e.pageY,
				left = e.pageX,
				cmWidth = _cm.settings.$cm.outerWidth(),
				cmHeight = _cm.settings.$cm.outerHeight(),
				winWidth = $(window).width(),
				winHeight = $(window).height();
				// only need to worry about left and bottom
				if(left > ( winWidth - cmWidth) ){
					// you are too far right
					left = left - cmWidth;
				}
				if(top > ( winHeight - cmHeight) ){
					// you are too far down
					top = top - cmHeight;
				}

			_cm.settings.$cm.css({'top': top, 'left': left});
			$('.contextMenu').fadeIn(100);
		}
		if(e.which === 1){
			if(this.settings.$cm.css('display') !== "none"){

				e.preventDefault();
				e.stopPropagation();
				_cm.settings.$cm.fadeOut(100);
			}
		}

	};
})(jQuery);