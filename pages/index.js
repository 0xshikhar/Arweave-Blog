import { useState, useEffect } from 'react'
import { getContract } from '../configureWarpClient'
import reactMarkdown from 'react-markdown'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    readState()
  }, [])

  async function readState() {
    const contract = await getContract()
    try {
      const data = await contract.readState()
      console.log("Data:", data)
      const posts = Object.values(data.cachedValue.state.posts)
      setPosts(posts)
      console.log("Posts:", posts)
    }
    catch (err) {
      console.log({ err })
    }
  }

  return (
    <>
      <div style={containerStyle}>
        <h1 style={headingStyle}>Shikhar's Arweave Blog</h1>
        {
          posts.map((post, index) => (
            <div key={index} style={postStyle}>
              <p style={titleStyle}>{post.title}</p>
              <ReactMarkdown>
                {post.content}
              </ReactMarkdown>
            </div>
          ))
        }
      </div>

    </>
  )
}


const containerStyle = {
  width: '900px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start'
}

const headingStyle = {
  width: '300px',
  padding: '8px',
  fontSize: '18px',
  border: 'none',
  outline: 'none',
  marginBottom: '20px'
}


const postStyle = {
  width: '900px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start'
}


const titleStyle = {
  width: '900px',
  margin: '0 auto',
}

