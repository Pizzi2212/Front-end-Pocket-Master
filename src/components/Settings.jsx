import user from '../user.webp'
import { FaPen } from 'react-icons/fa'

const Settings = () => {
  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div>
          <img src={user} className="user" width="90px" alt="" />
          <FaPen className="pen text-light fs-4" />
        </div>
      </div>
    </>
  )
}

export default Settings
