import React, {useState} from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { firestoreConnect } from 'react-redux-firebase';

import Heading from '../UI/Heading';
import { Container } from '../../hoc/layout/elements';
import AddTodo from './AddTodo.js';
import Loader from '../../components/UI/Loader';
import Todo from './Todo';

const Wrapper = styled.div`
    width: 100%;
    align-self: flex-start;
    height: 100%;
    min-height: calc(100vh - 6rem);
    background-color: var(--color-mainLight);
`;

const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0rem 4rem;
    background-color: var(--color-mainLight);
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 60rem;
  flex-direction: column;
  margin-top: 2rem;
  background-color: var(--color-mainLight);
`;

const Todos = ({todos, requesting, requested, userId}) => {
    let content;
    
    if (!todos) {
      console.log('ugh')
      content = (<Content><Loader isWhite ></Loader></Content>);
    } else if (!todos[userId] && requested[`todos/${userId}`]) {
      console.log('stupid')
      content = (<Content><Heading color='white'size='h2'>You have no todos!</Heading></Content>);
    } else{
      console.log('why')
      content = (<Content>{todos[userId].todos.map(todo => (<Todo key={todo.id} todo={todo}></Todo>))}</Content>);
    }
  
    return (
      <Wrapper>
        <Container>
          <InnerWrapper>
            {content}
            <AddTodo></AddTodo>
          </InnerWrapper>
        </Container>
      </Wrapper>
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