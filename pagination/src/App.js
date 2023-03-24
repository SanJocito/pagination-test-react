import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'
import Posts from './components/Posts';
import Pagination from './components/Pagination';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); //halutaan aloittaa sivulta 1
  const [postsPerPage] = useState(10) //montako halutaan näyttää sivulla

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data)
      setLoading(false)
    }
   //console.log(posts)
    fetchPosts()
  }, []); //tyhjät [] pysäyttää iki loopin, koska useEffect muuten looppaa ikuisesti

  //get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)


  //sivun vaihto
  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <div className='container mt-5'>
      <h2 className="text-primary mb-3">testikeskus</h2>
      <Posts posts={currentPosts} loading={loading}></Posts>
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>
    </div>
  );
}

export default App;
