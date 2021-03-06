import React, {useState} from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components'; 
import { connect } from 'react-redux';

import Button from '../UI/Button';
import Heading from '../UI/Heading';
import Modal from '../UI/Modal';
import Input from '../UI/Input';
import Message from '../UI/Message';
import {StyledForm} from '../../hoc/layout/elements';

import * as actions from'../../store/actions';

const ButtonsWrapper = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 2rem;
    justify-content: space-around;
    max-width: 100%;
`;

const MessageWrapper = styled.div`
    position: absolute;
    bottom: 0rem;
    width: 100%;
    padding: 0 3rem; 
    max-width: 100%;
`;
const TodoSchema = Yup.object().shape({
    todo: Yup.string()
      .required('The task is required.'),
    repetition: Yup.string()
});

const Label = styled.label`
    display: inline;
`;

const StyledField = styled(Field)`
    color: #cee8fa;
    background-color:#2d527c;
    border: 5px;
    margin: 0px;
`;

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
            <Modal opened={opened} close={close}>{console.log({opened},{close})}
                <Heading noMargin size="h1" color="white">
                    {editTodo? 'Edit your task' : 'Add your new task'}
                </Heading>
                <Heading bold size="h4" color="white">
                    {editTodo? 'Edit your task and click edit' : 'Add your new task and click add'}
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
                            placeholder="What is your new task?"
                            component={Input}
                            />
                            {/* <Field
                            type="text"
                            name="repetition"
                            placeholder="How often will you complete the task? (daily, weekly, monthly)"
                            component={Input}
                            /> */}
                            <span style={{color:'rgba(206,232,250,1)',fontFamily:'Tahoma',fontSize:'1.2rem',textAlign:'center'}}>How frequently will you complete the task?</span>
                            <select style={{backgroundColor:'var(--color-mainLight)',color:'var(--color-mainDark)',fontFamily:'Tahoma',width:'100%',fontSize:'1.2rem',padding:'1.2rem 2rem',fontWeight:'500',borderRadius:'2rem',border:'var(--color-mainDark)',}} className='repetition'>
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly</option>
                            </select>
                            {/* <section className="weekdays">
                                    <span style={{color:'rgba(206,232,250,1)',fontFamily:'Tahoma',fontSize:'1.2rem',textAlign:'center'}}>On what days will you complete the task?</span>
                                    <br/>
                                    <Field type="checkbox" name="weekday" id="Sunday" value="Sunday" component={Input} style={{color:'rgba(206,232,250,1)',fontFamily:'Tahoma',fontSize:'1.2rem',textAlign:'center', margin:'0rem',}}/>
                                    <label style={{color:'rgba(206,232,250,1)',fontFamily:'Tahoma',fontSize:'1.2rem',textAlign:'center'}} for="Sunday">Sunday</label>
                                    <br/>
                                    <Field type="checkbox" name="weekday" id="Monday" value="Monday" component={Input}/>
                                    <label style={{color:'rgba(206,232,250,1)',fontFamily:'Tahoma',fontSize:'1.2rem',textJustify:'center'}} for="Monday">Monday</label>
                                    <br/>
                                    <Field type="checkbox" name="weekday" id="Tuesday" value="Tuesday" component={Input}/>
                                    <label style={{color:'rgba(206,232,250,1)',fontFamily:'Tahoma',fontSize:'1.2rem',textJustify:'center'}} for="Tuesday">Tuesday</label>
                                    <br/>
                                    <Field type="checkbox" name="weekday" id="Wednesday" value="Wednesday" component={Input}/>
                                    <label style={{color:'rgba(206,232,250,1)',fontFamily:'Tahoma',fontSize:'1.2rem',textJustify:'center'}} for="Wednesday">Wednesday</label>
                                    <br/>
                                    <Field type="checkbox" name="weekday" id="Thursday" value="Thursday" component={Input}/>
                                    <label style={{color:'rgba(206,232,250,1)',fontFamily:'Tahoma',fontSize:'1.2rem',textJustify:'center'}} for="Thursday">Thursday</label>
                                    <br/>
                                    <Field type="checkbox" name="weekday" id="Friday" value="Friday" component={Input}/>
                                    <label style={{color:'rgba(206,232,250,1)',fontFamily:'Tahoma',fontSize:'1.2rem',textJustify:'center'}} for="Friday">Friday</label>
                                    <br/>
                                    <Field type="checkbox" name="weekday" id="Saturday" value="Saturday" component={Input}/>
                                    <label style={{color:'rgba(206,232,250,1)',fontFamily:'Tahoma',fontSize:'1.2rem',textJustify:'center'}} for="Saturday">Saturday</label>
                                    <br/>
                            </section> */}
                            
                            <ButtonsWrapper>
                                <Button
                                    contain
                                    color="mainDark"
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                    loading={loading ? loadingText : null}
                                >
                                    {editTodo ? 'Edit task' : 'Add task'}
                                </Button>
                                <Button
                                    type="button"
                                    color="mainLight"
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