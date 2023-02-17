import { React, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [custom, setCustom] = useState("");
  const [longmessage, setLongMessage] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [disable, setDisable] = useState(true)

  // Consuming endpoint for url shortening
  const fetchData = async () => {
    // Customized
    if(custom.length >= 5){
      try {
        const res = await axios.post("http://127.0.0.1:5000/customize", {destination: input, custom: custom});
        setResult("http://127.0.0.1:5000/"+res.data.link)
      } catch (error) {
        setCustomMessage(error.response.data.message);
        setCustom(JSON.parse(error.config.data).custom)
        setInput(JSON.parse(error.config.data).destination)
      }
    } else {
    // Random
      try {
        const res = await axios.post("http://127.0.0.1:5000/shorten", {destination: input});
        setResult("http://127.0.0.1:5000/"+res.data.link)
      } catch (error) {
        console.log(error)
      }
    }
  }

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
        setCustom("");
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, "500");

        setLongMessage("");
        fetchData();
      } else setLongMessage("Input a valid url");
      
    } else if (input === '' || (custom.length <= 5 && custom.length !== 0)){
      setLongMessage('Field cannot stay empty');
      setDisable(true);
    }
  }

  return (
    <div className="app">
      {loading ? <p className="loading-text">shortening...</p> : null}
      <h1 className={loading ? "heading-text loading" : "heading-text"}>
        url-shorts
      </h1>
      {/* Input container */}
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
                  setDisable(false);
                } else {
                  setLongMessage("Input a valid url");
                  setDisable(true);
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
                if(e.target.value.length < 5 && e.target.value.length !== 0){
                  setCustomMessage("URL title must be at least 5 characters long")
                  setDisable(true);
                } else {
                  setCustomMessage("")
                  setDisable(false)
                }
              }}
            />
            <br />
            <small>{customMessage}</small>
          </div>
        </div>

        <button onClick={handleClick} type="submit" disabled={disable}>
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
          disabled={true}
        />
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
        <div className="copied">{copied ? <p>URL copied!</p> : null}</div>
      </div>
    </div>
  );
}

export default App;
