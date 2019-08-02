import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Formik, Field } from 'formik'
import styled from 'styled-components'
import * as Yup from 'yup'

import Message from '../UI/Message'
import { FormWrapper, StyledForm } from '../../hoc/layout/elements'
import Heading from '../UI/Heading'
import Input from '../UI/Input'
import Button from '../UI/Button'
import Modal from '../UI/Modal'

import * as actions from '../../store/actions'

const MessageWrapper = styled.div`
    position: absolute;
    bottom: 2rem;
    width: 100%;
    padding: 0 3rem 0 3rem;
`;

const DeleteWrapper = styled.div`
    cursor: pointer;
    color: var(--color-errorRed);
    font-size: 1.3rem;
    font-weight: 700;
    margin-top: 2rem;
    transition: all .2s;

    &:hover {
        transform: translateY(-3px);
    }

    &:active {
        transform: translateY(2px);
    }
`;

const ButtonsWrapper = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 2rem;
    justify-content: space-around;
`;

const AccountSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('Your first name is required'),
    lastName: Yup.string() 
        .required('Your last name is required'),
    username: Yup.string()
        .required('Username is required.'),
    // .trim('Username cannot have whitespace') // not working. trying to not use this for validation instead just automatically remove whitespace
    // .strict(true).lowercase('Username needs to be lowercase'),
    email: Yup.string()
        .email('Invalid email.')
        .required('The email is required.'),
    password: Yup.string()
        .min(8, 'The password is too short'), // Firebase requires passwords to be ≥ 8 chars
    confirmPassword: Yup.string().when('password', {
        is: password => password.length > 0,
        then: Yup.string()
            .required('You need to confirm your password.')
            .oneOf([Yup.ref('password'), null], "Password doesn't match"),
    })
});

const Account = ({ firebase, editAccount, loading, error, loadingDelete, errorDelete, deleteUser, cleanUp }) => {

    useEffect(() => {
        return () => {
            cleanUp()
        }
    }, [cleanUp])

    const [modalOpened, setModalOpened] = useState(false)

    if(!firebase.profile.isLoaded) return null;
    return (
        <>
            <Formik
                initialValues={{
                    firstName: firebase.profile.firstName,
                    lastName: firebase.profile.lastName,
                    username: firebase.profile.username,
                    email: firebase.auth.email,
                    password: '',
                    confirmPassword: '',
                }}
                validationSchema={AccountSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    // edit the account here
                    editAccount(values)
                    setSubmitting(false)
                }}
            >
                {({ isSubmitting, isValid }) => (
                    <FormWrapper>
                        <Heading noMargin size="h1" /*color="gray"*/>
                            Edit your account
                        </Heading>
                        <Heading bold size="h4" /*color="gray"*/>
                            Change your account information and hit save
                        </Heading>
                        <StyledForm>
                            <Heading noMargin size="h4" /*color="gray"*/>First Name</Heading>
                            <Field 
                                type="text"
                                name="firstName"
                                placeholder="First name..."
                                component={Input}
                            />
                            <Heading noMargin size="h4" /*color="gray"*/>Last Name</Heading>
                            <Field 
                                type="text"
                                name="lastName"
                                placeholder="Last name..."
                                component={Input}
                            />
                            <Heading noMargin size="h4" /*color="gray"*/>Username</Heading>
                            <Field 
                                type="text"
                                name="username"
                                placeholder="Username..."
                                component={Input}
                            />
                            <Heading noMargin size="h4" /*color="gray"*/>Email Address</Heading>
                            <Field 
                                type="email"
                                name="email"
                                placeholder="Email..."
                                component={Input}
                            />
                            <Heading noMargin size="h4" /*color="gray"*/>New Password</Heading>
                            <Field
                                type="password"
                                name="password"
                                // placeholder="Password..."
                                component={Input}
                            />
                            <Heading noMargin size="h4" /*color="gray"*/>Confirm New Password</Heading>
                            <Field
                                type="password"
                                name="confirmPassword"
                                // placeholder="Confirm your password..."
                                component={Input}
                            />
                            <Button
                                disabled={!isValid || isSubmitting}
                                loading={loading ? 'Editing...' : null}
                                type="submit"
                            >
                                Save Changes
                            </Button>
                            <MessageWrapper>
                                <Message errorshow={error}>
                                    {error}
                                </Message>
                            </MessageWrapper>
                            <MessageWrapper>
                                <Message success show={error === false}>
                                    Profile was updated!
                                </Message>
                            </MessageWrapper>
                            <DeleteWrapper onClick={() => setModalOpened(true)}>
                                Delete my account
                            </DeleteWrapper>
                        </StyledForm>
                    </FormWrapper>
                )}
            </Formik>
            <Modal opened={modalOpened} close={() => setModalOpened(false)}>
                <Heading noMargin size="h1" /*color="gray"*/>
                    Delete your account
                </Heading>
                <Heading bold size="h4" /*color="gray"*/>
                    Do you really want to delete your account?
                </Heading>
                <ButtonsWrapper>
                    <Button 
                        contain
                        onClick={() => deleteUser()}
                        // color="mainLight"
                        color="red"
                        disabled={loadingDelete}
                        loading={loadingDelete ? 'Deleting...' : null}
                    >
                        Delete
                    </Button>
                    <Button color="mainLight" contain onClick={() => setModalOpened(false)}>
                        Cancel
                    </Button>
                </ButtonsWrapper>
                <MessageWrapper>
                    <Message error show={errorDelete}>
                        {errorDelete}
                    </Message>
                </MessageWrapper>
            </Modal>
        </>
    )
}

const mapStateToProps = ({firebase, auth}) => ({
    firebase,
    loading: auth.accountEdit.loading,
    error: auth.accountEdit.error,
    loadingDelete: auth.deleteUser.loading,
    errorDelete: auth.deleteUser.error,
})

const mapDispatchToProps = {
    editAccount: actions.editAccount,
    cleanUp: actions.clean,
    deleteUser: actions.deleteUser
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Account)