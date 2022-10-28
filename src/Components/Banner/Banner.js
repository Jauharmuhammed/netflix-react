import React, { useEffect, useState } from 'react'
import './Banner.css'
import axios from '../../axios'
import { API_KEY, imageUrl } from '../../Constants/Constants'

function Banner() {
  const [movie, setMovie] = useState()
  useEffect(() => {
    axios.get(`/trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
      setMovie(response.data.results[7])
    })
  }, [])
  return (
    <div className='banner'
    style={{backgroundImage:`url(${movie ? imageUrl+movie.backdrop_path : ''})`}} >
      <div className="content">
        <div className="banner-title"> { movie ? movie.title : ''}</div>
        <div className="banner-buttons">
          <button className='play-button'>Play</button>
          <button className='watchlist-button'>Watchlist</button>
        </div>
        <div className="banner-description">
          {movie ? movie.overview : ''}
        </div>
      </div>
      <div className="banner-gradient"></div>
    </div>
  )
}

export default Banner