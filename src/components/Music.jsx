import React, { useState, useEffect } from 'react'

const Music = () => {
  const [musicData, setMusicData] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/api/music')
      .then((response) => response.json())
      .then((data) => setMusicData(data))
      .catch((error) => console.error('Error fetching musics:', error))
  }, [])

  return (
    <div>
      <ul>
        {musicData.map((music) => (
          <li className="list-group-item" key={music.id}>
            <div className="d-flex align-items-center mt-3">
              <iframe src={music.src} title={music.title}></iframe>
              <p className="ms-2">{music.title}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Music
