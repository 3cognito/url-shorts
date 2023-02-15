import { React, useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [disable, setDisable] = useState(true)
  const [longmessage, setLongMessage] = useState("");
  const [customMessage, setCustomMessage] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/shorten", {destination: input});
      setTimeout(() => {
        setResult("http://127.0.0.1:5000/"+res.data.link)
      }, "2000");
    } catch (error) {
      console.log(error)
    }
  }

  // Resetting values of error messages
  useEffect(() => {
    setTimeout(() => setLongMessage(""), "5000")
  }, [longmessage]);

  useEffect(() => {
    setTimeout(() => setCustomMessage(""), "5000")
  }, [customMessage]);

  const handleClick = () => {
    if(input){
      // Validating the long url input field value
      if (
        input.includes("http") ||
        input.includes("www.") ||
        input.includes("https") ||
        input.includes("https://")
      ) {
        setInput("");
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, "2500");

        setLongMessage("");
        fetchData();
      } else setLongMessage("Input a valid url");
      
    } else if (input === ''){
      setLongMessage('Field cannot stay empty');
    } else if (input.includes('http') || input.includes('https') || input.includes('https://')){
      setLongMessage('Input a valid url')
    }
  }

  return (
    <div className="app">
      <h1 className={loading ? "heading-text loading" : "heading-text"}>
        url-shorts
      </h1>
      {/* Input container */}
      {loading ? <p className="loading-text">shortening...</p> : null}
      <div className={loading ? "input-container loading" : "input-container"}>
        <div className="inputs">
          <div className={longmessage ? "long-url_input error" : "long-url_input"}>
            <input
              type="url"
              placeholder="Paste your long link here"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (
                  e.target.value.includes("http") ||
                  e.target.value.includes("www.")
                ) {
                  setLongMessage("");
                } else {
                  setLongMessage("Input a valid url");
                }
              }}
            />
            <br />
            <small>{longmessage}</small>
          </div>
          <div className={customMessage ? "custom-url_input error" : "custom-url_input"}>
            <input
              type="text"
              placeholder="Url title (optional)"
              value={custom}
              onChange={(e) => {
                setCustom(e.target.value)
                if(e.target.value.length < 7){
                  setCustomMessage("URL title must be at least 7 characters long")
                } else {
                  setCustomMessage("")
                }
              }}
            />
            <br />
            <small>{customMessage}</small>
          </div>
        </div>

        <button onClick={handleClick} type="submit">
          shorten
        </button>
      </div>

      {/* Result container */}
      <div className={result ? "result-container" : "result-container hidden"}>
        <input
          type="text"
          value={result}
          onChange={(e) => {
            setResult(e.target.value);
            setCopied(false);
          }}
          disabled={disable}
        />
        {disable ? (
          <div className="result-container_buttons">
            <CopyToClipboard text={result} onCopy={() => setCopied(true)}>
              <button
                onClick={() => setTimeout(() => setCopied(false), "2000")}
                title="Copy"
              >
                📎
              </button>
            </CopyToClipboard>
          </div>
        ) : undefined}
        <div className="copied">{copied ? <p>URL copied!</p> : null}</div>
      </div>
    </div>
  );
}

export default App;
