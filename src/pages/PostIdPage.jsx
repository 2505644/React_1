import React, { useEffect, useState  } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching'
import Loader from '../components/UI/Loader/Loader'
import PostService from '../API/PostService';
const PostIdPage = () => {
  const params = useParams()
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async (id) =>{
    const response = await PostService.getById(id)
    setPost(response.data);
  })
  const [fetchComments, isComLoading, comError] = useFetching(async (id) =>{
    const response = await PostService.getCommentsByPostId(id)
    setComments(response.data);
  })
  useEffect(() => {
    fetchPostById(params.id)
    fetchComments(params.id)
  },[])
  return (
    <div>
      <h1>Вы открыли страницу поста c ID = {params.id}</h1>
      {isLoading
      ? <Loader></Loader>
      :<h3 style={{marginTop: 12}}>{post.id}. {post.title}</h3> 
      }
      <h3 style={{marginTop: 15}}>{post.body} </h3>
      <h1 style={{marginTop: 40}}>Комментарии</h1>
      <h3>{isComLoading
      ? <Loader></Loader>
      : <div>{comments.map(comm => 
        <div style={{marginTop: 12}}> 
          <h4>{comm.email}</h4>
          <div>{comm.body}</div>
        </div>
        )}</div>
      }
      </h3>
    </div>
  )
}

export default PostIdPage

