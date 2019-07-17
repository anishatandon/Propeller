import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { FormWrapper } from '../../hoc/layout/elements'
import Heading from '../UI/Heading'
import Button from '../UI/Button'
import Message from '../UI/Message'

import * as actions from '../../store/actions'

const MessageWrapper = styled.div`
    position: absolute;
    bottom: 0;
`;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
`

const VerifyEmail = ({ sendVerification, error, loading, cleanUp }) => {
    useEffect(() => {
        return() => {
            cleanUp();
        };
    }, [])
    
    return (
        <FormWrapper>
            <Wrapper>
                <Heading noMargin color="white" size="h1">
                    Verify your email
                </Heading>
                <Heading color="white" bold size="h4">
                    Go to your email inbox and please verify your email
                </Heading>
                <Button
                    loading={loading? 'Sending email...' : null}
                    disabled={loading}
                    onClick={() => sendVerification()}
                >
                    Re-send verification email
                </Button>
                <MessageWrapper>
                    <Message error show={error}>
                        {error}
                    </Message>
                </MessageWrapper>
                <MessageWrapper>
                    <Message success show={error === false}>
                        Message sent successfully
                    </Message>
                </MessageWrapper>
            </Wrapper>
        </FormWrapper>
    )
}

const mapStateToProps = ({ auth }) => ({
    loading: auth.verifyEmail.loading,
    error: auth.verifyEmail.error,
})

const mapDispatchToProps = {
    sendVerification: actions.verifyEmail,
    cleanUp: actions.clean,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VerifyEmail)