import AuthForm from '../../components/AuthForm/AuthForm'
import { loginForm } from '../../data/authData'

function Login() {
  return <AuthForm config={loginForm} />
}

export default Login