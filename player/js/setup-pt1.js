/**
 *  SWF Player Setup
 *  1. Get GET variables to use with the SWF player
 *  2. Decode and treat variables
 *  3. Set the page title to the game title
 */

// 1.
function getURLVars() {
	/**
	Get URL Vars
	Returns a specified variable from the URL
	*/
	let vars  = {};
	let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
						function(m, key, value) {
							vars[key] = value;
						});
	return vars;
}

let vars = getURLVars();
let swfTitle = vars.title;
let swfID    = vars.id;

// 2.
swfTitle = decodeURIComponent(swfTitle); // Decode URI (i.e. %20 --> space character) 
swfID = "swf/" + swfID + ".swf";         // Turn gameID into path to .swf

// 3.
document.title = swfTitle;
//alert("Title: " + gameTitle + "\nID: " + gameID);
