//the calling function
var fw = function(val){
	var elem;
	if(typeof(val) === "object"){
		return new FW(val);
	}

	if(val.indexOf('<') === 0){
		elem = document.createElement(val.replace(/^</,'').replace(/>$/,''));
		return elem;
	}

	return fw.find(document,val);
};

fw.find = function(_this,_val){
	var elem;
	if(_val.indexOf('[') === 0){
		elem = _this.querySelectorAll(_val.replace(/^\[/,'').replace(/\]$/,''));
		elem.forceArray = true;
	}
	else
		elem = _this.querySelectorAll(_val);

	if(elem.length === 1 && !elem.forceArray){
		return elem[0];
	}
	else if(elem.length > 1 || elem.forceArray){
		if(elem.forceArray) elem.forceArray = undefined;
		var arr = [];
		for(var i=0;i<elem.length;i++){
			arr.push(elem[i]);
		}
		if(!arr.forEach){
			arr.forEach = function(callback){
				for(var i=0;i<this.length;i++){
					callback(this[i],i,this);
				}
			};
		}
		return arr;
	}
	return undefined;
};

fw.loadScript = function(url) {
	var d = document,
		t = "script",
		g = d.createElement(t),
		s = d.getElementsByTagName(t)[0];
	g.src = url;
	s.parentNode.insertBefore(g, s);
};

fw.extend = function(obj,obj2) {
	//do I want a deep copy?
	//now this is a shallow copy.
	for(var prop in obj2){
		obj[prop] = obj2[prop];
	}
	return obj;
};

//based on pubsubz

/*!
* Pub/Sub implementation
* http://addyosmani.com/
* Licensed under the GPL
* http://jsfiddle.net/LxPrq/
*/


fw.topics = {};
fw.subUid = -1;

fw.publish = function ( topic, args ) {
	if (!fw.topics[topic]) {
		return false;
	}
	setTimeout(function () {
		var subscribers = fw.topics[topic],
			len = subscribers ? subscribers.length : 0;

		while (len--) {
			subscribers[len].func(args, topic);
		}
	}, 0);

	return true;
};
fw.subscribe = function ( topic, func ) {
	if (!fw.topics[topic]) {
		fw.topics[topic] = [];
	}
	var token = (++fw.subUid).toString();
	fw.topics[topic].push({
		token: token,
		func: func
	});
	return token;
};
fw.unsubscribe = function ( token ) {
	for (var m in fw.topics) {
		if (fw.topics[m]) {
			for (var i = 0, j = fw.topics[m].length; i < j; i++) {
				if (fw.topics[m][i].token === token) {
					fw.topics[m].splice(i, 1);
					return true;
				}
			}
		}
	}
	return false;
};

fw.stop = function(e){
	e = e || window.event;
	if(e.stopPropagation)
		e.stopPropagation();
	else
		e.cancelBubble = true;
};

fw.cancel = function(e){
	e = e || window.event;
	if(e.preventDefault)
		e.preventDefault();
	else
		e.returnValue = false;
};

fw.stopCancel = function(e){
	this.stop(e);
	this.cancel(e);
};

fw.key = function(e){
	e = e || window.event;
	var code = e.keyCode || e.which || undefined;
	// this needs to work the same for keyup, keydown, and keypress.
	//don't know if it can.
	var character = String.fromCharCode(code);
	return {code: code, char: character};
};

fw.pointerOffset = function(e){
	var elem = e.currentTarget,
		left = 0,
		top = 0;
	do {
			left += elem.offsetLeft;
			top += elem.offsetTop;
	} while (elem = elem.offsetParent);

	return this.pointerPosition(e,top,left);
};

fw.pointerPosition = function(e,top,left){
	var elem = e.currentTarget;
	top = top || 0,
	left = left || 0;

	if(!e.touches){
		var x = e.pageX,
			y = e.pageY;

		if ( x === undefined && e.clientX !== null ) {
			edoc = e.target.ownerDocument || document;
			doc = edoc.documentElement;
			body = edoc.body;

			x = e.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
			y = e.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
		}
		x = x - left;
		y = y - top;
		return {x:x,y:y};
	}
	else {
		var obj = {
				x: 0,
				y: 0,
				points: []
			},
			tempx = 0,
			tempy = 0;
		for(var i=0;i<e.touches.length;i++){
			var t = e.touches.item(i);
			tempx += t.clientX;
			tempy += t.clientY;
			obj.points.push({x:t.clientX - left,y:t.clientY - top});
		}
		obj.x = (tempx / i) - left;
		obj.y = (tempy / i) - top;
		return obj;
	}
};

fw.mouseWheel = function(e){
	var deltaX = 0;
	if(e.wheelDelta) delta = e.wheelDelta/120;
	if(e.detail) delta = -e.detail/3;
    var deltaY = delta;
    if(e.axis !== undefined && e.axis === e.HORIZONTAL_AXIS){
        deltaY = 0;
        deltaX = -1*delta;
    }
    if(e.wheelDeltaY !== undefined) deltaY = e.wheelDeltaY/120;
    if(e.wheelDeltaX !== undefined) deltaX = -1*e.wheelDeltaX/120;
    return {x:deltaX,y:deltaY};
};

fw.ajax = function(options){
	var o = {
		type: options.type || "GET",
		url: options.url,
		data: options.data || null,
		success: options.success,
		failure: options.failure,
		complete: options.complete
	};
	var request = new XMLHttpRequest();
	request.onreadystatechange = onStatusChange;
	// how do I apply qs params? through data?
	request.open(o.type, o.url, true);
	request.send(o.data);
	function onStatusChange(){
		if(request.readyState === 4){
			var obj = {
				val: trimToBody(request.responseText),
				raw: request.responseText,
				status: request.status,
				statusText: request.statusText
			};

			if(o.success && obj.status === 200)
				o.success(obj);
			else if(o.failure && obj.status !== 200)
				o.failure(obj);

			if(o.complete)
				o.complete(obj);
		}
	}
	function trimToBody(val){
		try{
			val = val.match(/<body.*?>[\w\W]+<\/body>/)[0].replace(/<body.*?>/,'').replace(/<\/body>/,'');
		}catch(err){}
		return val;
	}
};
fw.jsonp = function(options){
	var o = {
		url: options.url,
		success: options.success
	};
	var key = this.randomString(10);
	window[key] = function(json){
		o.success(json);
		this[key] = undefined;
	};

	fw.loadScript(o.url + '?callback=' + key);
};

fw.stringToXml = function(str){
	var xml;
	str = str.replace(/[\t\n]/gi,"");
	if (typeof window.DOMParser !== "undefined") {
		xml = (new window.DOMParser()).parseFromString(str, "text/xml");
	}
	else if (typeof window.ActiveXObject !== "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
		xml = new window.ActiveXObject("Microsoft.XMLDOM");
		xml.async = "false";
		xml.loadXML(str);
	}
	else
		xml = undefined;

	return xml;
};

// Changes XML to JSON
fw.xmlToJson = function(rxml) {
	var obj = {},
		xml = rxml;
	if(typeof(rxml) === "string"){
		xml = this.stringToXml(rxml);
		if(!xml)
			return obj;
	}

	if (xml.nodeType === 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
			obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	}
	else if (xml.nodeType === 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;

			if (typeof(obj[nodeName]) === "undefined") {
				obj[nodeName] = this.xmlToJson(item);
			}
			if (typeof(obj[nodeName].push) === "undefined") {
				var old = obj[nodeName];
				obj[nodeName] = [];
				obj[nodeName].push(old);
			}
			else
				obj[nodeName].push(this.xmlToJson(item));
		}
	}
	return obj;
};

fw.randomString = function(length, isAlphaNumeric){
	var s= '';
	var randomchar=function(){
		var rn= Math.random();
		var gn = Math.floor(rn*122);
		if(gn > 0 && gn < 10 && isAlphaNumeric){return gn;}
		else if(gn < 91){return String.fromCharCode(gn > 64 ? gn : 65 + Math.floor(rn*26));}
		else if(gn > 90){return String.fromCharCode(gn > 96 && gn < 123 ? gn : 97 + Math.floor(rn*26));}
	};
	while(s.length < length) s += randomchar();
	return s;
};

fw.qs = function(attr){
	var qs = window.location.search.substring(1),
		rule = qs.split("&"),
		obj = {
			val : "",
			arr : []
		};
	for (var i=0;i<rule.length;i++) {
		var attrVal = rule[i].split("=");
		if (attrVal[0] === attr) {
			obj.val = attrVal[1];
			obj.arr.push(attrVal[1]);
		}
	}
	obj.val = decodeURIComponent(obj.val).replace('<','').replace('>','');
	return obj;
};

fw.proxy = function(func, obj, _this) {
	if(func.bind){
		return func.bind(obj);
	}
	return function() {
		if(_this && arguments[0].srcElement && typeof(arguments[0].currentTarget) === "undefined"){
			arguments[0].currentTarget = _this;
			arguments[0].target = arguments[0].srcElement;
		}
		return func.apply(obj, arguments);
	};
};

fw.cssStyle = function(elem,prop){
	if(getComputedStyle){
		return getComputedStyle(elem)[prop];
	}
	else{
		return elem.currentStyle[prop];
	}
};

fw.styleProp = function(prop){
	var browsers = ["","chrome","safari","firefox","opera","ie",""],
	support = {},
	p = prop.charAt(0).toUpperCase() + prop.slice(1);

	for(var i=0;i<browsers.length; i++){
		support = this.checkCssPropSupport(p,browsers[i]);
		if(support.is)
			break;
	}
	return support;

};

fw.checkCssPropSupport = function(prop, browser){
	var p,
		support = {is:true, prop:prop};
		el = document.createElement('div');
	switch(browser){
		case "chrome":
			p = "webkit";
			break;
		case "safari":
			p = "webkit";
			break;
		case "firefox":
			p = "Moz";
			break;
		case "opera":
			p = "O";
			break;
		case "ie":
			p="ms";
			break;
		default:
			p='';
			prop=prop.charAt(0).toLowerCase() + prop.slice(1);
			break;
	}
	support.is = typeof(el.style[p + prop]) !== "undefined";
	support.prop = p + prop;
	el = null;
	return support;
};

fw.cookie = {
	set :   function(name, val, days){
				var expires = "";
				if (days) {
					var date = new Date();
					date.setTime(date.getTime()+(days*24*60*60*1000));
					expires = "; expires="+date.toGMTString();
				}

				document.cookie = name+"="+val+expires+"; path=/";
	},
	get :   function(name){
				var nameEQ = name + "=", val = '';
				var ca = document.cookie.split(';');
				for(var i=0;i < ca.length;i++) {
					var c = ca[i];
					while (c.charAt(0)===' ') c = c.substring(1,c.length);
					if (c.indexOf(nameEQ) === 0) val = c.substring(nameEQ.length,c.length);
				}
			return encodeURIComponent(val);
			},

	remove : function(name){
			this.set(name, "", -1);
	}
};
//IE8 rotation
fw.dtoIE = function(deg) {
	var d = deg * (Math.PI / 180);
	var cos = Math.cos(d);
	var sin = Math.sin(d);
	return 'progid:DXImageTransform.Microsoft.Matrix(M11=' + cos + ', M12=' + -sin + ', M21=' + sin + ', M22=' + cos + ",SizingMethod='auto expand')";
};

var FW = function(fwObj){
	if(fwObj.isFW){ return fwObj;}
	fwObj.isFW = true;
	fwObj.createChild = function(val){
		elem = document.createElement(val.replace(/^</,'').replace(/>$/,''));
		this.appendChild(elem);
		return elem;
	};

	fwObj.find = function(val){
		return fw.find(this,val);
	};

	fwObj.addClass = function(c){
		if(this.classList){
			this.classList.add(c);
		}
		else {
			//not a modern browser
			var cls = this.getAttribute('class'),
				hasClass = false;
			if(cls){
				var clsa = cls.split(' ');
				for(var i=0;i<clsa.length;i++){
					if(clsa[i] === c)
						hasClass = true;
				}
				if(!hasClass){
					this.setAttribute('class',cls + " " + c);
				}
			}
			else{
				this.setAttribute('class',c);
			}

		}
		return this;
	};

	fwObj.removeClass = function(c){

		if(this.classList){
			this.classList.remove(c);
		}
		else {
			var cls = this.getAttribute('class'),
				hasClass = false,
				cl = "";
			if(cls){
				var clsa = cls.split(' ');
				for(var i=0;i<clsa.length;i++){
					var s = i===0 ? "":" ";
					if(clsa[i] !== c)
						cl += s + clsa[i];
				}
				this.setAttribute('class',cl);
			}
		}
		return this;
	};

	fwObj.toggleClass = function(c){
		if(this.classList){
			this.classList.toggle(c);
		}
		else {
			if(this.containsClass(c)){
				this.removeClass(c);
			}
			else {
				this.addClass(c);
			}
		}
		return this;
	};

	fwObj.containsClass = function(c){
		if(this.classList){
			return this.classList.contains(c);
		}
		else {
			var cls = this.getAttribute('class');
			if(cls){
				var clsa = cls.split(' ');
				for(var i=0;i<clsa.length;i++){
					if(clsa[i] === c)
						return true;
				}
			}
			return false;
		}
	};

	fwObj.addListener = window.addListener = function(eventName,handler,propagation,obj){
		var p = typeof(propagation)!=="undefined" ? propagation : false;
		//this may be better attached to the element.
		if(!handler.p)
			handler.p = [];
			var yep = {element:this,proxy:fw.proxy(handler,obj),type:eventName};
		if(typeof(obj) !== "undefined"){

			if(!this.addEventListener){
				yep = {element:this,proxy:fw.proxy(handler,obj,this),type:eventName};
				this.attachEvent("on" + eventName, yep.proxy);
			}
			else{
				this.addEventListener(eventName,yep.proxy,p);
			}
			handler.p.push(yep);
		}
		else{
			// no obj, and you are IE.
			if(!this.addEventListener){
				// this will make this this and not window
				yep = {element:this,proxy:fw.proxy(handler,this,this),type:eventName};
				handler.p.push(yep);
				this.attachEvent("on" + eventName,yep.proxy);
			}
			else{this.addEventListener(eventName,handler,p);}
		}
		return this;
	};

	fwObj.removeListener = window.removeListener = function(eventName,handler,propagation){
		var p = typeof(propagation)!=="undefined" ? propagation : false;
		var h = handler;

		if(handler.p){
			for(var i=0;i<handler.p.length;i++){
				if(this === handler.p[i].element && eventName === handler.p[i].type){
					h = handler.p[i].proxy;
					handler.p.splice(i,1);
				}
			}
		}

		if(!this.removeEventListener){this.detachEvent("on" + eventName,h);}
		else{this.removeEventListener(eventName,h,p);}

		return this;
	};

	fwObj.addLoading = function(seg, opt, style, loadingFunction){
		this.removeLoading();
		if(this.style.position === "relative" || this.style.position === "absolute"){}
		else
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
	};


	fwObj.opacity = function(num){
		if(this.style && typeof(this.style.opacity) === "undefined")
			this.style.filter = "alpha(opacity:" + num * 100 + ")";
		else
			this.style.opacity = num;
	};

	fwObj.removeLoading = function(){
		var l = this.find(".loading");
		if(l){
			l.opacity = 0;
			setTimeout(function(){l.parentNode.removeChild(l);},100);
		}
	};
	return fwObj;
};
FW(Element.prototype);