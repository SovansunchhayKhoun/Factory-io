export const SearchAllTab = ({filteredUser}) => {
    return (
        <div>
          {filteredUser?.length === 0 && <p>empty</p>}
          {filteredUser?.map((user,key) => {
            return (
              <p key={key}>{user.username}</p>
            )
          })}
        </div>

    )
}
