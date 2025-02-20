import React from 'react'
import welcome from '../welcome.jpeg'
import { useLocation } from 'react-router-dom'

function WelcomePage() {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 welcome">
      <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="d-flex flex-column">
              <button className="btn btn-primary mb-5">Register</button>
              <h6>Already have an account?</h6>
              <button className="btn btn-primary">Sign in</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage
