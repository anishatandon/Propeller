import React from 'react';
import styled from 'styled-components';

import Logo from '../Logo/index';
import { Container } from '../../hoc/layout/elements';
import NavItems from '../Navigation/NavItems';
import { NavLink } from 'react-router-dom';


const FixedWrapper = styled.header`
  position: fixed;
  background-color: var(--color-mainLight);
  padding: 0rem 4rem 0rem 4rem;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100%;
  height: 6rem;
  @media ${props => props.theme.mediaQueries.smallest} {
    display: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  max-width: 100%;
  justify-content: space-between;
`;

const Navbar = ({ signedIn }) => {
  return (
    <FixedWrapper>
      <Container>
        <Wrapper>
          <button style={{width:'6rem',height:'6rem'}} ><NavLink to='/'><Logo style={{width:'6rem',height:'6rem'}}/></NavLink></button>
          
          <NavItems signedIn={signedIn} />
        </Wrapper>
      </Container>
    </FixedWrapper>
  );
};

export default Navbar;