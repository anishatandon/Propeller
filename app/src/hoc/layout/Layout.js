import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux'

import Navbar from '../../components/Navigation/Navbar';
import SideDrawer from '../../components/Navigation/SideDrawer';

const MainWrapper = styled.main`
  width: 100%;
  max-width: 100%;
  min-height: calc(100vh - 6rem);
  max-height: 100%;
  margin-top: 6rem;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 6rem;
  padding: 0 0 0 0;
  display: flex;
  align-self: center;
  align-items: center;
  align-content: center;
  justify-items: center;
  justify-content: center;
  background-color: rgba(206,232,250,1);
`;

const Layout = ({ children, signedIn }) => (
  <>
    <Navbar signedIn={signedIn} />
    <SideDrawer signedIn={signedIn}/>
    <MainWrapper>{children}</MainWrapper>
  </>
);

const mapStateToProps = ({ firebase }) => ({
  signedIn: firebase.auth,
})

export default connect(mapStateToProps)(Layout);