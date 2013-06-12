function showModal(modalTitle, modalMessage) {
	//since this is a modal, I can only show if no modal is there?
	// or do I destroy this modal?
	// should it wait in line?
	var modal = fw('<div>').addClass('modal'),
		title = fw('<h3>'),
		message = fw('<div>').addClass('message'),
		blackout = fw('<div>').addClass('blackout');

	title.innerHTML = modalTitle;
	message.appendChild(modalMessage);
	modal.appendChild(title);
	modal.appendChild(message);

	var trans = fw.styleProp('transition');
	if(trans.is){
		modal.style[trans.prop] = "all 100ms ease-out";
		blackout.style[trans.prop] = "all 100ms ease-out";
	}
	blackout.opacity(0.8);

	document.body.appendChild(modal);
	document.body.appendChild(blackout);
}

function hideModal() {
	var modal = fw('.modal'),
		blackout = fw('.blackout');

	modal.opacity(0);
	blackout.opacity(0);

	setTimeout(function(){document.body.removeChild(modal);document.body.removeChild(blackout);}, 100);
}

function modalHandler(callback,val){
	if(callback){callback(val);}
	hideModal();
}

function Alert(_title, _message, _callback){
	if(typeof(callback) === "undefined")callback = function(val){return val;};
	var message = fw('<p>');
		message.innerHTML = _message;

	var ok = fw('<span>').addClass('modalButton').addClass('yes');
		ok.innerHTML = "ok";

	var	actions = fw('<div>').addClass('actions');

	actions.appendChild(ok);
	message.appendChild(actions);

	showModal(_title, message,'dialog');
	ok.addListener('click',function(e){modalHandler(_callback,true);},false);
}

function Prompt(title, question, yes, no, initial, callback){
	if(typeof(callback) === "undefined")callback = function(val){return val;};
	var message = fw('<p>');
		message.innerHTML = question;

	var input = fw('<input>');
		input.setAttribute('value', initial);

	var ok = fw('<span>').addClass('modalButton').addClass('yes');
	ok.innerHTML = yes;

	var cancel = fw('<span>').addClass('modalButton').addClass('no');
	cancel.innerHTML = no;

	var	actions = fw('<div>').addClass('actions');

	message.appendChild(input);

	actions.appendChild(ok);
	actions.appendChild(cancel);
	message.appendChild(actions);



	showModal(title, message);

	ok.addListener('click',function(e){modalHandler(callback,input.value);},false);
	cancel.addListener('click',function(e){modalHandler(callback,false);},false);
}

function Confirm(title, question, yes, no, callback){
	if(typeof(callback) === "undefined")callback = function(val){return val;};

	var message = fw('<p>');
		message.innerHTML = question;

	var ok = fw('<span>').addClass('modalButton').addClass('yes');
		ok.innerHTML = yes;

	var cancel = fw('<span>').addClass('modalButton').addClass('no');
		cancel.innerHTML = no;

	var	actions = fw('<div>').addClass('actions');

	actions.appendChild(ok);
	actions.appendChild(cancel);
	message.appendChild(actions);

	this.showModal(title, message);

	ok.addListener('click',function(){modalHandler(callback,true);},false);
	cancel.addListener('click',function(){modalHandler(callback,false);},false);
}