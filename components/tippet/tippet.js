var Tippet = function(elem, opts){
    this.elem = elem;
    this.options = {
        position: 'bottom',
        area: 'after',
        arrow: true,
        close: true,
        title: "",
        content: ""
    };
    fw.extend(this.options, opts);
    this.elem.addClass('tippetElem');
};

Tippet.prototype.show = function(){
    this.render();
};
Tippet.prototype.hide = function(){};

Tippet.prototype.render = function(){
    this.tippet = this.elem.createChild('<aside>').addClass('tippet');

    var t = this.tippet;

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


    if(fw.cssStyle(this.elem,'position' === 'static') || this.elem.style.position === 'static'){
        this.elem.style.position = 'relative';
    }
};

Tippet.prototype.collision = function(){};

