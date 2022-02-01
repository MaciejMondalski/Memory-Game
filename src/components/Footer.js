import styled from 'styled-components';

function Footer() {
  return (
    <StyledFooter>
      <p>Made by Maciej M. 🗿</p>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  color: white;
  left: 0;
  bottom: 0;
  width: 100%;
  font-size: 1rem;
  justify-self: flex-end;
  margin-top: auto;
`;

export default Footer;
