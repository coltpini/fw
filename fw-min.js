var fw=function(e){var t;if(typeof e=="object")return new FW(e);if(e.indexOf("<")===0){t=document.createElement(e.replace(/^</,"").replace(/>$/,""));return t}return fw.find(document,e)};fw.find=function(e,t){var n;if(t.indexOf("[")===0){n=e.querySelectorAll(t.replace(/^\[/,"").replace(/\]$/,""));n.forceArray=!0}else t.indexOf("^[")===0?n=e.querySelectorAll(t.substring(1)):n=e.querySelectorAll(t);if(n.length===1&&!n.forceArray)return n[0];if(n.length>1||n.forceArray){n.forceArray&&(n.forceArray=undefined);var r=[];for(var i=0;i<n.length;i++)r.push(n[i]);r.forEach||(r.forEach=function(e){for(var t=0;t<this.length;t++)e(this[t],t,this)});return r}return undefined};fw.loadScript=function(e){var t=document,n="script",r=t.createElement(n),i=t.getElementsByTagName(n)[0];r.src=e;i.parentNode.insertBefore(r,i)};fw.extend=function(e,t){for(var n in t)e[n]=t[n];return e};fw.topics={};fw.subUid=-1;fw.publish=function(e,t){if(!fw.topics[e])return!1;setTimeout(function(){var n=fw.topics[e],r=n?n.length:0;while(r--)n[r].func(t,e)},0);return!0};fw.subscribe=function(e,t){fw.topics[e]||(fw.topics[e]=[]);var n=(++fw.subUid).toString();fw.topics[e].push({token:n,func:t});return n};fw.unsubscribe=function(e){for(var t in fw.topics)if(fw.topics[t])for(var n=0,r=fw.topics[t].length;n<r;n++)if(fw.topics[t][n].token===e){fw.topics[t].splice(n,1);return!0}return!1};fw.stop=function(e){e=e||window.event;e.stopPropagation?e.stopPropagation():e.cancelBubble=!0};fw.cancel=function(e){e=e||window.event;e.preventDefault?e.preventDefault():e.returnValue=!1};fw.stopCancel=function(e){this.stop(e);this.cancel(e)};fw.key=function(e){e=e||window.event;var t=e.keyCode||e.which||undefined,n=String.fromCharCode(t);return{code:t,"char":n}};fw.pointerOffset=function(e){var t=e.currentTarget,n=0,r=0;do{n+=t.offsetLeft;r+=t.offsetTop}while(t=t.offsetParent);return this.pointerPosition(e,r,n)};fw.pointerPosition=function(e,t,n){var r=e.currentTarget;t=t||0,n=n||0;if(!e.touches){var i=e.pageX,s=e.pageY;if(i===undefined&&e.clientX!==null){edoc=e.target.ownerDocument||document;doc=edoc.documentElement;body=edoc.body;i=e.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc&&doc.clientLeft||body&&body.clientLeft||0);s=e.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc&&doc.clientTop||body&&body.clientTop||0)}i-=n;s-=t;return{x:i,y:s}}var o={x:0,y:0,points:[]},u=0,a=0;for(var f=0;f<e.touches.length;f++){var l=e.touches.item(f);u+=l.clientX;a+=l.clientY;o.points.push({x:l.clientX-n,y:l.clientY-t})}o.x=u/f-n;o.y=a/f-t;return o};fw.mouseWheel=function(e){var t=0;e.wheelDelta&&(delta=e.wheelDelta/120);e.detail&&(delta=-e.detail/3);var n=delta;if(e.axis!==undefined&&e.axis===e.HORIZONTAL_AXIS){n=0;t=-1*delta}e.wheelDeltaY!==undefined&&(n=e.wheelDeltaY/120);e.wheelDeltaX!==undefined&&(t=-1*e.wheelDeltaX/120);return{x:t,y:n}};fw.ajax=function(e){function r(){if(n.readyState===4){var e={val:i(n.responseText),raw:n.responseText,status:n.status,statusText:n.statusText};t.success&&e.status===200?t.success(e):t.failure&&e.status!==200&&t.failure(e);t.complete&&t.complete(e)}}function i(e){try{e=e.match(/<body.*?>[\w\W]+<\/body>/)[0].replace(/<body.*?>/,"").replace(/<\/body>/,"")}catch(t){}return e}var t={type:e.type||"GET",url:e.url,data:e.data||null,success:e.success,failure:e.failure,complete:e.complete},n=new XMLHttpRequest;n.onreadystatechange=r;n.open(t.type,t.url,!0);n.send(t.data)};fw.jsonp=function(e){var t={url:e.url,success:e.success},n=this.randomString(10);window[n]=function(e){t.success(e);this[n]=undefined};fw.loadScript(t.url+"?callback="+n)};fw.randomString=function(e,t){var n="",r=function(){var e=Math.random(),n=Math.floor(e*122);if(n>0&&n<10&&t)return n;if(n<91)return String.fromCharCode(n>64?n:65+Math.floor(e*26));if(n>90)return String.fromCharCode(n>96&&n<123?n:97+Math.floor(e*26))};while(n.length<e)n+=r();return n};fw.qs=function(e){var t=window.location.search.substring(1),n=t.split("&"),r={val:"",arr:[]};for(var i=0;i<n.length;i++){var s=n[i].split("=");if(s[0]===e){r.val=s[1];r.arr.push(s[1])}}r.val=decodeURIComponent(r.val).replace("<","").replace(">","");return r};fw.proxy=function(e,t,n){return e.bind?e.bind(t):function(){if(n&&arguments[0].srcElement&&typeof arguments[0].currentTarget=="undefined"){arguments[0].currentTarget=n;arguments[0].target=arguments[0].srcElement}return e.apply(t,arguments)}};fw.cssStyle=function(e,t){return getComputedStyle?getComputedStyle(e)[t]:e.currentStyle[t]};fw.styleProp=function(e){var t=["","chrome","safari","firefox","opera","ie",""],n={},r=e.charAt(0).toUpperCase()+e.slice(1);for(var i=0;i<t.length;i++){n=this.checkCssPropSupport(r,t[i]);if(n.is)break}return n};fw.checkCssPropSupport=function(e,t){var n,r={is:!0,prop:e};el=document.createElement("div");switch(t){case"chrome":n="webkit";break;case"safari":n="webkit";break;case"firefox":n="Moz";break;case"opera":n="O";break;case"ie":n="ms";break;default:n="";e=e.charAt(0).toLowerCase()+e.slice(1)}r.is=typeof el.style[n+e]!="undefined";r.prop=n+e;el=null;return r};fw.cookie={set:function(e,t,n){var r="";if(n){var i=new Date;i.setTime(i.getTime()+n*24*60*60*1e3);r="; expires="+i.toGMTString()}document.cookie=e+"="+t+r+"; path=/"},get:function(e){var t=e+"=",n="",r=document.cookie.split(";");for(var i=0;i<r.length;i++){var s=r[i];while(s.charAt(0)===" ")s=s.substring(1,s.length);s.indexOf(t)===0&&(n=s.substring(t.length,s.length))}return encodeURIComponent(n)},remove:function(e){this.set(e,"",-1)}};fw.extendElement=function(e,t){this.extendObject[e]=t;Element.prototype[e]=t};fw.extendObject={};var FW=function(e){if(e.isFW)return e;e.isFW=!0;e.createChild=function(e){elem=document.createElement(e.replace(/^</,"").replace(/>$/,""));this.appendChild(elem);return elem};e.find=function(e){return fw.find(this,e)};e.addClass=function(e){if(this.classList)this.classList.add(e);else{var t=this.getAttribute("class"),n=!1;if(t){var r=t.split(" ");for(var i=0;i<r.length;i++)r[i]===e&&(n=!0);n||this.setAttribute("class",t+" "+e)}else this.setAttribute("class",e)}return this};e.removeClass=function(e){if(this.classList)this.classList.remove(e);else{var t=this.getAttribute("class"),n=!1,r="";if(t){var i=t.split(" ");for(var s=0;s<i.length;s++){var o=s===0?"":" ";i[s]!==e&&(r+=o+i[s])}this.setAttribute("class",r)}}return this};e.toggleClass=function(e){this.classList?this.classList.toggle(e):this.containsClass(e)?this.removeClass(e):this.addClass(e);return this};e.containsClass=function(e){if(this.classList)return this.classList.contains(e);var t=this.getAttribute("class");if(t){var n=t.split(" ");for(var r=0;r<n.length;r++)if(n[r]===e)return!0}return!1};e.addListener=window.addListener=function(e,t,n,r){var i=typeof n!="undefined"?n:!1;t.p||(t.p=[]);var s={element:this,proxy:fw.proxy(t,r),type:e};if(typeof r!="undefined"){if(!this.addEventListener){s={element:this,proxy:fw.proxy(t,r,this),type:e};this.attachEvent("on"+e,s.proxy)}else this.addEventListener(e,s.proxy,i);t.p.push(s)}else if(!this.addEventListener){s={element:this,proxy:fw.proxy(t,this,this),type:e};t.p.push(s);this.attachEvent("on"+e,s.proxy)}else this.addEventListener(e,t,i);return this};e.removeListener=window.removeListener=function(e,t,n){var r=typeof n!="undefined"?n:!1,i=t;if(t.p)for(var s=0;s<t.p.length;s++)if(this===t.p[s].element&&e===t.p[s].type){i=t.p[s].proxy;t.p.splice(s,1)}this.removeEventListener?this.removeEventListener(e,i,r):this.detachEvent("on"+e,i);return this};e.opacity=function(e){this.style&&typeof this.style.opacity=="undefined"?this.style.filter="alpha(opacity:"+e*100+")":this.style.opacity=e};for(var t in fw.extendObject)e[t]=fw.extendObject[t];return e};FW(Element.prototype);