import React from 'react';
import { withAuthorization } from '../Session';
import moment from 'moment';

const HomePage = () => (
  <div>
    <h1>Home</h1>
    <h1>
      Tasks for {moment().format('dddd, LL')}
    </h1>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);