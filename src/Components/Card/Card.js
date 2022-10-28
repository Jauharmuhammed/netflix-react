import React, { useEffect, useState } from 'react'
import './Card.css'
import axios from '../../axios'
import {imageUrl, API_KEY } from '../../Constants/Constants'
import YouTube from 'react-youtube'

function Card(props) {
  const [movie, setMovie] = useState([])
  const [YouTubeUrl, setYouTubeUrl] = useState('')
  useEffect(() => {
    axios.get(props.url).then(response=>{
      console.log(response.data);
      setMovie(response.data.results)
    }).catch(err=>{
      // alert('Error while loading')
    })
  },[])

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleMovie = (id)=>{
    console.log(id);
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
      console.log(response.data);
      if (response.data.results.length !== 0) {
        setYouTubeUrl(response.data.results[0])
      }else{
        console.log('Video is not available')
      }
    })
  }

  
  return (
    <div className='card-row'>
      <h4>{props.title}</h4>
      <div className="cards">
        {movie.map((obj)=>
          <img onClick={()=> handleMovie(obj.id)} src={`${imageUrl + obj.backdrop_path}`} alt="Movie Cover" className={ props.isLarge ? 'cover-large' : 'cover'} />
          
        )}
      </div>
      { YouTubeUrl && <YouTube opts={opts} videoId={YouTubeUrl.key}/> }
    </div>
  )
}

export default Card