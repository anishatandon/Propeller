import React from 'react';
import Heading from '../UI/Heading';
import Button from '../UI/Button';
import styled from 'styled-components';

// import { withAuthorization } from '../Session'

const FriendsWrapper = styled.div`
  align-content: center;
  align-items: center;
  align-self: center;
  justify-content: center;
  justify-items: center;
  justify-self: center;
`;

const FriendsPage = () => (
  <FriendsWrapper>
    <Heading size='h1' bold color='mainDark'>My Friends</Heading>
    <Heading size='h3' noMargin bold color='mainDark'>Bob</Heading>
    <Button color="mainDark">
      Send a Task to Bob
    </Button>
    <Heading size='h3' noMargin bold color='mainDark'>Sam</Heading>
    <Button color="mainDark">
      Send a Task to Sam
    </Button>
    <Heading size='h3' noMargin bold color='mainDark'>Mia</Heading>
    <Button color="mainDark">
      Send a Task to Mia
    </Button>
    <Heading size='h3' noMargin bold color='mainDark'>Lisa</Heading>
    <Button color="mainDark">
      Send a Task to Lisa
    </Button>
    <Heading size='h3' noMargin bold color='mainDark'>Ian</Heading>
    <Button color="mainDark">
      Send a Task to Ian
    </Button>
    <Heading size='h3' noMargin bold color='mainDark'>Emma</Heading>
    <Button color="mainDark">
      Send a Task to Emma
    </Button>
  </FriendsWrapper>
);

// const condition = authUser => !!authUser; 

// export default  withAuthorization(condition)(FriendsPage);

export default FriendsPage;
