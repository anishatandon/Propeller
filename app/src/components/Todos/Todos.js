import React, {useState} from 'react';
import styled from 'styled-components';

import Heading from '../UI/Heading';
import { Container } from '../../hoc/layout/elements';
import AddTodo from './AddTodo.js';

const Wrapper = styled.div`
    width: 100%;
    aligh-self: flex-start;
    height: 100%;
    min-height: calc(100vh - 6rem);
    bacground-color: var(--olor-mainLight);
`;

const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5rem 4rem;
`;

const Todos = () => {
    return (
        <Wrapper>
            <Container>
                <InnerWrapper>
                    <Heading noMargin size="h1" color="white">
                        Your Todos
                    </Heading>
                    <Heading bold size="h4" color="white">
                        Let's get this bread
                    </Heading>
                    <AddTodo />
                </InnerWrapper>
            </Container>
        </Wrapper>
    )
};

export default Todos;