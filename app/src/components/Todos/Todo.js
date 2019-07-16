import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    padding: 4rem 3rem;
    background-color: var(--color-mainDark);
    box-shadow: 0rem .5rem 3.5rem var(--shadow);
    margin-bottom: 3rem;
    border-radius: 0.5rem;
    font-size: 1.4rem;
    font-weight: 700;
    text-align: center;
    color: var(--color-mainLight);
`;

const Todo = ({todo}) => {
    return (
        <Wrapper>
            {todo.todo}
        </Wrapper>
    )
}

export default Todo;
