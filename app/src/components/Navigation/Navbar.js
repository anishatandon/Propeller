import React from 'react';
import styled from 'styled-components';

import Logo from '../Logo/index';
import { Container } from '../../hoc/layout/elements';
import NavItems from '../Navigation/NavItems';

const FixedWrapper = styled.header`
  position: fixed;
  background-color: var(--color-mainDark);
  padding: 0rem 2rem;
  top: 0;
  left: 0;
  width: 100%;
  height: 6rem;

  @media ${props => props.theme.mediaQueries.smallest} {
    display: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
`;

const Navbar = ({ signedIn }) => {
  return (
    <FixedWrapper>
      <Container>
        <Wrapper>
          <Logo />
          <NavItems signedIn={signedIn} />
        </Wrapper>
      </Container>
    </FixedWrapper>
  );
};

export default Navbar;