import React, {useEffect, useState} from "react";
import PostList from '../components/PostList';
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostFilter from "../components/PostFilter";
import Loader from "../components/UI/Loader/Loader";
import PostForm from "../components/PostForm";
import Pagination from "../components/UI/pagination/Pagination";
import { useFetching } from '../hooks/useFetching';
import {getPageCount} from '../utils/pages'
import { usePosts } from '../hooks/usePosts';
import PostService from "../API/PostService";



function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [fetchPosts, isPostLoading, postError] = useFetching( async(limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit));
  })


  useEffect(() => {
    fetchPosts(limit, page)
  }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
    fetchPosts(limit, page)
  }

  return (
    <div className="App">
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
      <PostForm create={createPost}></PostForm>
      </MyModal>
      <hr style={{margin: '15px 0'}}></hr>
      <PostFilter filter={filter} setFilter={setFilter}></PostFilter>
      {postError && 
      <h1>Произошла ошибка ${postError}</h1>
      }
      {isPostLoading
      ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 40}}><Loader></Loader></div>
      : <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Список постов'></PostList>
      }
      <Pagination 
      page={page} 
      changePage={changePage} 
      totalPages={totalPages}></Pagination>
    </div>
  );
}

export default Posts;