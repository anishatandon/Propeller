import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

import Modal from '../UI/Modal'
import Button from '../UI/Button'
import Heading from '../UI/Heading'
import Message from '../UI/Message'
import * as actions from '../../store/actions'
import todosReducer from '../../store/reducers/todosReducer';

const ButtonsWrapper = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 2rem;
    justify-content: space-around;
    max-width: 100%;
`;

const TodoWrapper = styled.div`
    margin: 1rem 0 rem;
    font-size: 1.3rem;
    text-align: center;
    color: var(--color-white);
    max-width: 100%;
`;

const MessageWrapper = styled.div`
    position: absolute;
    bottom: 2rem;
    width: 100%;
    padding: 0 3rem;
    max-width: 100%;
`;


const DeleteTodo = ({show, close, todo, deleteTodo, error, loading}) => {
    return (
        <Modal opened={show} close={close}>
            <Heading noMargin size="h1" color="white">
                Delete Todo
            </Heading>
            <Heading bold size="h4" color="white">
                Are you sure you want to delete this todo?
            </Heading>
            <TodoWrapper>
                {todo.todo}
            </TodoWrapper>
            <ButtonsWrapper>
                <Button
                    contain
                    color="red"
                    onClick={() => deleteTodo(todo.id)}
                    disabled={loading}
                    loading={loading ? 'Deleting...' : null}
                >
                    Delete
                </Button>
                <Button color="main" contain onClick={close}>
                    Cancel
                </Button>
            </ButtonsWrapper>
            <MessageWrapper>
                <Message error show={error}>
                    {error}
                </Message>
            </MessageWrapper>
        </Modal>
    )
}

const mapStateToProps = ({todos}) => ({
    error: todos.deleteTodo.error,
    loading: todos.loading
})

const mapDispatchToProps = {
    deleteTodo: actions.deleteTodo,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteTodo)