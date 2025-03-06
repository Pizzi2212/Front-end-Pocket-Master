import { b } from 'framer-motion/client'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const TeamComments = () => {
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem('token')
  const userId = useSelector((state) => state.auth.userId)

  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const API_URL = 'http://localhost:8080/api/comments'
  const bearer =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHJpbmciLCJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlhdCI6MTczOTg5MDI5MywiZXhwIjoxNzM5OTc2NjkzfQ.Citpq4uqNjuNbtQBgLcQh-CbSzttjHOlLrVdvsrQO-k'

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
        console.log('🟢 Commenti ricevuti:', data)
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
      console.error('❌ Error deleting comment with ID ${id}`:', error)
    }
  }

  return (
    <div>
      <h3>Public chat</h3>
      <ul>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment.id}>
              <strong>{comment.user.username}:</strong> {comment.content}
              <small> ({new Date(comment.createdAt).toLocaleString()})</small>
              {comment.user.id === userId && (
                <button onClick={() => handleDeleteComment(comment.id)}>
                  Delete
                </button>
              )}
            </li>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </ul>

      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write your opinions here..."
      />
      <button onClick={handleAddComment}>Express your opinions</button>
    </div>
  )
}

export default TeamComments
