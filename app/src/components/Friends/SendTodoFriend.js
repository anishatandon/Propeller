// import React, {useState} from 'react';
// import { Formik, Field } from 'formik';
// import * as Yup from 'yup';
// import styled from 'styled-components'; 
// import { connect } from 'react-redux';

// import Button from '../UI/Button';
// import Heading from '../UI/Heading';
// import Modal from '../UI/Modal';
// // import AddTaskButton from '../AddTaskButton' 
// import Input from '../UI/Input';
// import Message from '../UI/Message';
// import {StyledForm} from '../../hoc/layout/elements';

// import * as actions from'../../store/actions';

// const ButtonsWrapper = styled.div`
//     display: flex;
//     width: 100%;
//     margin-bottom: 2rem;
//     justify-content: space-around;
//     max-width: 100%;
// `;

// const MessageWrapper = styled.div`
//     position: absolute;
//     bottom: 0rem;
//     width: 100%;
//     padding: 0 3rem; 
//     max-width: 100%;
// `;
// const TodoSchema = Yup.object().shape({
//     todo: Yup.string()
//       .required('The todo is required.'),
// });

// const InputTodo = ({
//     editTodo,
//     close,
//     opened,
//     addTodo,
//     loading,
//     error,
//     editTodoAction,
// }) => {
//     const [isOpened, setisOpened] = useState(false)
//     return (
//         <>
//             <Button color="main" contain onClick={() => setisOpened(true)}>
//                 Send friend todo
//             </Button>
//             {/* <button onClick={() => setisOpened(true)}>Add Todo</button> */}
//             <Modal opened={opened} close={close}>
//                 <Heading noMargin size="h1" color="white">
//                     What is the task for your friend?
//                 </Heading>
//                 <Heading bold size="h4" color="white">
//                     Type task and press send
//                 </Heading>
//                     <Formik
//                         initialValues={{
//                             todo: '',
//                     }}
//                     validationSchema={TodoSchema}
//                     onSubmit={async (values, { setSubmitting, resetForm }) => {
//                         // send our todo
//                         const res = editTodo
//                             ? await editTodoAction(editTodo.id, values)
//                             : await addTodo(values);
//                         if (res) {
//                             close();
//                         }
//                         // setSubmitting(false)
//                         resetForm();
//                     }}
//                     >
//                     {({ isSubmitting, isValid, resetForm }) => (
//                         <StyledForm>
//                             <Field
//                             type="text"
//                             name="todo"
//                             placeholder="You have a task for your friend?"
//                             component={Input}
//                             />
//                             <Field
//                             type="text"
//                             name="repetition"
//                             placeholder="How often do you want them to complete the task?"
//                             component={Input}
//                             />
//                             <ButtonsWrapper>
//                                 <Button
//                                     contain
//                                     color="mainDark"
//                                     type="submit"
//                                     disabled={!isValid || isSubmitting}
//                                     loading={loading ? loadingText : null}
//                                 >
//                                     Send todo
//                                 </Button>
//                                 <Button
//                                     type="button"
//                                     color="main"
//                                     contain
//                                     onClick={() => {
//                                         close();
//                                         resetForm();
//                                     }}
//                                 >
//                                     Cancel
//                                 </Button>
//                             </ButtonsWrapper>
//                             <MessageWrapper>
//                             <Message error show={error}>
//                                 {error}
//                             </Message>
//                             </MessageWrapper>
//                         </StyledForm>
//                     )}
//                     </Formik>
//             </Modal>
//         </>
//     )
// }

// const mapStateToProps = ({todos}) => ({
//     loading: todos.loading,
//     error: todos.error,
// })

// const mapDispatchToProps = {
//     addTodo: actions.addTodo,
//     editTodoAction: actions.editTodo
// }

// export default connect(mapStateToProps, mapDispatchToProps)(InputTodo);