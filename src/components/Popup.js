import styled from 'styled-components';

function Popup({ shuffleCards, turns }) {
  return (
    <>
      <StyledPopup>
        <div className='content'>
          <h1>Congratulations!</h1>
          <p>You did it in {turns} turns.</p>
          <button onClick={shuffleCards}>New Game</button>
        </div>
      </StyledPopup>
    </>
  );
}

const StyledPopup = styled.div`
  position: absolute;
  width: 600px;
  height: 300px;
  background: #3b3050;
  border: 2px solid #fff;
  border-radius: 12px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;

  // Popup animation
  animation: fadeInAnimation ease 2s;

  @keyframes fadeInAnimation {
    0% {
      opacity: 0;
    }

    50% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  body {
    opacity: 0.5;
  }
  .content {
    h1 {
      margin: 1rem;
    }

    button {
      margin: 1rem;
    }
  }
`;

export default Popup;
