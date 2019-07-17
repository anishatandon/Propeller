import React from 'react';
import Heading from '../UI/Heading';
import { Container } from '../../hoc/layout/elements';
import Button from '../UI/Button';
import styled from "styled-components";
import AddFriend from "./AddFriend";

const Wrapper = styled.div`
    width: 100%;
    max-width: 100%;
    align-self: flex-start;
    display: flex;
    height: 100%;
    min-height: calc(100vh - 6rem);
    background-color: var(--color-mainLight);
`;

const InnerWrapper = styled.div`
    display: flex;
    max-width: 100%;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 3rem 4rem;
    background-color: var(--color-mainLight);
`;

const FriendsPage = () => (
  <>
  <Wrapper>
    <Container>
      <InnerWrapper>
        <Heading bold size="h1" color="mainDark">Friends</Heading>
        <AddFriend />
        <p>idea: make formik input that onsubmit compares the input to the list of users then shows the user if theres any</p>
      </InnerWrapper>
    </Container>
  </Wrapper>
  </>
  // <div>
  //   <Heading size='h1' bold color='mainDark'>My Friends</Heading>
  //   <Heading size='h3' noMargin bold color='mainDark'>Alexandra</Heading>
  //   <Button color="mainDark" contain>
  //     Send a Task to Alexandra
  //   </Button>
  //   <Heading size='h3' noMargin bold color='mainDark'>Anisha</Heading>
  //   <Button color="mainDark" contain>
  //     Send a Task to Anisha
  //   </Button>
  //   <Heading size='h3' noMargin bold color='mainDark'>Anuragini</Heading>
  //   <Button color="mainDark" contain>
  //     Send a Task to Anuragini
  //   </Button>
  //   <Heading size='h3' noMargin bold color='mainDark'>Cher</Heading>
  //   <Button color="mainDark" contain>
  //     Send a Task to Cher
  //   </Button>
  //   <Heading size='h3' noMargin bold color='mainDark'>Hillary</Heading>
  //   <Button color="mainDark" contain>
  //     Send a Task to Hillary
  //   </Button>
  //   <Heading size='h3' noMargin bold color='mainDark'>Ignacio</Heading>
  //   <Button color="mainDark" contain>
  //     Send a Task to Ignacio
  //   </Button>
  //   <Heading size='h3' noMargin bold color='mainDark'>Ilona</Heading>
  //   <Button color="mainDark" contain>
  //     Send a Task to Ilona
  //   </Button>
  // </div>
);

// const condition = authUser => !!authUser; 

// export default  withAuthorization(condition)(FriendsPage);

export default FriendsPage;
