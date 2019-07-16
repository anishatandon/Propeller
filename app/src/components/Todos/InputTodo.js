import React, {useState} from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components'; 
import { connect } from 'react-redux';

import Button from '../UI/Button';
import Heading from '../UI/Heading';
import Modal from '../UI/Modal';
// import AddTaskButton from '../AddTaskButton' 
import Input from '../UI/Input';
import Message from '../UI/Message';
import {StyledForm} from '../../hoc/layout/elements';

import * as actions from'../../store/actions';

const ButtonsWrapper = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 2rem;
    justify-content: space-around;
`;

const MessageWrapper = styled.div`
    position: absolute;
    bottom: 0rem;
    width: 100%;
    padding: 0 3rem; 
`;
const TodoSchema = Yup.object().shape({
    todo: Yup.string()
      .required('The todo is required.'),
});

const InputTodo = ({
    editTodo,
    close,
    opened,
    addTodo,
    loading,
    error,
    editTodoAction,
}) => {
    const loadingText = editTodo ? 'Editing...' : 'Adding...'
    return (
        <>
            {/* <Button color="main" contain onClick={() => setisOpened(true)}>
                Add Todo
            </Button> */}
            {/* <button onClick={() => setisOpened(true)}>Add Todo</button> */}
            <Modal opened={opened} close={close}>
                <Heading noMargin size="h1" color="white">
                    {editTodo? 'Edit your todo' : 'Add your new todo'}
                </Heading>
                <Heading bold size="h4" color="white">
                    {editTodo? 'Edit your todo and click edit' : 'Yay more things to do for you ;)'}
                </Heading>
                    <Formik
                        initialValues={{
                            todo: editTodo ? editTodo.todo : '',
                    }}
                    validationSchema={TodoSchema}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        // send our todo
                        const res = editTodo
                            ? await editTodoAction(editTodo.id, values)
                            : await addTodo(values);
                        if (res) {
                            close();
                        }
                        // setSubmitting(false)
                        resetForm();
                    }}
                    >
                    {({ isSubmitting, isValid, resetForm }) => (
                        <StyledForm>
                            <Field
                            type="text"
                            name="todo"
                            placeholder="You have a new task?"
                            component={Input}
                            />
                            <ButtonsWrapper>
                                <Button
                                    contain
                                    color="mainDark"
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                    loading={loading ? loadingText : null}
                                >
                                    {editTodo ? 'Edit todo' : 'Add todo'}
                                </Button>
                                <Button
                                    type="button"
                                    color="main"
                                    contain
                                    onClick={() => {
                                        close();
                                        resetForm();
                                    }}
                                >
                                    Cancel
                                </Button>
                            </ButtonsWrapper>
                            <MessageWrapper>
                            <Message error show={error}>
                                {error}
                            </Message>
                            </MessageWrapper>
                        </StyledForm>
                    )}
                    </Formik>
            </Modal>
        </>
    )
}

const mapStateToProps = ({todos}) => ({
    loading: todos.loading,
    error: todos.error,
})

const mapDispatchToProps = {
    addTodo: actions.addTodo,
    editTodoAction: actions.editTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(InputTodo);