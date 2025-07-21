import { useState } from "react";
import Flow from "./Flow";

function App() {
  const [story, setStory] = useState("")
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGenerate = () => {

    setLoading(true)
    fetch("http://localhost:3001/api/bedtime-story", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })

    })
      .then((res) => res.json())
      .then((data) => setStory(data.story))
      .catch(console.error)
  };

  return (
    <div className="App">
      <div>
        Ask Me Anything
      </div>
      <input
        type="text"
        placeholder="Enter your story prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "300px", padding: "8px", marginRight: "10px" }}
      />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>
      <div style={{ marginTop: "20px" }}>
        <h2>Answer:</h2>
        <p>{story}</p>
      </div>
      <Flow />
    </div>
  );
}

export default App;

