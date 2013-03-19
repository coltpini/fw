fw.extendElement("addLoading", function(seg, opt, style, loadingFunction){
	this.removeLoading();
	if(this.style.position === "static" || fw.cssStyle(this,"position") === "static")
		this.style.position = 'relative';

	var loading = this.createChild('<div>').addClass('loading');
	if(typeof(style) === "string")loading.addClass(style);

	var div = loading.createChild("div");

	var	transformSupport = fw.styleProp("transform"),
		animationSupport = fw.styleProp("animation");

	if(!transformSupport.is || !animationSupport.is){
		div.addClass('fallback');
	}
	else{
		var segments = seg || 8,
			degrees = Math.round(360 / segments);

		for(var i=1; i<segments+1; i++){

			var d = div.createChild("div").addClass('segment'),
				span = d.createChild("span"),
				deg = (degrees * i) + "deg",
				num=Math.random()*3,
				hi=30,
				wi=8,
				opac = 2 / i;

			d.style[transformSupport.prop] = "rotate(" + deg + ")";
			d.style[animationSupport.prop] = "loader " + num + "s linear infinite";

			if(loadingFunction){
				loadingFunction(segments,opt,i,d,span);
			}
			else {
				if(opt === "tornado"){
					wi = num * i * i;
				}
				else if(opt === "traditional"){
					d.style[animationSupport.prop] = "none";
					span.style.borderRadius = "2px";
					wi = 2 * Math.PI * 8;
					opac = 10 / (i+1);
				}
				else if(opt > 0){
					wi = opt;
				}

				hi = wi * Math.PI / seg;
				d.style.width = wi + "px";
				d.style.height = hi + "px";
				d.style.marginLeft = -(wi/2) + "px";
				d.style.marginTop = -(hi/2) + "px";
				d.opacity(opac);
			}
		}
	}
});
fw.extendElement("removeLoading",function(){
	var l = this.find(".loading");
	if(l){
		l.opacity = 0;
		setTimeout(function(){l && l.parentNode ? l.parentNode.removeChild(l) : ""},100);
	}
});