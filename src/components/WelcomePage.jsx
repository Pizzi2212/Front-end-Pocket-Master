import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import welcome from '../welcome.jpeg'
import logo from '../logomm.jpg'
function WelcomePage() {
  const [isLogin, setIsLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleSignInClick = () => {
    setIsLogin(true)
  }

  const validateFields = () => {
    let isValid = true

    setEmailError('')
    setPasswordError('')

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

  const handleRegister = (e) => {
    e.preventDefault()

    if (validateFields()) {
      console.log('User registered with email:', email)
      // logica per inviare i dati al server, se necessario
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()

    if (validateFields()) {
      console.log('User logged in with email:', email)
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center min-vh-100 welcome">
        <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
          <div className="card-body">
            <form onSubmit={isLogin ? handleLogin : handleRegister}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-describedby="emailHelp"
                />
                {emailError && <div className="text-danger">{emailError}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && (
                  <div className="text-danger">{passwordError}</div>
                )}
              </div>
              <div className="d-flex flex-column">
                <button
                  className="btn btn-primary mb-5"
                  type="submit"
                  disabled={!email || !password || emailError || passwordError}
                >
                  {isLogin ? 'Log In' : 'Register'}
                </button>
                <h6>
                  {isLogin
                    ? "Don't have an account?"
                    : 'Already have an account?'}
                </h6>
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Register' : 'Sign In'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default WelcomePage
