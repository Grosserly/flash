/**
 *  1. Set up information for the SWF player
 *  2. Start the SWF 
 */
 
// 1.
var flashvars = {};

var params = {
	menu:  "false",
	scale: "showAll", // Fit to screen without distortion or cropping
	allowFullscreen:   "true",
	allowScriptAccess: "always",
	bgcolor: "#000000",
	wmode:   "direct"
};

var attributes = {
	id: swfTitle
};


// 2.
swfobject.embedSWF( // "This is where the fun begins." -Anakin Skywalker
	swfID, // Path to the SWF file goes here
	"altContent", "100%", "100%", "10.0.0", 
	"expressInstall.swf",
	flashvars, params, attributes
);
