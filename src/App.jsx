import React, { useState, useEffect, useMemo } from "react";
import "./App.css";

function politicianCard({ name, image, position, biography }) {
  console.log("Card");

  return (
    <div className="card">
      <img src={image} />
      <h2>Nome: {name}</h2>
      <p>Posizione: {position}</p>
      <p>{biography}</p>
    </div>
  );
}

const Card = React.memo(politicianCard);

function App() {
  const [politicians, setPoliticians] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://boolean-spec-frontend.vercel.app/freetestapi/politicians")
      .then((res) => res.json())
      .then((data) => setPoliticians(data))
      .catch((error) => console.error(error));
  }, []);

  const filteredList = useMemo(() => {
    const filteredArray = politicians.filter(
      (politician) =>
        politician.name.toLowerCase().includes(search.toLowerCase()) ||
        politician.biography.toLowerCase().includes(search.toLowerCase())
    );
    return filteredArray;
  }, [politicians, search]);

  // console.log(politicians);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="searchBar"
      ></input>
      <h1>Cards Politici</h1>
      <div className="politicians-list">
        {filteredList.map((politician) => (
          <Card key={politician.id} {...politician} />
        ))}
      </div>
    </div>
  );
}

export default App;
