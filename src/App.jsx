import "./App.css";
import { Dice, DividerM, DividerD } from "./assets";
import axios from "axios";
import { useEffect, useState } from "react";

const baseURL = "https://api.adviceslip.com/advice";
function App() {
  const [advice, setAdvice] = useState(null);
  const [error, setError] = useState(null);

  const getAdviceData = () => {
    axios
      .get(baseURL)
      .then((response) => {
        setAdvice(response.data.slip);
      })
      .catch((error) => {
        setError(error);
      });
  };
  useEffect(() => {
    getAdviceData();
  }, []);

  const handleClick = () => {
    getAdviceData();
  };

  if (error) return <p>{error.message}</p>;
  if (!advice) return null;
  return (
    <main>
      <h1 className="Title">advice #{advice.id}</h1>
      <p className="Advice">{advice.advice}</p>
      <picture>
        <source media="(max-width:768px)" srcSet={DividerM} />
        <source media="(min-width:769px)" srcSet={DividerD} />
        <img src={DividerM} alt="" />
      </picture>
      <button
        className="Btn"
        id="btn"
        aria-label="generate advice"
        onClick={handleClick}
      >
        <img src={Dice} alt="" />
      </button>
    </main>
  );
}

export default App;
