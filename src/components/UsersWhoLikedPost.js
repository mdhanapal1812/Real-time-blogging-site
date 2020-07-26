import React from 'react'


const UsersWhoLikedPost = (props) => {



    const allUsers = props.data
    return allUsers.map((user) => {
        return (

            <div key={user}>
                <span style={{ fontStyle: "bold", color: "#ged" }}>
                    {user}

                </span>

            </div>

        )
    })

}
export default UsersWhoLikedPost