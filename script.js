const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];
let errorCounter = 0;

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

/* Get Quotes from API */
async function getQuotes() {
  showLoadingSpinner();
  const API_URL = "https://type.fit/api/quotes/";

  try {
    const response = await fetch(API_URL);
    apiQuotes = await response.json();
    getNewQuote();
    removeLoadingSpinner();
  } catch (error) {
    errorCounter++;
    if (errorCounter < 10) {
      getNewQuote();
    }
  }
}

/* Show new Quote */
function getNewQuote() {
  // Pick a random quote from apiQuotes array
  const randomIndex = Math.floor(Math.random() * apiQuotes.length);
  const quote = apiQuotes[randomIndex];

  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  if (quote.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;
}

function tweetQuote() {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterURL, "_blank");
}

newQuoteButton.addEventListener("click", getNewQuote);
twitterButton.addEventListener("click", tweetQuote);

// On Load
getQuotes();
