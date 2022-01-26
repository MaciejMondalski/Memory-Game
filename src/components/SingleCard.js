import styled from 'styled-components';

function SingleCard({ card, handleChoice }) {
  const handleClick = () => {
    handleChoice(card);
  };

  return (
    <StyledCard>
      <div>
        <img className='front' src={card.src} alt='card front' />
        <img
          className='back'
          src='/img/cover.png'
          onClick={handleClick}
          alt='card back'
        />
      </div>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  width: 100%;
  display: block;
  border: 2px solid #fff;
  border-radius: 6px;
`;

export default SingleCard;