
// TODO
//   - Put the CSS file in here?
//   - Let users close it in some other way than refreshing the page


document.addEventListener("DOMContentLoaded", function () {

	let speed = "1";

	// Add the speed variable
	document.head.insertAdjacentHTML("beforeend", `<style>:root{--speed:${speed}s;}</style>`);

	// Add card-zoom's stylesheet
	document.head.insertAdjacentHTML("beforeend", "<link rel='stylesheet' href='card-zoom/card-zoom.css'>");
	
	// Replace all links inside cards with a function
	let allCards = document.getElementsByClassName("card");
	for (let i=0; i<allCards.length; i++) {
		let card = allCards[i];
		if (card.tagName = "a") {

			// Replace the link's functionality
			let oldHref = card.href;
			card.href = `javascript:open(${i}, '${oldHref}');`;

		}
	}

});



function open(index, link) {

	let card = document.getElementsByClassName("card")[index];
	
	// Remove the link
	card.removeAttribute("href");
	
	// Remember this for later
	let origCardPos = card.getBoundingClientRect();
	
	// Replace card with a placeholder so Flex doesn't reorganize the cards
	let placeholder = document.createElement("div");
	placeholder.classList.add("placeholder-card");
	card.parentNode.replaceChild(placeholder, card);
	
	// Put the card on the body (free it from Flex's clutches)
	document.body.appendChild(card);
	
	// Add animation class
	card.classList.add("zoom");
	
	// Remove hover shadow (interferes with input to the iframe (you can't see it anyway))	
	card.classList.remove("hs");
	
	// Put the card where it was before	
	card.style.left = origCardPos.left + "px";
	card.style.top  = origCardPos.top  + "px";
	
	// Create iframe that (usually) leads to the player page
	let iframe = document.createElement("iframe");
	iframe.src = link;
	
	// Replace cover image with the iframe container
	card.replaceChild(iframe, card.getElementsByTagName("img")[0]);
	
	// Prevent scrolling
	document.body.style.position = "fixed";

	
}
