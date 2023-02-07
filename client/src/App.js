import { React, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [disable, setDisable] = useState(true)
  const [result, setResult] = useState("");

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

  const handleClick = () => {
    setInput("")
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, "2000")
    
    fetchData();
  }

  return (
    <div className="app">
      <h1 className={loading ? "heading-text loading" : "heading-text"}>
        url-shorts
      </h1>
      <div className={loading ? "input-container loading" : "input-container"}>
        <input
          type="text"
          placeholder="Paste your long link here"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            console.log(input);
          }}
        />

        <button onClick={handleClick} type="submit">
          shorten
        </button>
      </div>
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
            <button onClick={() => setDisable(false)} title="Edit">
              🖊
            </button>
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
        {!disable ? (
          <div className="result-container_buttons">
            <button onClick={() => setDisable(true)} title="Check">
              ✔
            </button>
          </div>
        ) : undefined}
      </div>
      <div className="copied">{copied ? <p>URL copied!</p> : null}</div>
      {loading ? <p className="loading-text">shortening...</p> : null}
    </div>
  );
}

export default App;
