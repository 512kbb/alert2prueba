export default function LogOut () {
  const handleLogOut = () => {
    localStorage.removeItem('loggedUser')
    window.location.reload()
  }
  return (
    <div>
      <button onClick={handleLogOut}>LogOut</button>
    </div>
  )
}