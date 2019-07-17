import React, { useState } from 'react';
import styled from 'styled-components';

import Logo from '../Logo/index';
import NavItems from './NavItems';
import Hamburger from './Hamburger';

const FixedWrapper = styled.header`
  position: fixed;
  background-color: var(--color-mainLight);
  padding: 0rem 2rem;
  z-index: 150;
  top: 0;
  left: 0;
  width: 100%;
  height: 6rem;
  display: none;
  @media ${props => props.theme.mediaQueries.smallest} {
    display: flex;
  }
  max-width: 100%;
`;

const Wrapper = styled.div`
  background-color: var(--color-mainLight);
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  z-index: 150;
  max-width: 100%;
`;

const Menu = styled.div`
  z-index: 150;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 6rem;
  height: 100vh;
  max-width: 100%;
  background-color: var(--color-mainLight);
  visibility: ${props => (props.opened ? 'visibile' : 'hidden')};
  transform: translateY(${props => (props.opened ? '0%' : '-100%')});
  transition: all 0.1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  display: none;
  @media ${props => props.theme.mediaQueries.smallest} {
    display: flex;
  }
`;

const SideDrawer = ({ signedIn }) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <>
      <FixedWrapper>
        <Wrapper>
          <Logo />
          <Hamburger opened={isOpened} clicked={() => setIsOpened(!isOpened)} />
        </Wrapper>
      </FixedWrapper>
      <Menu opened={isOpened}>
        <NavItems
          signedIn={signedIn}
          mobile
          clicked={() => setIsOpened(false)}
        />
      </Menu>
    </>
  );
};

export default SideDrawer;