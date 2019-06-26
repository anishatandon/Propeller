import React from 'react';

import { withAuthorization } from '../Session'

const FriendsPage = () => (
  <div>
    <h1>Friends</h1>
  </div>
);

const condition = authUser => !!authUser; 

export default  withAuthorization(condition)(FriendsPage);