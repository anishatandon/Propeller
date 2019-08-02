import React, {useState} from 'react';
import styled from 'styled-components';
// import { compose } from '../../../../../../Library/Caches/typescript/3.5/node_modules/redux';

import BlockFriend from './BlockFriend2'
import SendTodoFriend from './SendTodoFriend'
import DeleteFriend from './DeleteFriend'
import AddFriend from './AddFriend'

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
    width:100%;
    display: flex;
    padding: 1rem;
    justify-content: center;
`;
  
const deleteStyles = {
    color: 'var(--color-errorRed)',
    margin: '0.5rem',
    cursor: 'pointer',
};

const blockStyles = {
    color: 'var(--color-errorRed)',
    margin: '0.5rem',
    cursor: 'pointer',
};

// const sendTodoStyles = {
//     color: 'var(--color-main)',
//     margin: '0.5rem',
//     cursor: 'pointer',
// };

const Friend = ({ friend }) => {
    const [isDeleting, setisDeleting] = useState(false)
    // const [isEditing, setIsEditing] = useState(false)
    const [isBlocking, setisBlocking] = useState(false)
    // const [isSendingTodo, setisSendingTodo] = useState(false)
    // console.log(isDeleting)
    console.log({isBlocking})

    return (
        <Wrapper>
            {friend.firstName} {friend.lastName}
            <Controls>
                <i
                    className="far fa-trash-alt"
                    style={deleteStyles}
                    onClick={() => setisDeleting(true)}
                />
                <i
                    className="fas fa-ban"
                    style={blockStyles}
                    onClick={() => setisBlocking(true)}
                />
                {/* <i
                    className="far fa-paper-plane"
                    style={sendTodoStyles}
                    onClick={() => setisSendingTodo(true)}
                /> */}
                <DeleteFriend
                    friend={friend}
                    show={isDeleting}
                    close={() => setisDeleting(false)}
                />
                <BlockFriend
                    friend={friend}
                    show={isBlocking}
                    close={() => setisBlocking(false)}
                />
                {/* <SendTodoFriend
                    friend={friend}
                    show={isSendingTodo}
                    onClick={() => setisSendingTodo(true)}
                /> */}
            </Controls>
        </Wrapper>
    )
}

// const mapStateToProps = ({ firebase, firestore, app }) => ({
//     allUsers: firestore.data.users,
//     requested: firestore.status.requested,
// })

// const mapDispatchToProps={}

// export default compose(
//     connect(mapStateToProps, mapDispatchToProps),
//     firestoreConnect(props => ["users/"]),
// )(Friend);

export default Friend