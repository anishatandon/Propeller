import React, {useEffect} from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import { FormWrapper, StyledForm } from '../../../hoc/layout/elements';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import Message from '../../UI/Message';

import * as actions from '../../../store/actions';

const SignUpSchema = Yup.object().shape({
    firstName: Yup.string()
    .required('Your first name is required'),
    lastName: Yup.string() 
    .required('Your last name is required'),
    username: Yup.string()
    .required('Username is required.')
    // .trim('Username cannot have whitespace') // not working. trying to not use this for validation instead just automatically remove whitespace
    .strict(true).lowercase('Username needs to be lowercase'),
    email: Yup.string()
    .email('Invalid email.')
    .required('The email is required.'),
    password: Yup.string().required('The password is required.').min(8, 'The password is too short'), // Firebase requires passwords to be ≥ 8 chars
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
                console.log(values);
                await signUp(values)
                setSubmitting(false)
            }}
        >
            {({ isSubmitting, isValid }) => (
                <FormWrapper>
                    <h1>Sign Up for a New Account</h1>
                    <StyledForm>
                        <Field 
                            type="text"
                            name="firstName"
                            placeholder="Your first name"
                            component={Input}
                        />
                        <Field 
                            type="text"
                            name="lastName"
                            placeholder="Your last name"
                            component={Input}
                        />
                        <Field 
                            type="text"
                            name="username"
                            placeholder="Your username"
                            component={Input}
                        />
                        <Field 
                            type="email"
                            name="email"
                            placeholder="Your email"
                            component={Input}
                        />
                        <Field
                            type="password"
                            name="password"
                            placeholder="Your password"
                            component={Input}
                        />
                        <Field
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            component={Input}
                        />
                        <Button disabled={!isValid || isSubmitting } loading={loading ? 'Signing Up' : null }type="submit">
                            Sign Up
                        </Button>
                        <Message error show={error}>{error}</Message>
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



export default connect(mapStateToProps, mapDispatchToProps)(SignUp);