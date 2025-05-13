import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Client } from '../../../graphqlClient'

function ForgotPassword() {
    const [email,setEmail] = useState("")
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setError("")
        
        const FORGOT_PASSWORD_MUTATION = `
            mutation ForgotPassword($email: String!){
                sendPasswordResetEmail(email: $email){
                    success
                }
            }
        `
        try {
            setLoading(true)
            const response = await Client(FORGOT_PASSWORD_MUTATION, {email})
            
            if(response.data.sendPasswordResetEmail.success){
                setLoading(false)
                navigate('/')
            }
            
        } catch (error) {
           
           setError("This Email address is not authenticated") 
        }


    }


  return (
    <div className='login-container px-5 '>
        <h2 className="login-text">Forgot Password</h2>
        <form className='form mx-auto' onSubmit={handleForgotPassword} style={{zIndex: "99"}}>
        <div className="email-input-box">
            <label >Email</label>
            <input
              type="email"
              className="input-box"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              disabled={loading}
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className='login-button'>{loading? " Loading..":"Send"}</button>
        </form>
        <div className="box-div1"></div>
      <div className="box-div2"></div>
      <div className="box-div3"></div>
      <div className="triangle"></div>
      <div className="box-div5"></div>
    </div>
  )
}

export default ForgotPassword