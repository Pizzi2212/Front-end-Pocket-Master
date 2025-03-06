import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Card, Button, Form, InputGroup } from 'react-bootstrap'
import wallpaper1 from '../wallpaper1.jpg'
import wallpaper2 from '../wallpaper2.jpg'
import wallpaper3 from '../wallpaper3.jpg'
import wallpaper4 from '../wallpaper4.jpg'
import wallpaper5 from '../wallpaper5.jpg'
import { Modal } from 'react-bootstrap'

const MasterChat = () => {
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem('token')
  const userId = useSelector((state) => state.auth.userId)

  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const API_URL = 'http://localhost:8080/api/comments'
  const bearer =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHJpbmciLCJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlhdCI6MTczOTg5MDI5MywiZXhwIjoxNzM5OTc2NjkzfQ.Citpq4uqNjuNbtQBgLcQh-CbSzttjHOlLrVdvsrQO-k'
  const wallpaperChat = [
    wallpaper1,
    wallpaper2,
    wallpaper3,
    wallpaper4,
    wallpaper5,
  ]
  const [wallpaper, setWallpaper] = useState(wallpaper1)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const savedWallpaper = localStorage.getItem(`wallpaper_${userId}`)
    if (savedWallpaper) {
      setWallpaper(savedWallpaper)
    }
  }, [userId])

  const wallpaperChange = (selectedWallpaper) => {
    setWallpaper(selectedWallpaper)
    localStorage.setItem(`wallpaper_${userId}`, selectedWallpaper)
    setShowModal(false)
  }

  useEffect(() => {
    const fetchComments = async () => {
      if (!token) {
        console.error(' Token not found, unable to fetch comments.')
        return
      }

      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) throw new Error('Error fetching comments')

        const data = await response.json()
        setComments(data)
      } catch (error) {
        console.error('Error fetching comments:', error)
      }
    }

    fetchComments()
  }, [token])

  const handleAddComment = async () => {
    if (!newComment.trim()) return

    if (!token) {
      console.error('not token found, unable to add comment.')
      return
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          content: newComment,
        }),
      })

      if (response.ok) {
        const addedComment = await response.json()
        setComments([...comments, addedComment])
        setNewComment('')
      } else {
        console.error(' Error adding comment:', response.status)
      }
    } catch (error) {
      console.error(' Error adding comment:', error)
    }
  }

  const handleDeleteComment = async (id) => {
    if (!token) {
      console.error(' Not token found, unable to delete comment.')
      return
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${bearer}` },
      })

      if (!response.ok) {
        throw new Error(
          `Error ${response.status} deleting comment with ID ${id}`
        )
      }

      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== id)
      )
      console.log(` Comment with ID ${id} deleted.`)
    } catch (error) {
      console.error('Error deleting comment with ID ${id}`:', error)
    }
  }

  return (
    <div className="d-flex justify-content-center mt-5">
      <Card
        className="shadow-lg"
        style={{
          maxWidth: '1100px',
          maxHeight: '700px',
          width: '100%',
          backgroundImage: `url(${wallpaper})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Card.Header
          style={{
            backgroundColor: '  #a1c6f1',
            borderRadius: '20px 20px 0 0',
          }}
          className="text-white text-center"
        >
          <h2 className="mb-0">Master Chat</h2>
          <div className="position-relative">
            <div className="position-absolute top-0 start-100 translate-middle">
              <p
                onClick={() => setShowModal(true)}
                style={{ cursor: 'pointer', fontSize: '50px' }}
              >
                🎨
              </p>
            </div>
          </div>
        </Card.Header>

        <Card.Body
          className="d-flex flex-column"
          style={{ flexGrow: 1, overflowY: 'auto' }}
        >
          {comments.length > 0 ? (
            <ul className="list-unstyled d-flex flex-column">
              {comments.map((comment) => (
                <li
                  key={comment.id}
                  className="p-2 mb-2 rounded-3 d-inline-block"
                  style={{
                    maxWidth: '75%',
                    alignSelf:
                      comment.user.id === userId ? 'flex-end' : 'flex-start',
                    backgroundColor:
                      comment.user.id === userId ? '#a1c6f1' : '#FFFFFF',
                    textAlign: comment.user.id === userId ? 'right' : 'left',
                    border: '1px solid   #a1c6f1',
                  }}
                >
                  <div>
                    <div>
                      <small className="fw-bold">{comment.user.username}</small>
                      <small style={{ opacity: '40%' }}>
                        {' '}
                        ({comment.user.email})
                      </small>
                    </div>
                    <p className="mb-1">{comment.content}</p>
                    <small className="text-muted">
                      {new Date(comment.createdAt).toLocaleString()}
                    </small>
                  </div>
                  {comment.user.id === userId && (
                    <Button
                      style={{ backgroundColor: 'transparent', border: 'none' }}
                      className="mt-1"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      🗑️
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted">No comments yet.</p>
          )}
        </Card.Body>

        <Card.Footer className="bg-light">
          <InputGroup>
            <Form.Control
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your message..."
            />
            <Button
              style={{ backgroundColor: ' #a1c6f1' }}
              onClick={handleAddComment}
            >
              Send
            </Button>
          </InputGroup>
        </Card.Footer>
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Select a wallpaper</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-wrap justify-content-center">
              {wallpaperChat.map((wp, index) => (
                <img
                  key={index}
                  src={wp}
                  alt={`Wallpaper ${index}`}
                  className="m-2 border rounded"
                  style={{ width: '100px', height: '100px', cursor: 'pointer' }}
                  onClick={() => wallpaperChange(wp)}
                />
              ))}
            </div>
          </Modal.Body>
        </Modal>
      </Card>
    </div>
  )
}

export default MasterChat
