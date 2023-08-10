import { useState } from "react";
import {
    useAddNewPostMutation,
    useDeletePostMutation,
    useGetPostsQuery,
    useUpdatePostMutation,

} from "../api/apiSlice";

const PostsList = () => {
    //////////////////////////////////////////////////////////////
    //? addNewPost
    const [addNewPost] = useAddNewPostMutation()

    //* useState for input field and inputHandler() Logic
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const [inputField, setInputField] = useState({
        id: '',
        title: '',
        body: '',
    })
    const onEditData = () => {
        updatePost({
            id: inputField.id,
            title: inputField.title,
            body: inputField.body,
        })
        setInputField(() => ({

            title: title,
            body: text,
        }))
    }
    //////////////////////////////////////////////////////////////
    //? what happens onSubmit ? 
    const onSubmit = (event) => {
        event.preventDefault()

        addNewPost({
            id: '',
            title: title,
            body: text
        })

        setTitle('')
        setText('')
    }
    //////////////////////////////////////////////////////////////
    const [updatePost] = useUpdatePostMutation()

    const setPostData = (data) => {
        console.log(data);
    }
    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////
    const [deletePost] = useDeletePostMutation()

    //////////////////////////////////////////////////////////////

    //? get Posts with custom hook
    const {
        data: posts,
        isLoading: isGetLoading,
        isSuccess: isGetSuccess,
        isError: isGetError,
        error: getError
    } = useGetPostsQuery({ refetchOnMountOrChange: true })

    //? Conditions to get posts content
    let postContent;
    if (isGetLoading) {
        postContent = (
            <div>
                <div>
                    <span>Loading ...</span>
                </div>
            </div>
        )
    } else if (isGetSuccess) {
        postContent = posts.map((item) => {
            return (
                <div key={item.id}>
                    <div>
                        <div>
                            <h5>{item.title}</h5>
                            <p>{item.body}</p>
                            <button onClick={() => deletePost(item.id)}>Remove</button>
                            <button onClick={() => setPostData(item)}>Edit</button>
                        </div>
                    </div>
                </div>
            )
        })
    } else if (isGetError) {
        postContent = (
            <div>{getError}</div>
        )
    }

    ////////////////////////////////////////////////////////////// 

    return (
        <div>
            <h1></h1>
            <form onSubmit={onSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Enter Title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        name="body"
                        rows="3"
                        placeholder="Enter Text"
                    >
                    </textarea>
                </div>
                <button type="submit">Post!</button>
                <button
                    onClick={onEditData}
                    type="button"
                >
                    Update
                </button>
            </form>
            <div>
                <div>{postContent}</div>
            </div>
        </div>
    )
}

export default PostsList