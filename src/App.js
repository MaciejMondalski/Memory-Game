import './styles/App.scss';
import styled from 'styled-components';
import SingleCard from './components/SingleCard';
import Popup from './components/Popup';
import { useState, useEffect, useCallback } from 'react';

const cardImages = [
  { src: '/img/helmet-1.png', matched: false },
  { src: '/img/potion-1.png', matched: false },
  { src: '/img/ring-1.png', matched: false },
  { src: '/img/scroll-1.png', matched: false },
  { src: '/img/shield-1.png', matched: false },
  { src: '/img/sword-1.png', matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards

  useEffect(
    (card) => {
      if (choiceOne && choiceTwo) {
        setDisabled(true);
        if (choiceOne.src === choiceTwo.src) {
          setCards((cards) => {
            return cards.map((card) => {
              if (card.src === choiceOne.src) {
                return { ...card, matched: true };
              } else {
                return card;
              }
            });
          });

          resetTurn();
        } else {
          setTimeout(() => resetTurn(), 900);
        }
      }
    },
    [choiceOne, choiceTwo]
  );

  // Show Popup when all cards are matched
  useEffect(() => {
    if (!cards.some((e) => e.matched === false)) {
      setShowPopup(true);
    }
  }, [cards]);
  console.log(cards);

  // reset cards and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(turns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
    setShowPopup(false);
  }, []);

  return (
    <div className='App'>
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <StyledGrid>
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
            matched={card.matched}
          />
        ))}
        {showPopup && <Popup />}
      </StyledGrid>
      <p>Turns: {turns}</p>
    </div>
  );
}

const StyledGrid = styled.div`
  position: relative;
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
`;

export default App;
