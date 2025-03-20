import React from 'react'
import { Card } from 'react-bootstrap'
import community from '../community.png'

const Community = ({ allUsers }) => {
  return (
    <div className="d-flex justify-content-center mt-4">
      <Card
        className="shadow-lg"
        style={{
          maxWidth: '1100px',
          maxHeight: '600px',
          minHeight: '500px',
          width: '100%',
        }}
      >
        <Card.Header
          style={{
            borderRadius: '20px 20px 0 0',
          }}
          className="text-center"
        >
          <h2 className="mb-0">Community</h2>
        </Card.Header>

        <Card.Body
          className="d-flex flex-column"
          style={{
            flexGrow: 1,
            overflowY: 'auto',
            direction: 'column-reverse',
          }}
        >
          <h4 className="text-center">
            A big thank you to our Pokémon trainers:
          </h4>
          <table className="table table-bordered table-hover table-striped shadow-lg text-center">
            <thead className="table-primary">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Username</th>
                <th scope="col">Contact</th>
              </tr>
            </thead>
            <tbody>
              {allUsers && allUsers.length > 0 ? (
                allUsers.map((user, index) => (
                  <tr key={user.id || index} className="align-middle">
                    <th scope="row" className="fw-bold">
                      {user.id}
                    </th>
                    <td className="fw-semibold">{user.username}</td>
                    <td>{user.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-danger fw-bold">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card.Body>

        <Card.Footer>
          <div className="position-relative">
            <div className="d-lg-block d-none position-absolute start-50 top-50 translate-middle">
              <img width="280px" src={community} alt="" />
            </div>
          </div>
        </Card.Footer>
      </Card>
    </div>
  )
}

export default Community
