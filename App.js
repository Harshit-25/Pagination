import React,{useState,useEffect} from 'react';
import Posts from './Components/Posts';
import Pagination from './Components/Pagination';
import './App.css';
import axios from 'axios';

function App() {
  const [loading,setLoading]=useState(false);
  const [posts,setPosts]=useState([]);
  const [currentPage,setCurrenPage]=useState(1);
  const [postPerPage,setPostperPage]=useState(10);

  useEffect(()=>{
    const fetchPosts=async()=>{
      setLoading(true);
      const res=await axios.get('https://jsonplaceholder.typicode.com/posts')
      setPosts(res.data);
      setLoading(false);
    }

    fetchPosts();
  },[])

  const indexOfLastPost=currentPage*postPerPage;
  const indexOfFirstPost=indexOfLastPost-postPerPage;
  const currentPosts=posts.slice(indexOfFirstPost,indexOfLastPost);

  const paginate=(page)=>setCurrenPage(page);
 
  return (
    <div className="container mt-2">
      <h1 className="text-success mb-3">My Blog</h1>
      <Posts posts={currentPosts} loading={loading}/>
      <Pagination postsPerPage={postPerPage} totalPosts={posts.length} paginate={paginate}/>
    </div>
  );
}

export default App;
