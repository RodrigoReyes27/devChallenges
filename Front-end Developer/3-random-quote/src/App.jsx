import React, {useState, useEffect} from "react";
import Random from "./components/Random";
import Quote from "./components/Quote";
import Author from "./components/Author";
import {nanoid} from 'nanoid'

function App() {
    const [quotes, setQuotes] = useState([]);
    const [randomQuote, setRandomQuote] = useState([]) // arreglo de quotes
    const [quoteStatus, setQuoteStatus] = useState(false) // si se muestran todas las quotes de un autor
    const [rendered, setRendered] = useState(false) // si ya se mostro la quote
    
    const quotesElements = randomQuote.map(quote => (
        <Quote text={quote.text} key={nanoid()}/>
    ))

    function handleRandomButton() {
        const randomNumber = Math.floor(Math.random() * quotes.length)
        setRandomQuote(() => {
            return [quotes[randomNumber]];
        })
        setRendered(true);
        setQuoteStatus(false);
    }

    function showQuotesAuthor(author) {
        setRandomQuote(quotes.filter(quote => quote.author === author));
        setQuoteStatus(true)
    }

    useEffect(() => {
        fetch("https://type.fit/api/quotes")
            .then(res => res.json())
            .then(data => setQuotes(data))
            .catch(error => console.log(error))
    }, [])

    return (
        <main>
            <Random handleClick={handleRandomButton}/>
            {rendered &&
            <div className="quotes-container">
                {quoteStatus && <h1>{randomQuote[0].author}</h1>}
                {quotesElements}
                {!quoteStatus && randomQuote[0].author !== null &&<Author author={randomQuote[0].author} handleClick={showQuotesAuthor}/>}
            </div>
            }
        </main>
    )
}

export default App;