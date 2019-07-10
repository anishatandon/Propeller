import React, { useEffect } from 'react'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import * as actions from '../../../store/actions'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { FormWrapper, StyledForm } from '../../../hoc/layout/elements'
import Input from '../../../components/UI/Input'
import Button from '../../../components/UI/Button'
import Heading from '../../../components/UI/Heading'
import Message from '../../../components/UI/Message'

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 0;
`

const SigninSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email.')
      .required('The email is required.'),
    password: Yup.string()
      .required('The passoword is required.')
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
            await signin(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, isValid }) => (
            <FormWrapper>
              <h1>
                Sign in to your account
              </h1>
              <h4>
                Fill in your details to sign in to your account
              </h4>
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