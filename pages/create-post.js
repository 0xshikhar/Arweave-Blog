import { useState } from "react";
import { getContract } from "../configureWarpClient";
import { v4 as uuid } from 'uuid'
import { useRouter } from "next/router";

export default function CreatePostComponent() {
    const [post, updatePost] = useState({ title: '', content: '' })

    const router = useRouter() // redireting the pafe to index after writing the article

    async function createPost() { // call the warp contract 
        if (!post.title || !post.content) return
        post.id = uuid()
        const contract = await getContract()

        try {
            const result = await contract.writeInteraction({
                function: "createPost",
                post
            })
            console.log('results:', result)
            router.push('/')
        }
        catch (err) {
            console.log({ err })
        }
    }

    return (
        <div style={formContainerStyle}>
            <input
                value={post.title}
                placeholder="Post title"
                onChange={e => updatePost({ ...post, title: e.target.value })}
                style={inputStyle}
            />

            <textarea
                value={post.content}
                placeholder="Post Content"
                onChange={e => updatePost({ ...post, content: e.target.value })}
                style={inputStyle}
            />

            <button style={buttonStyle} onClick={createPost}>Create Post</button>
        </div>
    )
}

const formContainerStyle ={
    width: '900px',
    margin: '0 auto',
    display: 'flex',
    flexDirection:'column',
    alignItems: 'flex-start'
}

const inputStyle = {
    width: '300px',
    padding: '8px',
    fontSize: '18px',
    border: 'none',
    outline: 'none',
    marginBottom: '20px'
}

const textAreaStyle ={
    width: '100px',
    margin: '0 auto',
}

const buttonStyle ={
    width: '100px',
    margin: '0 auto',
}