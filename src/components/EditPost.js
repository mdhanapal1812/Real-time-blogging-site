import React, { useEffect, useState } from 'react'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { updatePost } from '../graphql/mutations'


const EditPost = (props) => {

    const [show, setShow] = useState(false);
    const [postOwnerId, setPostOwnerId] = useState("");
    const [postOwnerUsername, setPostOwnerUsername] = useState("");
    const [postData, setPostData] = useState(
        {
            postTitle: props.postTitle,
            postBody: props.postBody
        }
    )

    const handleModal = () => {
        setShow(!show)
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    }

    const handleUpdatePost = async (event) => {
        event.preventDefault()

        const input = {
            id: props.id,
            postOwnerId: postOwnerId,
            postOwnerUsername: postOwnerUsername,
            postTitle: postData.postTitle,
            postBody: postData.postBody

        }

        await API.graphql(graphqlOperation(updatePost, { input }))

        //force close the modal 
        setShow(!show)

    }

    const handleTitle = event => {
        setPostData({ ...postData, postTitle: event.target.value })
    }

    const handleBody = event => {
        setPostData({ ...postData, postBody: event.target.value })
    }

    useEffect(() => {
        Auth.currentAuthenticatedUser().then(
            user => {
                setPostOwnerId(user.attributes.sub);
                setPostOwnerUsername(user.username);
            }
        )
    })

    return (
        <>
            {show && (
                <div className="modal">
                    <button className="close"
                        onClick={handleModal}>
                        X
                      </button>

                    <form className="add-post"
                        onSubmit={(event) => handleUpdatePost(event)}>

                        <input style={{ fontSize: "19px" }}
                            type="text" placeholder="Title"
                            name="postTitle"
                            value={postData.postTitle}
                            onChange={handleTitle} />

                        <input
                            style={{ height: "150px", fontSize: "19px" }}
                            type="text"
                            name="postBody"
                            value={postData.postBody}
                            onChange={handleBody}
                        />

                        <button class="small ui blue button">Update Post</button>


                    </form>


                </div>
            )
            }



            <button class="small ui blue button" onClick={handleModal}>Edit</button>
        </>


    )

}

export default EditPost;