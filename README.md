fw
==

Small (tiny) framework for Javascript. I wondered why I always called jQuery when I used relativly little of the functionality. So I created fw. If you need more than this, use jQuery :).

Use Doc
==

fw
___________

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