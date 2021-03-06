import React, { useEffect } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { FormWrapper, StyledForm } from '../../hoc/layout/elements';
import Input from '../UI/Input';
import Button from '../UI/Button';
import Heading from '../UI/Heading';
import Message from '../UI/Message';

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 0;
`;

const SigninSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email.')
      .required('The email is required.'),
    password: Yup.string()
      .required('The password is required.')
      .min(8, 'Too short.'),
})

const Signin = ({ signin, loading, error, cleanUp }) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={SigninSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await signin(values)
        setSubmitting(false)
      }}
    >
      {/* onSubmit={async (values, { setSubmitting }) => {
        console.log(values)
        await signin(values);
        setSubmitting(false);
      }}
    > */}
      {({ isSubmitting, isValid }) => (
        <FormWrapper>
          <Heading noMargin size="h1" color="white">
            Sign in to your account
          </Heading>
          <Heading bold size="h4" color="white">
            Fill in your details to sign in to your account
          </Heading>
          <StyledForm>
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
            <Button
              disabled={!isValid || isSubmitting}
              loading={loading ? 'Signing in...' : null}
              type="submit"
              color='mainDark'
            >
              Sign In
            </Button>
            <MessageWrapper>
              <Message error show={error}>
                {error}
              </Message>
            </MessageWrapper>
          </StyledForm>
        </FormWrapper>
      )}
    </Formik>
  );
};
    
const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
  error: auth.error,
});
    
const mapDispatchToProps = {
  signin: actions.signIn,
  cleanUp: actions.clean,
};
    
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signin);