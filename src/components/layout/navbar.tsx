import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

import Logo from '../../assets/icons/leaf.png';


const logoValue = 'Conscentia';

const Navbar = () => {
  const [logo, setLogo] = useState('');

  const startAnimation = () => {
    let currentLogoValue = '';
    const interval = setInterval(() => {
      const logoLength = currentLogoValue.length;
      if (logoLength !== logoValue.length) {
        setLogo(currentLogoValue + logoValue[logoLength]);
        currentLogoValue = currentLogoValue + logoValue[logoLength];
      } else {
        clearInterval(interval);
      }
    }, 50);
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <NavbarStyled>
      <LogoSectionStyled>
        <LogoWrapper>
          <LogoStyled src={Logo}></LogoStyled>
        </LogoWrapper>
        <LogoText>
          {logo.split('').map((item, key) => (
            <LetterWrapperStyled key={key}>
              <LetterStyled>{item}</LetterStyled>
            </LetterWrapperStyled>
          ))}
        </LogoText>
      </LogoSectionStyled>
    </NavbarStyled>
  );
};

const logoIconApearingAnimation = keyframes`
  0% { transform: translateY(-100%) }
  40% { transform: translateY(20%) }
  70% { transform: translateY(0%) rotate(-20deg)}
  100% { transform: rotate(0deg) }
`;

const LogoStyled = styled.img`
  height: 1.7rem;
  margin: 0;
  postion: absolute;
  top: 0;
  left: 0;
  animation-name: ${logoIconApearingAnimation};
  animation-duration: 1.5s;
`;

const LogoWrapper = styled.div`
  margin: 0.7rem 0rem 0.7rem 1rem;
  width: 2rem;
  height: 2rem;
  padding: 0;
`;

const LogoSectionStyled = styled.div`
  display: flex;
  align-items: center;
`;

const LogoText = styled.div`
  font-weight: 900;
  margin: 0.6rem 0;
  display: flex;
`;

const NavbarStyled = styled.div`
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  height: 3rem;
  border-bottom: 1px solid #ddd;
  background: #fafafa;
  padding: 0 1rem 0 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const logoValueApearingAnimation = keyframes`
  0% { font-size: 0rem }
  70% { font-size: 1.9rem }
  100% { font-size: 1.7rem }
`;

const LetterStyled = styled.div`
  font-size: 1.7rem;
  animation-name: ${logoValueApearingAnimation};
  animation-duration: 0.3s;
`;

const LetterWrapperStyled = styled.div`
  height: 2rem;
`;


export default Navbar;
