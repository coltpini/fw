fw
==

Small (tiny) framework for Javascript. I wondered why I always called jQuery when I used relativly little of the functionality. So I created fw. If you need more than this, use jQuery :).

Use Doc
==

fw
--

###Accepts
a string or an object.

If a string is passed it looks for two special chars the value is wrapped in:
	*	"[selector]" : this will return an array even if only one result is found.
	*	"<elementType>" : this will return a new element of the specified type.

If there are no special chars it will use the selector and return an array for multiple results or a single dom element for a single result.

If an object is passed in it will attach all the functions to the object, this is only neccesary if you are working with an object that doesn't inherit from the Element object, such as XML or other elements.

###Returns
*	A single dom element
*	An group of dom elements
*	An object with new functions attached.

fw.loadScript
-------------
###Accepts
a url to a script file.

This loads a script into the page without a reload

###Returns
Nothing

fw.extend
---------
###Accepts
two objects

This preforms a shallow merge of two objects.

for example

	var obj1 = {
		a: "a",
		b: "b",
		c: "c",
		d: {
				sub1: "sub1",
				sub2: "sub2"
			}
	}

	var obj2 = {
		a: "1",
		d: {
				sub3: "sub3"
			}
	}

would return this:

	{
		a: "1",
		b: "b",
		c: "c",
		d: {
			sub3: "sub3"
		}
	}

###Returns
the combined object.

Publish Subscribe
-----------------

###fw.publish
####accepts
a name and arguments

this publishes a custom event to be consumed by the subscribers, The arguments object is passed along to the subscribers.

####returns
true or false based on success.

###fw.subscribe
####accepts
a name and a function

this would accept a push from the "name" publish and pass the arguments to the function.

####returns
A token that is used to unsubscribe

###fw.unsubscribe
####accepts
a token (this comes from the subscribe function)

This will unsubscribe a function that has been subscribed to a publish

####returns
a true or false on successful unsubscribe.

Event things
------------

###fw.stop
####accepts
event

preforms a stopPropogation (cross browser)

###fw.cancel
####accepts
event

preforms a preventDefault (cross browser)

###fw.stop
####accepts
event

preforms a stopPropogation and preventDefault (cross browser)

###fw.key
####accepts
event

This finds a key code
*note: currently the keypress is correct for every key and keyup and keydown are a little odd*

####returns
an object {code: keyCode, char: character}

fw.ajax
-------
###Accepts
options object:
	{
		type: "GET or POST",
		url: "the url to ajax",
		data: "the data (not complete)",
		success: callback function for onSuccess,
		failure: callback function for onFailure,
		complete: callback function for onComplete
	}

This will preform a basic ajax call, will return a string of the file content.

###Returns
an object:
	{
		val: string trimed to the inside of the body tag,
		raw: raw string,
		status: status code,
		statusText: status text (most likely an invaluable "ok")
	}

fw.jsonp
--------
###Accepts
options object:
	{
		url: jsonp url,
		success: callback function for onSuccess
	}

this does this:
1.takes the jsonp service,
2.creates a function on window with a generated key,
3.defines a function with the key
3.calls fw.loadScript,
4.when loaded the function is called, calling your success callback
5.destroys the created function

fw.stringToXml
--------------
###Accepts
xml string

converts the xml string to an XML document object.

###Returns
xml document object

fw.xmlToJson
###Accepts
xml document object, or xml string

Converts a xml string object (using fw.stringToXml) to json or takes an xml document object and converts to json

###Returns
JS Object

fw.randomString
---------------
###Accepts
length and AlphaNumeric flag

Produces a string, alpha or alphanumeric, of the specified length

###Returns
string

