import React, {useState} from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components'; 
import { connect } from 'react-redux';

import Button from '../UI/Button';
import Heading from '../UI/Heading';
import Modal from '../UI/Modal';
import Input from '../UI/Input';
import Message from '../UI/Message';
import {StyledForm} from '../../hoc/layout/elements';

import * as actions from'../../store/actions';

const ButtonsWrapper = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 2rem;
    justify-content: space-around;
    max-width: 100%;
`;

const MessageWrapper = styled.div`
    position: absolute;
    bottom: 0rem;
    width: 100%;
    padding: 0 3rem; 
    max-width: 100%;
`;
const FriendSchema = Yup.object().shape({
    friend: Yup.string()
        // .email('Invalid email')
        .required('The friend username is required.'),
});

const AddFriend = ({
    addFriend,
    loading,
    error
}) => {
    const [isOpened, setisOpened] = useState(false)
    return (
        <>
            <Button color="mainDark" contain onClick={() => setisOpened(true)}>
                Add Friend
            </Button>
            <Modal opened={isOpened} close={() => setisOpened(false)}>
                <Heading noMargin size="h1" color="white">
                    Send friend request
                </Heading>
                <Heading bold size="h4" color="white">
                    Type in friend's username and send friend request
                </Heading>
                    <Formik
                        initialValues={{
                            friend: '',
                        }}
                    validationSchema={FriendSchema}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        // add our friend
                        const res = await addFriend(values)
                        setSubmitting(false);
                        if (res) {
                            setisOpened(false);
                        }
                        resetForm();
                    }}
                    >
                    {({ isSubmitting, isValid, resetForm }) => (
                        <StyledForm>
                            <Field
                            type="text"
                            name="friend"
                            placeholder="Add a friend by entering their username"
                            component={Input}
                            />
                            <ButtonsWrapper>
                                <Button
                                    contain
                                    color="mainDark"
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                    loading={loading ? 'Adding...' : null}
                                >
                                    Send friend request
                                </Button>
                                <Button
                                    type="button"
                                    color="mainLight"
                                    contain
                                    onClick={() => {
                                        setisOpened(false);
                                        // close();
                                        // resetForm();
                                    }}
                                >
                                    Cancel
                                </Button>
                            </ButtonsWrapper>
                            <MessageWrapper>
                            <Message error show={error}>
                                {error}
                            </Message>
                            </MessageWrapper>
                        </StyledForm>
                    )}
                    </Formik>
            </Modal>
        </>
    )
}

const mapStateToProps = ({friends}) => ({
    loading: friends.loading,
    error: friends.error,
})

const mapDispatchToProps = {
    addFriend: actions.addFriend,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFriend);
