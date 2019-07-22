import React, {useState} from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { firestoreConnect } from 'react-redux-firebase';

import Heading from '../UI/Heading';
import { Container } from '../../hoc/layout/elements';
import InputTodo from './InputTodo';
import Button from '../UI/Button'
import Loader from '../../components/UI/Loader';
import Todo from './Todo';

const Wrapper = styled.div`
    z-index: 0;
    width: 100%;
    align-self: flex-start;
    display: flex;
    height: 100%;
    min-height: calc(100vh - 6rem);
    background-color: var(--color-mainLight);
    max-width: 100%;
`;

const InnerWrapper = styled.div`
    z-index: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0rem 4rem;
    background-color: var(--color-mainLight);
    max-width: 100%;
`;

const Content = styled.div`
  z-index: 0;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 60rem;
  flex-direction: column;
  margin-top: 2rem;
  background-color: var(--color-mainLight);
`;

const Todos = ({todos, requesting, requested, userId}) => {
    const [isAdding, setIsAdding] = useState(false)
    let content;
    if (!todos) {
        content = (
            <Content>
                <Loader isWhite />
            </Content>
        );
    } else if (
        !todos[userId] && requested[`todos/${userId}`] ||
        todos[userId].todos.length === 0
    ) {
        content = (
            <Content>
                <Heading color='white' size='h2'>
                    You have no tasks!
                </Heading>
            </Content>
        );
    } else{
        content = (
            <Content>
                {todos[userId].todos
                    //making shallow copy
                    .slice(0)
                    //reverse ordering
                    .reverse()
                    .map(todo => (
                    <Todo key={todo.id} todo={todo} />
                ))}
            </Content>
        );
    }
  
    return (
      <Wrapper>
        <Container>
          <InnerWrapper>
            <Button color="mainDark" contain onClick={() => setIsAdding(true)}>
              Add new task
            </Button>
            <InputTodo opened={isAdding} close={() => setIsAdding(false)} />
              {content}
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