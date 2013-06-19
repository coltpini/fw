var Banner=function(a){a||(a=document.body),this.container=a};Banner.prototype.showMessage=function(a,b){var c=this.container.addClass("banner"),d=fw("<div>").addClass("notice"),e=fw("<div>").addClass("message");e.appendChild(b),this.hideMessage(d),""!==a&&(d.innerHTML="<h3>"+a+"</h3>");var f=fw.styleProp("transition");f.is&&(d.style[f.prop]="all 200ms ease-out"),d.appendChild(e),c.appendChild(d);var g=this;return setTimeout(function(){g.unhideMessage(d)},1),d},Banner.prototype.unhideMessage=function(a){a.opacity(1),a.style.right=0,a.removeClass("hidden")},Banner.prototype.hideMessage=function(a){a.opacity(0),a.style.right=-1*a.offsetWidth+"px",a.addClass("hidden")},Banner.prototype.removeMessage=function(a){this.hideMessage(a),setTimeout(function(){a.parentNode.removeChild(a)},500)},Banner.prototype.handler=function(a,b,c,d){b&&b(c),this.hideMessage(a);var e=this;setTimeout(function(){e.removeMessage(a)},100),d&&clearTimeout(d)},Banner.prototype.alert=function(a,b,c,d){"undefined"==typeof d&&(d=function(a){return a});var e=fw("<p>");e.innerHTML=b;var f=fw("<span>").addClass("bannerButton").addClass("yes");f.innerHTML="ok";var g=fw("<div>").addClass("actions");g.appendChild(f),e.appendChild(g);var h,i=this.showMessage(a,e),j=this;"boolean"==typeof c&&c===!0?h=setTimeout(function(){j.removeMessage(i),d()},5e3):"number"==typeof c&&(h=setTimeout(function(){j.removeMessage(i),d()},c)),f.addListener("click",function(){this.handler(i,d,!0,h)},!1,this)},Banner.prototype.prompt=function(a,b,c,d){"undefined"==typeof d&&(d=function(a){return a});var e=fw("<p>");e.innerHTML=b;var f=fw("<input>");f.setAttribute("value",c);var g=fw("<span>").addClass("bannerButton").addClass("yes");g.innerHTML="ok";var h=fw("<span>").addClass("bannerButton").addClass("no");h.innerHTML="cancel";var i=fw("<div>").addClass("actions");i.appendChild(g),i.appendChild(h),e.appendChild(f),e.appendChild(i);var j=this.showMessage(a,e);g.addListener("click",function(){this.handler(j,d,f.value)},!1,this),h.addListener("click",function(){this.handler(j,d,!1)},!1,this)},Banner.prototype.confirm=function(a,b,c){"undefined"==typeof c&&(c=function(a){return a});var d=fw("<p>");d.innerHTML=b;var e=fw("<span>").addClass("bannerButton").addClass("yes");e.innerHTML="ok";var f=fw("<span>").addClass("bannerButton").addClass("no");f.innerHTML="cancel";var g=fw("<div>").addClass("actions");g.appendChild(e),g.appendChild(f),d.appendChild(g);var h=this.showMessage(a,d);e.addListener("click",function(){this.handler(h,c,!0)},!1,this),f.addListener("click",function(){this.handler(h,c,!1)},!1,this)};