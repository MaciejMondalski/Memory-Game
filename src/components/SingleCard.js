import styled from 'styled-components';

function SingleCard({ card, handleChoice, flipped, disabled, matched }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <StyledCard>
      <div className={flipped ? 'flipped' : ''}>
        <div className={disabled ? 'disabled' : ''}>
          <div className={matched ? 'matched' : ''}>
            <div className='card'>
              <img className='front' src={card.src} alt='card front' />
              <div className='back' onClick={handleClick} alt='card back'></div>
            </div>
          </div>
        </div>
      </div>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  .card {
    width: 100%;
    display: block;
    position: relative;

    img {
      position: absolute;
      border: 2px solid #fff;
      border-radius: 10px;
      width: 200px;
      height: 200px;
      top: 0%;
      left: 0%;
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      backdrop-filter: blur(4px);
    }

    .back {
      height: 200px;
      width: 200px;
      background: linear-gradient(
        30deg,
        rgba(69, 162, 224, 1) 0%,
        rgba(178, 222, 253, 1) 100%
      );
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      backdrop-filter: blur(4px);
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.18);
    }
  }

  // matched cards

  .matched {
    animation-duration: 0.5s;
    animation-name: matched-anim;
    animation-timing-function: ease-out;
    animation-delay: 300ms;
  }

  @keyframes matched-anim {
    0% {
      transform: scale(1);
    }

    70% {
      transform: scale(1.1);
    }
  }

  // front of card

  .card .front {
    transform: rotateY(90deg);
    transition: all ease-in 0.2s;
    position: absolute;
  }

  .flipped .front {
    transform: rotateY(0deg);
    transition-delay: 0.2s;
  }

  // back of card

  .card .back {
    transition: ease-in 0.2s;
    transition-delay: 0.2s;
  }

  .flipped .back {
    transform: rotateY(90deg);
    transition-delay: 0s;
  }
`;

export default SingleCard;
