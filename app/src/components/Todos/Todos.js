import React from 'react';
import styled from 'styled-components';

// import Heading from 

const Wrapper = styled.div`
    width: 100%;
    aligh-self: flex-start;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    // min-height: calc(100vh - 6rem);
    bacground-color: white;
`;

const Todos = () => {
    return (
        <Wrapper>
            <h1>Your Todos</h1>
        </Wrapper>
    )
};

export default Todos;