import AuthForm from '../../components/AuthForm/AuthForm'
import { signupForm } from '../../data/authData'

function Signup() {
  return <AuthForm config={signupForm} />
}

export default Signup