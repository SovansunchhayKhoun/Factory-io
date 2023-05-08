import { useAuthContext } from "../context/AuthContext"

export const UserView = () => {

  const {user} = useAuthContext()
  
  console.log(user)
  return (
    <div>
      <h1>
      dsaf
    </h1>
    </div>

  )
}
