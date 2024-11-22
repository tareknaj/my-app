import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState("");
  let videoUrl  = "http://localhost:8081/paris.mp4";

  useEffect(() => {
    // Call the Spring Boot API
    fetch("http://localhost:8081/public/v1/auth/login", {method: 'POST'})
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text(); // Assuming the Spring Boot API returns plain text
      })
      .then((data) => setMessage(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Empty dependency array ensures this runs once when the component mounts
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {message}

      <video
        controls
        width="720"
        height="480"
      >
        <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
      </video>

    </div>
  );
}

export default App;
