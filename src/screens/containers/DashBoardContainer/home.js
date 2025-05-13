import React from 'react'

function Home() {

  const handleLogout = (e) => {

    e.preventDefault();
    const LOGOUT_MUTATION = `
      mutation 
    `
  }


  return (
    <div>
      {console.log(localStorage)
      }
      <h1> Welcome to Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home;