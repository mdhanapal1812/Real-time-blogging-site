import React, { useState, useEffect } from 'react'
import { API, graphqlOperation, Auth } from 'aws-amplify'
import { createPost } from '../graphql/mutations'

const CreatePost = () => {

    const [postOwnerId, setPostOwnerId] = useState("")
    const [postOwnerUsername, setPostOwnerUsername] = useState("")
    const [postTitle, setPostTitle] = useState("")
    const [postBody, setPostBody] = useState("")


    useEffect(() => {
        Auth.currentAuthenticatedUser().then(
            user => {
                setPostOwnerId(user.attributes.sub);
                setPostOwnerUsername(user.username);
            }
        )
    })

    const handleAddPost = async event => {
        event.preventDefault()

        const input = {
            postOwnerId: postOwnerId,
            postOwnerUsername: postOwnerUsername,
            postTitle: postTitle,
            postBody: postBody,
            createdAt: new Date().toISOString()
        }

        await API.graphql(graphqlOperation(createPost, { input }))
        setPostTitle("")
        setPostBody("")
    }



    return (
        <form className="add-post"
            onSubmit={handleAddPost} >

            <input style={{ font: '19px' }}
                type="text" placeholder="Title"
                name="postTitle"
                required
                value={postTitle}
                onChange={(event) => {
                    setPostTitle(event.target.value)
                }}
            />

            <textarea
                type="text"
                name="postBody"
                rows="3"
                cols="40"
                required
                placeholder="New Blog Post"
                value={postBody}
                onChange={(event) => {
                    setPostBody(event.target.value)
                }}
            />

            <input type="submit"
                className="btn"
                style={{ fontSize: '19px' }} />


        </form>
    )

}
export default CreatePost;