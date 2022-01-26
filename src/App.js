import './styles/App.scss';
import styled from 'styled-components';
import SingleCard from './components/SingleCard';
import { useState, useEffect } from 'react';

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

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards

  useEffect(
    (card) => {
      if (choiceOne && choiceTwo) {
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
          setTimeout(() => resetTurn(), 2000);
        }
      }
    },
    [choiceOne, choiceTwo]
  );

  console.log(cards);

  // reset cards and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(turns + 1);
  };

  console.log();

  return (
    <div className='App'>
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      {turns}

      <StyledGrid>
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </StyledGrid>
    </div>
  );
}

const StyledGrid = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
`;

export default App;
