import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

import Modal from '../UI/Modal'
import Button from '../UI/Button'
import Heading from '../UI/Heading'
import Message from '../UI/Message'
import * as actions from '../../store/actions'
import friendsReducer from '../../store/reducers/friendsReducer';

const ButtonsWrapper = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 2rem;
    justify-content: space-around;
    max-width: 100%;
`;

const FriendWrapper = styled.div`
    margin: 1rem 0 rem;
    font-size: 1.3rem;
    text-align: center;
    color: var(--color-white);
    max-width: 100%;
`;

const MessageWrapper = styled.div`
    position: absolute;
    bottom: 2rem;
    width: 100%;
    padding: 0 3rem;
    max-width: 100%;
`;


const DeleteFriend = ({show, close, friend, deleteFriend, error, loading}) => {
    return (
        <Modal opened={show} close={close}>
            <Heading noMargin size="h1" color="white">
                Delete Friend
            </Heading>
            <Heading bold size="h4" color="white">
                Are you sure you want to remove this friend?
            </Heading>
            <FriendWrapper>
                {friend.friend}
            </FriendWrapper>
            <ButtonsWrapper>
                <Button
                    contain
                    color="red"
                    onClick={() => deleteFriend(friend.username)}
                    disabled={loading}
                    loading={loading ? 'Deleting...' : null}
                >
                    Delete
                </Button>
                <Button color="mainLight" contain onClick={close}>
                    Cancel
                </Button>
            </ButtonsWrapper>
            <MessageWrapper>
                <Message error show={error}>
                    {error}
                </Message>
            </MessageWrapper>
        </Modal>
    )
}

const mapStateToProps = ({friends}) => ({
    error: friends.deleteFriend.error,
    loading: friends.loading
})

const mapDispatchToProps = {
    deleteFriend: actions.deleteFriend,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteFriend)