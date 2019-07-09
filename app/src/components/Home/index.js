import React from 'react';
// import { withAuthorization } from '../Session';
import moment from 'moment';
import AddTaskButton from '../AddTaskButton';
// import { Link } from 'react-router-dom';
// import * as ROUTES from '../../constants/routes';

const HomePage = () => (
  <div>
    <h1>Home</h1>
    <img src="https://image.flaticon.com/icons/svg/267/267711.svg" alt="Home" />
    <h1>
      Tasks for {moment().format('dddd, LL')}
    </h1>
    <AddTaskButton/>
  </div>
);

// const condition = authUser => !!authUser;

// export default withAuthorization(condition)(HomePage);

export default HomePage;