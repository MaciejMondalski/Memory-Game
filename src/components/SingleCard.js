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
              <img
                className='back'
                src='/img/cover.png'
                onClick={handleClick}
                alt='card back'
              />
            </div>
          </div>
        </div>
      </div>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  .card {
    position: relative;
    width: 100%;
    display: block;

    img {
      border: 2px solid #fff;
      border-radius: 6px;
    }
  }

  // matched cards

  .matched {
    animation-duration: 0.7s;
    animation-name: matched-anim;
    animation-timing-function: ease-out;
    animation-delay: 300ms;
  }

  @keyframes matched-anim {
    from {
      transform: scale(1);
    }

    90% {
      transform: scale(1.15);
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
    transition: all ease-in 0.2s;
    transition-delay: 0.2s;
  }

  .flipped .back {
    transform: rotateY(90deg);
    transition-delay: 0s;
  }
`;

export default SingleCard;
