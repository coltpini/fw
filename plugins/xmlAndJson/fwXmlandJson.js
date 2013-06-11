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