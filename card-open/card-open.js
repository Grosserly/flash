
// TODO
//   - Let users close it in some other way than refreshing the page (will require a major rework)
//   - un-break it


// Resize a card to fill the whole page,
// replace its thumbnail with an iframe
// set the iframe to the link the card pointed to
// remove the card's link
function open(index) {

	let card = document.getElementsByTagName("a")[index];
	alert(index);

	let url = card.href;
	
	// Remember this for later
	let origCardPos = card.getBoundingClientRect();
	
	// Replace card with a placeholder so Flex doesn't reorganize the cards
	let placeholder = document.createElement("div");
	placeholder.classList.add("placeholder-card");
	card.parentNode.replaceChild(placeholder, card);
	
	// Put the card on the body (free it from Flex's clutches)
	document.body.appendChild(card);
	
	// Add animation class
	card.classList.add("card-open-class");
	
	// Remove hover shadow (interferes with input to the iframe and you can't see it anyway)	
	card.classList.remove("hs");
	
	// Put the card where it was before	
	card.style.left = origCardPos.left + "px";
	card.style.top  = origCardPos.top  + "px";
	
	// Create iframe; point it to the card's URL
	let iframe = document.createElement("iframe");
	iframe.src = url;
	
	// Replace thumbnail with the iframe container
	card.replaceChild(iframe, card.getElementsByTagName("img")[0]);
	
	// Prevent scrolling
	document.body.style.position = "fixed";
	
	// Change page title to title key in URL
	document.title = decodeURIComponent(url.substring(url.search("title=")+6, url.length));
	
	// Remove the URL
	card.removeAttribute("href");

}


// Run a function instead of following the link
// if the kind of click is a left click
function oncardclick(e, index) {
	e = e || window.event;
	
	if (e.which == 1) {     // If left click,
		e.preventDefault(); // Don't follow the URL
		alert(e);
		open(index);     // Open as a card on the page instead
	}
}


document.addEventListener("DOMContentLoaded", function () {

	window.onerror = function (msg, url, lineNo, columnNo, error) {
		var string = msg.toLowerCase();
		var substring = "script error";
		if (string.indexOf(substring) > -1){
			alert('Script error; see browser console for details');
		} else {
			var message = [
				'Message: ' + msg,
				'URL: ' + url,
				'Line: ' + lineNo,
				'Column: ' + columnNo,
				'Error object: ' + JSON.stringify(error)
			].join(' - ');

			alert(message);
		}
		return false;
	};

	let speed = "1";
	
	// Add the CSS for the animation
	document.head.insertAdjacentHTML("beforeend", `<style>:root{--speed:${speed}s;}</style>`);
	document.head.insertAdjacentHTML("beforeend", "<link rel='stylesheet' href='card-open/card-open.css'");

	// Add an event listener to each anchor that is a card
	let allCards = document.getElementsByClassName("card");
	for (let i=0; i<allCards.length; i++) {
		let card = allCards[i];
		if (card.tagName == "A")
			card.addEventListener("click", oncardclick, i);
	}

});
