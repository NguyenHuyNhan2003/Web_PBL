import React, { useState } from 'react'
import './details.css'

import img from '../../css/assets/images/b5.jpg'
import { BsPencilSquare } from 'react-icons/bs'
import { AiOutlineDelete } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { blog } from '../../css/assets/data/data'

export default function DetailsBlog() {
  const { id } = useParams()
  const [blogs, setBlogs] = useState(null)

  useEffect(() => {
    let blogs = blog.find((blogs) => blogs.id === parseInt(id))
    if (blogs) {
      setBlogs(blogs)
    }
  }, [])

  return (
    <>
      {blogs ? (
        <section className='singlePage'>
          <div className='container'>
            <div className='left'>
              <img src={blogs.cover} alt='' />
            </div>
            <div className='right'>
              <div className='buttons'>
                <button className='button'>
                  <BsPencilSquare />
                </button>
                <button className='button'>
                  <AiOutlineDelete />
                </button>
              </div>
              <h1>{blogs.title}</h1>
              <p>{blogs.desc}</p>
              <p>        
              </p>
              <p>Author: Sunil</p>
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
