var Tippet = function(elem, opts){
    this.elem = elem;
    this.options = {
        position: 'bottom',
        area: 'after',
        arrow: true,
        close: true,
        title: "",
        content: "",
        wide: false
    };
    fw.extend(this.options, opts);
    this.elem.addClass('tippetElem');
    if(this.elem.style.position === "static" || fw.cssStyle(this.elem, 'position') === "static")
        this.elem.style.position = "relative";
};

Tippet.prototype.show = function(){
    if(this.elem.find('[aside.tippet]').length < 1)
        this.render();
};
Tippet.prototype.hide = function(e){
    console.debug(this.elem, this.tippet);
    this.elem.removeChild(this.tippet);
    // I shouldn't need this, I should be able to show this on the event. Make sure that works.
    fw.stopCancel(e);
};

Tippet.prototype.render = function(){
    this.tippet = this.elem.createChild('<aside>').addClass('tippet');

    var t = this.tippet;
    if(this.options.wide)
        t.addClass('wide');

    t.addClass(this.options.position).addClass(this.options.area);

    t.head = t.createChild('<header>').addClass('tippetHeader');
    if(this.options.title !== ""){
        t.heading = t.head.createChild('<h3>');
        t.heading.innerHTML = this.options.title;
    }
    t.close = t.head.createChild('<span>').addClass('close');
    t.container = t.createChild('<section>').addClass('tippetContent');
    t.arrow = t.createChild('<div>').addClass('tippetArrow');

    t.container.innerHTML = this.options.content;

    t.close.innerHTML = "x";
    t.close.addListener('click',this.hide, false, this);

    if(fw.cssStyle(this.elem,'position' === 'static') || this.elem.style.position === 'static'){
        this.elem.style.position = 'relative';
    }
};

Tippet.prototype.collision = function(){};

