import React, {useState} from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { firestoreConnect } from 'react-redux-firebase';

import Heading from '../UI/Heading';
import { Container } from '../../hoc/layout/elements';
import AddFriend from './AddFriend';
import Button from '../UI/Button'
import Loader from '../../components/UI/Loader';
import Friend from './Friend';

const Wrapper = styled.div`
    z-index: 0;
    width: 100%;
    align-self: flex-start;
    display: flex;
    height: 100%;
    min-height: calc(100vh - 6rem);
    background-color: var(--color-mainLight);
    max-width: 100%;
`;

const InnerWrapper = styled.div`
    z-index: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0rem 4rem;
    background-color: var(--color-mainLight);
    max-width: 100%;
`;

const Content = styled.div`
  z-index: 0;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 60rem;
  flex-direction: column;
  margin-top: 2rem;
  background-color: var(--color-mainLight);
`;

const Friends = ({friends, requesting, requested, userId}) => {
    const [isAdding, setIsAdding] = useState(false)
    let content;
    if (!friends) {
        content = (
            <Content>
                <Loader isWhite />
            </Content>
        );
    } else if (
        !friends[userId] && requested[`friends/${userId}`] ||
    //     friends[userId].length === 0
    // ) {
    //     console.log("else if")
        friends[userId].friends.length === 0
    ) {console.log("elif")
        content = (
            <Content>
                <Heading color='white' size='h2'>
                    Add friends to root for you!
                </Heading>
            </Content>
        );
    } else{
        console.log("else")
        content = (
            <Content>
                {friends[userId].friends
                    //making shallow copy
                    .slice(0)
                    //reverse ordering
                    .reverse()
                    .map(friend => (
                        <Friend key={friend.id} friend={friend}>{friend.username}</Friend>
                ))}
            </Content>
        )
    }
    return (
        <Wrapper>
            <Container>
                <InnerWrapper> 
                    <Heading noMargin bold size="h1" color="mainDark">
                        Your Friends
                    </Heading>
                    <AddFriend opened={isAdding} close={() => setIsAdding(false)}>
                        {content}
                    </AddFriend>
                </InnerWrapper>
            </Container>
        </Wrapper>
    )

};

const mapStateToProps = ({firebase, firestore}) => ({
    userId: firebase.auth.uid,
    friends: firestore.data.friends,
    requesting: firestore.status.requesting,
    requested: firestore.status.requested,
})

const mapDispatchToProps ={

}

export default compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firestoreConnect(props => [`friends/${props.userId}`])
  )(Friends);