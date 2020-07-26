import React, { useState, useEffect } from 'react'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { createComment } from '../graphql/mutations'

const CreateCommentPost = (props) => {

    const [commentOwnerId, setCommentOwnerId] = useState("");
    const [commentOwnerUsername, setCommentOwnerUsername] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        Auth.currentAuthenticatedUser().then(
            user => {
                setCommentOwnerId(user.attributes.sub);
                setCommentOwnerUsername(user.username);
            }
        )
    })


    const handleChangeContent = event => setContent(event.target.value)
    const handleAddComment = async event => {
        event.preventDefault()

        const input = {
            commentPostId: props.postId,
            commentOwnerId: commentOwnerId,
            commentOwnerUsername: commentOwnerUsername,
            content: content,
            createdAt: new Date().toISOString()
        }
        await API.graphql(graphqlOperation(createComment, { input }))

        setContent("")
    }



    return (
        <div >
            <form className="ui reply form"
                onSubmit={handleAddComment}>
                <div class="field">
                    <textarea
                        type="text"
                        name="content"
                        rows="1"
                        cols="5"
                        required
                        placeholder="Add Your Comment..."
                        value={content}
                        onChange={handleChangeContent} /> </div>


                <input
                    className="ui secondary button"
                    type="submit"

                    value="Add Comment" />

            </form>
        </div>

    )

}
export default CreateCommentPost