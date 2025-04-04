import React, { useState } from 'react'
import Swal from 'sweetalert2'
import mew from '../mew.gif'
import welcomeBG from '../welcomeBG.webp'
import mewHello from '../mewHello.png'
import mewError from '../mewError.jpg'
import { jwtDecode } from 'jwt-decode'

function WelcomePage({ setUsername }) {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setLocalUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSignInClick = () => {
    setIsLogin(false)
  }

  const validateFields = () => {
    let isValid = true

    setUsernameError('')
    setEmailError('')
    setPasswordError('')

    if (!isLogin && !username.trim()) {
      setUsernameError('Please enter a username')
      isValid = false
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email')
      isValid = false
    }

    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters')
      isValid = false
    }

    return isValid
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    if (validateFields()) {
      try {
        const response = await fetch(
          'http://localhost:8080/api/users/register',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
          }
        )

        if (!response.ok) {
          throw new Error('Registration failed')
        }

        const data = await response.json()
        setUsername(data.username)

        Swal.fire({
          title: `Welcome, ${data.username}!`,
          text: 'Your Pokémon journey begins now!',
          imageUrl: mewHello,
          imageAlt: 'Mew Happy',
          confirmButtonText: 'OK',
          confirmButtonColor: '#5c7b99',
          background: '#f8f9fa',
        })

        setIsLogin(true)
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: error.message || 'Registration failed. Try again.',
          imageUrl: mewError,
          imageAlt: 'Mew Happy',
          confirmButtonText: 'OK',
        })
      }
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (validateFields()) {
      try {
        const response = await fetch('http://localhost:8080/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
          throw new Error('Invalid credentials')
        }

        const token = await response.text()
        localStorage.setItem('token', token)

        const decodedToken = jwtDecode(token)
        const userId = decodedToken.id

        const userResponse = await fetch(
          `http://localhost:8080/api/users/${userId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )

        if (!userResponse.ok) {
          throw new Error('Error retrieving user data')
        }

        const userData = await userResponse.json()
        setUsername(userData.username)

        Swal.fire({
          title: 'Login successful!',
          text: `Welcome, ${userData.username}! Your Pokémon journey begins now!`,
          confirmButtonText: 'OK',
        })

        window.location.href = '/home'
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: error.message || 'Error logging in',
          icon: 'error',
          confirmButtonText: 'OK',
        })
      }
    }
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-center min-vh-100 welcome">
        <div
          className="card"
          style={{
            width: '100%',
            maxWidth: '800px',
            maxHeight: '500px',
            opacity: '90%',
            backgroundImage: `url(${welcomeBG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            border: '2px solid #5c7b99',
          }}
        >
          <div className="card-body" style={{ padding: '2rem' }}>
            <form onSubmit={isLogin ? handleLogin : handleRegister}>
              {!isLogin && (
                <div className="mb-3">
                  <label
                    htmlFor="inputUsername"
                    className="form-label text-light"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputUsername"
                    value={username}
                    onChange={(e) => setLocalUsername(e.target.value)}
                    style={{
                      borderColor: '#A3B9D6',
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      borderRadius: '10px',
                    }}
                  />
                  {usernameError && (
                    <div className="text-danger">{usernameError}</div>
                  )}
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label text-light">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    borderColor: '#A3B9D6',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '10px',
                  }}
                />
                {emailError && <div className="text-danger">{emailError}</div>}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="inputPassword"
                  className="form-label text-light"
                >
                  Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    id="inputPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      borderColor: '#A3B9D6',
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      borderRadius: '10px 0 0 10px',
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      borderColor: '#A3B9D6',
                      backgroundColor: 'rgba(255,255,255,0.7)',
                      borderRadius: '0 10px 10px 0',
                    }}
                  >
                    {showPassword ? '🙈' : '👁'}
                  </button>
                </div>
                {passwordError && (
                  <div className="text-danger">{passwordError}</div>
                )}
              </div>
              <div className="d-flex flex-column">
                <button
                  className="btn btn-primary mb-5"
                  type="submit"
                  disabled={
                    !email ||
                    !password ||
                    emailError ||
                    passwordError ||
                    (!isLogin && !username)
                  }
                  style={{
                    backgroundColor: '#5c7b99',
                    borderColor: '#5c7b99',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    transition:
                      'background-color 0.3s ease, transform 0.3s ease',
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#4f6e84'
                    e.target.style.transform = 'scale(1.05)'
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#5c7b99'
                    e.target.style.transform = 'scale(1)'
                  }}
                >
                  {isLogin ? 'Log In' : 'Register'}
                </button>
                <h4 className="text-light text-center">
                  {isLogin
                    ? "Don't have an account?"
                    : 'Already have an account?'}
                </h4>
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseOver={(e) => (e.target.style.color = 'blue')}
                  onMouseOut={(e) => (e.target.style.color = 'white')}
                >
                  {isLogin ? 'Register' : 'Sign In'}
                </button>
              </div>
              <div className="position-relative">
                <div className="position-absolute top-100 start-0 translate-middle">
                  <img src={mew} width="150px" alt="mew" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default WelcomePage
