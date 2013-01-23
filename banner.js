var Banner = function(cont){
	if(!cont)
		cont = document.body;
	this.container = cont;
};

Banner.prototype.showMessage = function(bannerTitle, bannerMessage) {
	var banner = this.container.addClass('banner'),
	notice = fw('<div>').addClass('notice'),
	message = fw('<div>').addClass('message');

	message.appendChild(bannerMessage);

	if(bannerTitle !== '')
		notice.innerHTML = '<h3>' + bannerTitle + '</h3>';

	var trans = fw.styleProp('transition');
	if(trans.is)
		notice.style[trans.prop] = "all 100ms ease-out";

	notice.appendChild(message);
	banner.appendChild(notice);

	return notice;
};

Banner.prototype.hideMessage = function(elem) {
	elem.opacity = 0;
	setTimeout(function(){elem.parentNode.removeChild(elem);}, 100);
};

Banner.prototype.handler = function(elem,callback,val,t){
	if(callback){callback(val);}
	this.hideMessage(elem);
	if(t)
		clearTimeout(t);
};

Banner.prototype.alert = function(title, bannerMessage, autohide, callback){
	if(typeof(callback) === "undefined")callback = function(val){return val;};

	var message = fw('<p>');
		message.innerHTML = bannerMessage;

	var ok = fw('<span>').addClass('bannerButton').addClass('yes');
		ok.innerHTML = "ok";


	var	actions = fw('<div>').addClass('actions');

	actions.appendChild(ok);
	message.appendChild(actions);

	var elem = this.showMessage(title, message);
	var t,th = this;
	if(typeof(autohide) === "boolean" && autohide === true){
		t = setTimeout(function(){th.hideMessage(elem);callback();}, 5000);
	}
	else if(typeof(autohide) === "number"){
		t = setTimeout(function(){th.hideMessage(elem);callback();}, autohide);
	}

	ok.addListener('click',function(e){this.handler(elem,callback,true,t);},false,this);
};

Banner.prototype.prompt = function(title, question, initial, callback){
	if(typeof(callback) === "undefined")callback = function(val){return val;};
	var message = fw('<p>');
		message.innerHTML = question;

	var input = fw('<input>');
		input.setAttribute('value', initial);

	var ok = fw('<span>').addClass('bannerButton').addClass('yes');
	ok.innerHTML = "ok";

	var cancel = fw('<span>').addClass('bannerButton').addClass('no');
	cancel.innerHTML = "cancel";

	var	actions = fw('<div>').addClass('actions');

	actions.appendChild(ok);
	actions.appendChild(cancel);
	message.appendChild(input);
	message.appendChild(actions);

	var elem = this.showMessage(title, message);

	ok.addListener('click',function(e){this.handler(elem,callback,input.value);},false,this);
	cancel.addListener('click',function(e){this.handler(elem,callback,false);},false,this);

	//validation?
};

Banner.prototype.confirm = function(title, question, callback){
	if(typeof(callback) === "undefined")callback = function(val){return val;};

	var message = fw('<p>');
		message.innerHTML = question;

	var ok = fw('<span>').addClass('bannerButton').addClass('yes');
		ok.innerHTML = "ok";

	var cancel = fw('<span>').addClass('bannerButton').addClass('no');
		cancel.innerHTML = "cancel";

	var	actions = fw('<div>').addClass('actions');

	actions.appendChild(ok);
	actions.appendChild(cancel);
	message.appendChild(actions);

	var elem = this.showMessage(title, message);

	ok.addListener('click',function(){this.handler(elem,callback,true);},false,this);
	cancel.addListener('click',function(){this.handler(elem,callback,false);},false,this);
};
