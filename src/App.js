import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap for styling
import chatbotImage from "./assets/foto-gato-removebg-preview2.png"; // Import the image

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse("");

    try {
        const res = await axios.get(`http://127.0.0.1:8000/ask`, {
            params: { query }, // Use params instead of adding query manually
            timeout: 60000, // Wait up to 60 seconds
        });

        console.log("API Response:", res); // Log full response
        setResponse(res.data); // Show full response in UI for debugging
    } catch (error) {
        console.error("Axios Error:", error); // Log full error
        if (error.response) {
            console.error("Server responded with:", error.response.data);
            setResponse(`Server error: ${JSON.stringify(error.response.data)}`);
        } else if (error.request) {
            console.error("No response received:", error.request);
            setResponse("No response received from the server.");
        } else {
            console.error("Axios setup error:", error.message);
            setResponse(`Axios error: ${error.message}`);
        }
    } finally {
        setLoading(false);
    }
};

return (
  <div className="container d-flex justify-content-center align-items-center vh-100">
    <div className="card p-4 shadow-lg text-center bg-dark text-white" style={{ width: "400px" , height: "350px" }}>
    <img src={chatbotImage} alt="Chatbot" className="img-fluid mx-auto d-block mb-3" style={{ width: "100px", height: "100px" }} />
      <h2 className="mb-3">Air Quality Cat</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="form-control mb-3"
        placeholder="Ask about air quality..."
      />
      <button
        onClick={handleSendMessage}
        className="btn btn-secondary btn-lg"
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask"}
      </button>
      {response && <div className="alert alert-info mt-3">{response}</div>}
    </div>
  </div>
);
}

export default App;
