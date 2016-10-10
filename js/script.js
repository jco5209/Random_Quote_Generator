
// DOM Elements
var quoteBox = document.getElementById('quote-box');
var bdyColor = document.getElementsByTagName('body')[0];
var loadBar = document.getElementById('loading-bar').style;

// established variabled used to clearInterval(loadBarInt)
var loadBarInt;

// emptry array for used quotes to be push'd to 
var staleQuotes = [];

var quotes = [
	{quote: "If you ever have to make a choice between learning and inspiration, choose learning. It works more of the time.", source: "Lois McMaster Bujold", citation: "Falling Free", year: 1988, category: "inspirational"},
	{quote: "Everything that is really great and inspiring is created by the individual who can labor in freedom.", source: "Albert Einstein", citation: "Out of My Later Years", year: 1950, category: "inspirational"},
	{quote: "Let my inspiration flow, in token lines suggesting rhythm, that will not forsake me, till my tale is told and done.", source: "Robert Hunter", citation: "Terrapin Station", year: 1977, category: "inspirational"}, 
	{quote: "Tragedy is when I cut my finger. Comedy is when you fall into an open sewer and die.", source: "Mel Brooks", citation: "The 2,000 Year Old Man", year: 1961, category: "humor"}, 
	{quote: "A joke's a very serious thing.", source: "Charles Churchill", citation: "The Ghost", year: 1763, category: "humor"},
	{quote: "The law of levity is allowed to supersede the law of gravity.", source: "R. A. Lafferty", citation: "Space Chantey", year: 1968, category: "humor"}, 
	{quote: "With ordinary talent and extraordinary perseverance, all things are attainable.", source: "Thomas Buxton", citation: "Frank Leslie's Sunday Magazine Vol. XIX PAGE: 89", year: 1886, category: "perseverance"},
	{quote: "If you want to be successful in a particular field of endeavor, I think perseverance is one of the key qualities.", source: "George Lucas", citation: "‘A Life Making Movies", year: 1999, category: "perseverance"},
	{quote: "By perseverance the snail reached the ark.", source: "Charles Spurgeon", citation: "he Salt-cellars : Being a Collection of Proverbs, Together with Homely Notes Thereon PAGE: 89", year: 1889, category: "perseverance"}
];

// returns an array of currently checked HTML checkbox-inputs
// used for quote category selection
function checkedCategories() {
	return document.querySelectorAll("input[type=checkbox]:checked");
}


// uses checkedCategories length to determine how many category boxes are selected
// then uses the index location to return the value from all categories selected to be used in category filtering
function categoryCheck(quoteFilter) {

	if(checkedCategories().length == 1) {
		return quoteFilter.category == checkedCategories()[0].value;
	} else if(checkedCategories().length == 2) {
		return quoteFilter.category == checkedCategories()[0].value || quoteFilter.category == checkedCategories()[1].value;
	} else if(checkedCategories().length == 3 || checkedCategories().length === 0) {
		return quoteFilter.category == 'humor' || quoteFilter.category == 'inspirational' || quoteFilter.category == 'perseverance';
	}

}

// generates a random number between 0 and the length of filtered quotes
// uses the random number to return a random, categorically filtered quote
function getRandomQuote() {
	var rng = Math.floor((Math.random() * quotes.filter(categoryCheck).length) + 0);
	return quotes.filter(categoryCheck)[rng];
}


// injects HTML into the quoteBox div with a random quote's properties
// calls freshQuotes() with an argument of the quote which was just used to insure fresh quotes
// calls rngBackground() to change the background color everytime printQuote() runs
function printQuote() {
	var rngQuote = getRandomQuote();
	quoteBox.innerHTML = 
	'<p class="quote">' + rngQuote.quote + 
	'</p><p class="source">' + rngQuote.source + 
	'<span class="citation">' + rngQuote.citation + 
	'</span><span class="year"> -' + rngQuote.year + '</span>' + 
	'<span> | ' + rngQuote.category + '</span></p>';
	freshQuotes(rngQuote);
	rngBackground();
}

// function recieves most recently displayed quote
// determines array index position of that quote
// removes that quote and stores it in staleQuote array
// if quote array is empty, concat the staleQuotes array to the quotes array & empty staleQuotes
function freshQuotes(stale) {
	var staleQuote = quotes.indexOf(stale);
	staleQuotes.push(stale);
	quotes.splice(staleQuote, 1);

	if(quotes.filter(categoryCheck).length === 0) {
		quotes = quotes.concat(staleQuotes);
		staleQuotes.length = 0;
	}
	
}

// generates 6 digit long random number to set the body's color
function rngBackground() {
	var rngColor = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
	bdyColor.style.background = '#' + rngColor;
}

// new quote generation on a 15 second interval
// also restarts loadingBar()
var quoteSlider = setInterval(function() {printQuote(); loadingBarRestart();}, 15000);

// visual indicator for when a new quote will be generated
// uses styling properties to increase a div's width per increment
function loadingBar() {
	(function() {
	var i = 0;
	loadBarInt = setInterval(function() {
		loadBar.width = i.toString() + '%';
		i += 0.334;
	}, 50);
})();}

// restarts both loading bar & new quote intervals
function quoteSliderRestart() {
	clearInterval(quoteSlider);
	quoteSlider = setInterval(function() {printQuote(); loadingBarRestart();}, 15000);
	loadingBarRestart();
}

// restarts loading bar when a new quote is displayed
function loadingBarRestart() {
	clearInterval(loadBarInt);
	loadingBar();
}


// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", function() {
	printQuote();
	quoteSliderRestart();
}, false);

printQuote();
loadingBar();

