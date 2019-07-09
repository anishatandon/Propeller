import React from 'react';
import styled from 'styled-components';

const P = styled.p`
    font-weight: 700;
    font-size: 1.2rem;
    color: ${({error, success}) => {
        if(error) return 'red';
        if(success) return 'green';
        else return 'yellow';
    }};
    opacity: ${({show}) => (show ? '1' : '0')};
    transform: translateY(${({ show }) => (show ? '20px' : '0px')});
    transition: all 0.2s;
`

const Message = ({ children, error, success, show }) => {
    return (
        <P error={error} success={success} show={show}>
            {children}
        </P>
    )
}

export default Message;