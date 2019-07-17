import React, {useState} from 'react';
import styled from 'styled-components';

import DeleteTodo from './DeleteTodo'
import InputTodo from './InputTodo'

const Wrapper = styled.div`
    z-index: 150;
    width: 100%;
    position: relative;
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

const Controls = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    padding: 1rem;
    justify-content: center;
`;

const editStyles = {
    color: 'var(--color-mainLight)',
    margin: '0 .5rem',
    cursor: 'pointer',
};
  
const deleteStyles = {
    color: 'var(--color-errorRed)',
    margin: '0 .5rem',
    cursor: 'pointer',
};


const Todo = ({ todo }) => {
    const [isDeleting, setisDeleting] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    console.log(isDeleting)

    return (
        <Wrapper>
            {todo.todo}
            <Controls>
                <i
                    className="far fa-edit"
                    style={editStyles}
                    onClick={() => setIsEditing(true)}
                />
                <i
                    className="far fa-trash-alt"
                    style={deleteStyles}
                    onClick={() => setisDeleting(true)}
                />
                <DeleteTodo
                    todo={todo}
                    show={isDeleting}
                    close={() => setisDeleting(false)}
                />
                <InputTodo
                    editTodo={todo}
                    opened={isEditing}
                    close={() => setIsEditing(false)}
                />
            </Controls>
        </Wrapper>
    )
}

export default Todo;
