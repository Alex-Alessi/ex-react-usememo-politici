import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [politicians, setPoliticians] = useState([]);

  useEffect(() => {
    fetch("https://boolean-spec-frontend.vercel.app/freetestapi/politicians")
      .then((res) => res.json())
      .then((data) => setPoliticians(data))
      .catch((error) => console.error(error));
  }, []);

  console.log(politicians);

  return (
    <div>
      <h1>Cards Politici</h1>
      <div className="politicians-list">
        {politicians.map((politician) => (
          <div className="card" key={politician.id}>
            <img src={politician.image} />
            <h2>Nome: {politician.name}</h2>
            <p>Posizione: {politician.position}</p>
            <p>{politician.biography}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
