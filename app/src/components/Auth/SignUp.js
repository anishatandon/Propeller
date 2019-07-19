import React, {useEffect} from 'react';
import { connect } from 'react-redux'
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components'

import { FormWrapper, StyledForm } from '../../hoc/layout/elements';
import Input from '../UI/Input';
import Button from '../UI/Button';
import Heading from '../UI/Heading'
import Message from '../UI/Message';

import * as actions from '../../store/actions';

const MessageWrapper = styled.div`
    position: absolute;
    bottom: 0;
`;

const SignUpSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('Your first name is required'),
    lastName: Yup.string() 
        .required('Your last name is required'),
    username: Yup.string()
        .required('Username is required.')
        .trim('Username cannot have whitespace')
        .strict(true).lowercase('Username needs to be lowercase'),
    email: Yup.string()
        .email('Invalid email.')
        .required('The email is required.'),
    password: Yup.string()
        .required('The password is required.')
        .min(8, 'The password is too short'), // Firebase requires passwords to be ≥ 8 chars
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Password doesn't match")
        .required('You need to confirm your password.'),
});

const SignUp = ({ signUp, loading, error, cleanUp }) => {
    useEffect(() => {
        return () => {
            cleanUp();
        };
    }, [cleanUp]);

    return(
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
            }}
            validationSchema={SignUpSchema}
            onSubmit={async (values, { setSubmitting }) => {
                await signUp(values)
                setSubmitting(false)
            }}
        >
            {({ isSubmitting, isValid }) => (
                <FormWrapper>
                    <Heading noMargin size="h1" color="white">
                        Sign up for an account
                    </Heading>
                    <Heading bold size="h4" color="white">
                        Fill in your details to register your account
                    </Heading>
                    <StyledForm>
                        <Field 
                            type="text"
                            name="firstName"
                            placeholder="First name..."
                            component={Input}
                        />
                        <Field 
                            type="text"
                            name="lastName"
                            placeholder="Last name..."
                            component={Input}
                        />
                        <Field 
                            type="text"
                            name="username"
                            placeholder="Username..."
                            component={Input}
                        />
                        <Field 
                            type="email"
                            name="email"
                            placeholder="Email..."
                            component={Input}
                        />
                        <Field
                            type="password"
                            name="password"
                            placeholder="Password..."
                            component={Input}
                        />
                        <Field
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password..."
                            component={Input}
                        />
                        <Button
                            disabled={!isValid || isSubmitting}
                            loading={loading ? 'Signing up...' : null}
                            type="submit"
                        >
                            Sign up
                        </Button>
                        <MessageWrapper>
                            <Message errorshow={error}>
                                {error}
                            </Message>
                        </MessageWrapper>
                    </StyledForm>
                </FormWrapper>
            )}
        </Formik>
    );
};

const mapStateToProps = ({auth}) => ({
    loading: auth.loading,
    error: auth.error,
})

const mapDispatchToProps = {
    signUp: actions.signUp,
    cleanUp: actions.clean,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);