import './styles/App.scss';
import styled from 'styled-components';
import SingleCard from './components/SingleCard';
import Popup from './components/Popup';
import Footer from './components/Footer';
import { useState, useEffect, useCallback } from 'react';

const cardImages = [
  { src: '/img/burger.jpg', matched: false },
  { src: '/img/hotdog.jpg', matched: false },
  { src: '/img/donut.jpg', matched: false },
  { src: '/img/sushi.jpg', matched: false },
  { src: '/img/pizza.jpg', matched: false },
  { src: '/img/durum.jpg', matched: false },
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
    setShowPopup(false);
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
          setTimeout(() => resetTurn(), 700);
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
      <StyledPage>
        <div id={showPopup && 'dim'}>
          <h1>Memory Game</h1>
          <button onClick={shuffleCards}>New Game</button>
        </div>
        <div className='cards-wrapper'>
          <div id={showPopup && 'dim'} className='cards'>
            {cards.map((card) => (
              <SingleCard
                key={card.id}
                card={card}
                handleChoice={handleChoice}
                flipped={
                  card === choiceOne || card === choiceTwo || card.matched
                }
                disabled={disabled}
                matched={card.matched}
              />
            ))}
          </div>
          {showPopup && <Popup shuffleCards={shuffleCards} turns={turns} />}
        </div>
        <p id={showPopup && 'dim'}>Turns: {turns}</p>
        <Footer />
      </StyledPage>
    </div>
  );
}

const StyledPage = styled.div`
  #dim {
    opacity: 0.4;
    animation-duration: 4s;
    animation-name: example;
  }
  @keyframes example {
    from {
      opacity: 1;
    }
    to {
      opacity: 0.4;
    }
  }

  .cards-wrapper {
    position: relative;
  }

  .cards {
    margin-top: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
  }
`;

export default App;
