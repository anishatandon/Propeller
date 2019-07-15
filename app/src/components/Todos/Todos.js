import React, {useState} from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { firestoreConnect } from 'react-redux-firebase';

import Heading from '../UI/Heading';
import { Container } from '../../hoc/layout/elements';
import AddTodo from './AddTodo.js';

const Wrapper = styled.div`
    width: 100%;
    aligh-self: flex-start;
    height: 100%;
    min-height: calc(100vh - 6rem);
    background-color: var(--color-mainLight);
`;

const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5rem 4rem;
`;

const Todos = ({ todos, requesting, requested, userId }) => {
    let content;
    if (!todos) {
        content = <p> loading </p>

    } else if(!todos[userId] && requested[`todos/${userId}`]) {
        content = <p> You did all your tasks yay, buy urself boba</p>

    } else {console.log('u have stuff')}
        content = <p> do your stuff </p>
    return (
        <div>
            {/* <Heading noMargin size="h1" color="white">
                Your Todos
            </Heading>
            <Heading bold size="h4" color="white">
                Let's get this bread
            </Heading> */}
            <AddTodo />
            {content}
        </div>
    )
};

const mapStateToProps = ({firebase, firestore}) => ({
    userId: firebase.auth.uid,
    todos: firestore.data.todos,
    requesting: firestore.status.requesting,
    requested: firestore.status.requested,
})

const mapDispatchToProps ={

}

export default compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firestoreConnect(props => [`todos/${props.userId}`])
  )(Todos);