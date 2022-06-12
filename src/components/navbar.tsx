import React from 'react';
import styled from 'styled-components';
import Logo from '../assets/icons/leaf.png';

const LogoStyled = styled.img`
  height: 1.7rem;
  margin: 0.7rem 0.5rem 0.7rem 1rem;
`;

const LogoSectionStyled = styled.div`
  display: flex;
`;

const LogoText = styled.div`
  font-size: 1.7rem;
  font-weight: 900;
  margin: 0.6rem 0;
`;

const NavbarStyled = styled.div`
  width: 100vw;
  height: 3rem;
  border-bottom: 1px solid #ddd;
  background: #fafafa;
  padding: 0 1rem 0 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Navbar = () => {
  return (
    <NavbarStyled>
      <LogoSectionStyled>
        <LogoStyled src={Logo}></LogoStyled>
        <LogoText>Conscentia</LogoText>
      </LogoSectionStyled>
    </NavbarStyled>
  );
};

export default Navbar;
