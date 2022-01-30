import styled from 'styled-components';

function Footer() {
  return (
    <StyledFooter>
      <p>Made by Maciej M. 🗿</p>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  color: white;
  text-align: center;
`;

export default Footer;
