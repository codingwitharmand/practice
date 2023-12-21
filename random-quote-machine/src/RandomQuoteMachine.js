import "./RandomQuoteMachine.css";
import React, { useState, useEffect } from "react";

const RandomQuoteMachine = () => {
	const [quotes, setQuotes] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	let [quote, setQuote] = useState(null);

	useEffect(() => {
		const getQuotes = async () => {
			try {
				const response = await fetch("https://type.fit/api/quotes");
				if (!response.ok) {
					throw new Error("Could not retrieve quotes");
				}
				const result = await response.json();
				setQuotes(result);
			} catch (error) {
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		};
		getQuotes();
	}, []);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	const updateQuote = () => quotes[Math.floor(Math.random() * quotes.length)];

	quote = updateQuote();

	return (
		<div id="quote-box" className="wrapper">
			<p id="text" className="quote-text">
				{quote.text}
			</p>
			<span id="author" className="quote-author">
				— {quote.author.split(",")[0]}
			</span>
			<div className="quote-buttons">
				<a id="tweet-quote" href="#" className="quote-link">
					Tweet quote
				</a>
				<button
					id="new-quote"
					className="quote-button"
					onClick={() => setQuote(updateQuote)}
				>
					New quote
				</button>
			</div>
		</div>
	);
};

export default RandomQuoteMachine;
