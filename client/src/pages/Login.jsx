import { useState, useContext } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { useLocation } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { auth, setAuth } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("http://localhost:8080/api/v1/auth/login", { email, password })
      if (data.success) {
        toast.success(data.message)
        setAuth({ ...auth, user: data.user, token: data.token })
        localStorage.setItem("auth", JSON.stringify(data))
        navigate(location.state || "/")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Login failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-md border">
        <h2 className="text-2xl font-bold text-center mb-6 text-pink-600">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have an account? <a href="#" className="text-pink-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  )
}

export default Login