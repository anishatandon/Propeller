import React from 'react';
import Heading from '../UI/Heading';
import Button from '../UI/Button';

// import { withAuthorization } from '../Session'

const FriendsPage = () => (
  <div>
    <Heading size='h1' bold color='mainDark'>My Friends</Heading>
    <Heading size='h3' noMargin bold color='mainDark'>Alexandra</Heading>
    <Button color="mainDark" contain>
      Send a Task to Alexandra
    </Button>
    <Heading size='h3' noMargin bold color='mainDark'>Anisha</Heading>
    <Button color="mainDark" contain>
      Send a Task to Anisha
    </Button>
    <Heading size='h3' noMargin bold color='mainDark'>Anuragini</Heading>
    <Button color="mainDark" contain>
      Send a Task to Anuragini
    </Button>
    <Heading size='h3' noMargin bold color='mainDark'>Cher</Heading>
    <Button color="mainDark" contain>
      Send a Task to Cher
    </Button>
    <Heading size='h3' noMargin bold color='mainDark'>Hillary</Heading>
    <Button color="mainDark" contain>
      Send a Task to Hillary
    </Button>
    <Heading size='h3' noMargin bold color='mainDark'>Ignacio</Heading>
    <Button color="mainDark" contain>
      Send a Task to Ignacio
    </Button>
    <Heading size='h3' noMargin bold color='mainDark'>Ilona</Heading>
    <Button color="mainDark" contain>
      Send a Task to Ilona
    </Button>
  </div>
);

// const condition = authUser => !!authUser; 

// export default  withAuthorization(condition)(FriendsPage);

export default FriendsPage;
