import "./App.css";
import { number, symbol } from "./constant";
import { useEffect, useState } from "react";

const Card = ({
  number,
  cardType,
  color = "red",
  drawCard = false,
  handleDeckOfCardClick,
}) => {
  return (
    <div
      style={{
        width: "150px",
        height: "200px",
        border: "1px solid black",
        display: "flex",
        margin: "10px",
        backgroundColor: "white",
      }}
      onClick={drawCard && handleDeckOfCardClick}
    >
      {drawCard === false ? (
        <div>
          <div style={{ display: "flex", justifyContent: "left" }}>
            <h1 style={{ color: color }}>{number}</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1 style={{ color: color }}>{cardType}</h1>
          </div>
        </div>
      ) : (
        <h1>Draw card</h1>
      )}
    </div>
  );
};

export default function App() {
  const [alreadyAdded, setAlreadtAdded] = useState([]);
  const [message, showMessage] = useState(false);
  const generateDeck = () => {
    const deck = [];
    for (var i = 0; i < number.length; i++) {
      for (var j = 0; j < symbol.length; j++) {
        deck.push({ n: number[i], s: symbol[j] });
      }
    }
    return deck;
  };
  const [deckCards, setDeckCards] = useState([]);

  useEffect(() => {
    setDeckCards(generateDeck());
    console.log("deckCards", deckCards);
  }, []);
  const handleClick = () => {
    if (deckCards.length > 0) {
      if (deckCards.length === 2) {
        console.log(deckCards[0], deckCards[1]);
        const x = deckCards[0];
        const y = deckCards[1];
        setAlreadtAdded((prev) => {
          return [...prev, x, y];
        });
        deckCards.splice(0, 2);
      } else {
        for (var i = 0; i < 5; i++) {
          const randomCardIndex = Math.floor(Math.random() * deckCards.length);
          const randomCardObject = deckCards[randomCardIndex];
          deckCards?.splice(randomCardIndex, 1);
          setAlreadtAdded((prev) => {
            return [...prev, randomCardObject];
          });
        }
      }
    } else {
      console.log("deck finished");
      showMessage(true);
    }
    console.log("len", deckCards.length);
  };

  return (
    <div className="App">
      {message === true ? (
        <h1>Deck finished</h1>
      ) : (
        <Card drawCard={true} handleDeckOfCardClick={handleClick} />
      )}
      <div className="card-conatiner">
        {alreadyAdded.map((item, index) => {
          // console.log("alreadyAdded", alreadyAdded);
          return (
            <Card
              key={index}
              number={item?.n}
              cardType={item?.s}
              color={item?.s === "❤️" || item?.s === "♦️" ? "red" : "black"}
            />
          );
        })}
      </div>
    </div>
  );
}
