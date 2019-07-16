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

import * as actions from'../../store/actions/';

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

const AddTodo = ({ addTodo, loading, error }) => {
    const [isOpened, setisOpened] = useState(false)
    return (
        <div>
            <Button color="mainDark" contain onClick={() => setisOpened(true)}>
                Add Todo
            </Button>
            {/* <button onClick={() => setisOpened(true)}>Add Todo</button> */}
            <Modal opened={isOpened} close={() => setisOpened(false)}>
                <Heading noMargin size="h1" color="white">
                    Add new todo
                </Heading>
                <Heading bold size="h4" color="white">
                    Yeay more things to do for you;)
                </Heading>
                    <Formik
                        initialValues={{
                        todo: '',
                    }}
                    validationSchema={TodoSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        // send todo
                        const res = await addTodo(values);
                        if (res) {
                            setisOpened(false)
                        }
                        setSubmitting(false)
                    }}
                    >
                    {({ isSubmitting, isValid }) => (
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
                                    color="main"
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                    loading={loading ? 'Adding...' : null}
                                >
                                    Add Todo
                                </Button>
                                <Button color="mainLight" contain onClick={() => setisOpened(false)}>
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
        </div>
    )
}

const mapStateToProps = ({todos}) => ({
    loading: todos.loading,
    error: todos.error
})

const mapDispatchToProps = {
    addTodo: actions.addTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);