import React, {useState, useEffect} from 'react';
import './App.scss';
import COLORS from "./ColorsArray.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTwitter} from '@fortawesome/free-brands-svg-icons'

let quotesurl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
const [quote, setQuote] = useState("When everything seems to be going against you, remember that the airplane takes off against the wind, not with it");
const [author, setAuthor] = useState("Henry Ford");
const [randomNumber, setRandomNumber] = useState(0);
const [quotesArray, setQuotesArray] = useState(null);
const [accentColor, setAccentColor] = useState('#1a6eb8');

const getQuotes = async (url) => {
  const response = await fetch(url)
  const parsedJSON = await response.json()
  setQuotesArray(parsedJSON.quotes)
  console.log(parsedJSON)
}

useEffect(() => {
  getQuotes(quotesurl)
}, [quotesurl])

const getRandomQuote = () => {
  let randomInteger = Math.floor(quotesArray.length * Math.random())
  setRandomNumber(randomInteger)
  setAccentColor(COLORS[randomInteger])
  setQuote(quotesArray[randomInteger].quote)
  setAuthor(quotesArray[randomInteger].author)
}

  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: accentColor}}>
       
        <div id="quote-box" style={{color: accentColor}}>
        <p id="text">
          "{quote}""
        </p>
        <p id="author">
         - {author}
        </p>
        
        <div className="button">
        <a id="tweet-quote" style={{backgroundColor: accentColor}} href={encodeURI("http://www.twitter.com/intent/tweet?${quote}")} target='_blank'><FontAwesomeIcon icon={faTwitter} /></a>
       </div>
       
       <div>
        <button id="new-quote"  style={{backgroundColor: accentColor}} onClick={() => getRandomQuote ()}>New Quote</button>
      </div>
      
      </div>
      </header>
    </div>
  );
}

export default App;
