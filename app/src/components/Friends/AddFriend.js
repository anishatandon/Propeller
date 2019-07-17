import React from 'react';
import Heading from '../UI/Heading';
import { Formik } from "formik";
import * as Yup from 'yup';

const AddFriendSchema = Yup.object().shape({
    addFriend: Yup.string().required("Friend's username is required.")
})

const AddFriend = ({}) => {
    return (
        <>
        <Heading size="h1" color="mainDark">Add Friends</Heading>
        <Formik 
            initialValues={{friendUsername: ''}}
            validationSchema={AddFriendSchema}
            // onSubmit={

            // }
        >

        </Formik>
        </>
    )
}

export default AddFriend;