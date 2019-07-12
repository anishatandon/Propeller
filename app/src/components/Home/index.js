import React from 'react';
import { withAuthorization } from '../Session';
import moment from 'moment';
import Popup from "reactjs-popup";
import AddTaskButton from '../AddTaskButton';
// import { Link } from 'react-router-dom';
// import * as ROUTES from '../../constants/routes';

const HomePage = () => (
  <div>
    <h1>Home</h1>
    <h1>
      Tasks for {moment().format('dddd, LL')}
    </h1>
    {/* <Link to {ROUTES.MODAL}>
      <button>Add Tasks</button>
    </Link> */}
    {/* <Link to={ROUTES.ADDTASKMODAL}>
      <button>Add Tasks</button>
    </Link> */}
    {/* <Popup trigger={<button>Add Task</button>}>
      <div>Popup content here!! Info for user to add a task</div>
    </Popup> */}
    <AddTaskButton/>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);