import React from 'react';

import { withAuthorization } from '../Session';

const CalendarPage = () => (
  <div>
    <h1>Current Month</h1>
  </div>
);

const condition = authUser => !!authUser;

export default  withAuthorization(condition)(CalendarPage);