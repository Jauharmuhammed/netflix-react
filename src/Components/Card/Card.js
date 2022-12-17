import React, { useEffect, useState } from 'react'
import './Card.css'
import axios from '../../axios'
import { imageUrl, API_KEY } from '../../Constants/Constants'
import YouTube from 'react-youtube'

function Card(props) {
  const [movie, setMovie] = useState([])
  const [YouTubeUrl, setYouTubeUrl] = useState('')
  useEffect(() => {
    axios.get(props.url).then(response => {
      console.log(response.data);
      setMovie(response.data.results)
    }).catch(err => {
      // alert('Error while loading')
    })
  }, [])

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleMovie = (id) => {
    console.log(id);
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response => {
      console.log(response.data);
      if (response.data.results.length !== 0) {
        setYouTubeUrl(response.data.results[0])
      } else {
        console.log('Video is not available')
      }
    })
  }


  return (
    <div className='card-row'>
      <h4>{props.title}</h4>
      <div className="cards">
        {movie.map((obj) =>
          <div  className={props.isLarge ? 'item-large' : 'item'} key={obj.id} hidden={!obj.backdrop_path}>
            <img  src={`${imageUrl + obj.backdrop_path}`} alt="Movie Cover"  />
            <div className="detail">
              <div className="title">{obj.title ? obj.title : obj.name}</div>
              <div className="rating">{obj.vote_average}</div>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="M128 224a7.8 7.8 0 0 1-3.9-1C119.8 220.6 20 163.9 20 92a60 60 0 0 1 108-36a60 60 0 0 1 108 36c0 30.6-17.7 62-52.6 93.4a314.3 314.3 0 0 1-51.5 37.6a7.8 7.8 0 0 1-3.9 1Zm-3.9-15ZM80 48a44 44 0 0 0-44 44c0 55.2 74 103.7 92 114.7c18-11 92-59.5 92-114.7a44 44 0 0 0-84.6-17a8 8 0 0 1-14.8 0A43.8 43.8 0 0 0 80 48Z"/></svg>
              <div className="gradient"></div>
            </div>
          </div>

        )}
      </div>
      {YouTubeUrl && <YouTube opts={opts} videoId={YouTubeUrl.key} />}
    </div>
  )
}

export default Card