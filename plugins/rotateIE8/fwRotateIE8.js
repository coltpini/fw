//IE8 rotation
fw.dtoIE = function(deg) {
	var d = deg * (Math.PI / 180);
	var cos = Math.cos(d);
	var sin = Math.sin(d);
	return 'progid:DXImageTransform.Microsoft.Matrix(M11=' + cos + ', M12=' + -sin + ', M21=' + sin + ', M22=' + cos + ",SizingMethod='auto expand')";
};