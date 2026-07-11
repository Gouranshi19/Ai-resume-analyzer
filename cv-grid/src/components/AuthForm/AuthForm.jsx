import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { loginUser, registerUser } from "../../services/authService";
import "./AuthForm.css";

function AuthForm({ config }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({})
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextErrors = {};
    config.fields.forEach(({ id, label, type }) => {
      const value = formData.get(id)?.trim();
      if (!value) nextErrors[id] = `${label} is required.`;
      if (type === 'email' && value && !/^\S+@\S+\.\S+$/.test(value)) nextErrors[id] = 'Enter a valid email address.' });
      setErrors(nextErrors)
    }
  return <section className="auth-page"><div className={`auth-panel${config.inverse ? ' auth-panel--inverse' : ''}`}>
    <div className="auth-panel__intro">
      <p>{config.eyebrow}</p>
      <h1>{config.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h1>
    </div>
    <form noValidate onSubmit={handleSubmit}>
      {
        config.fields.map(({ autoComplete, id, label, placeholder, type }) => <div className="auth-field" key={id}>
          <label htmlFor={id}>{label}</label>
          <input aria-invalid={Boolean(errors[id])} autoComplete={autoComplete} id={id} name={id} placeholder={placeholder} type={type} />{errors[id] && <small role="alert">{errors[id]}</small>}</div>)}
          <Button className="auth-submit" type="submit">{config.submitLabel}</Button><p className="auth-alternate">{config.alternatePrompt} 
            <Link to={config.alternateTo}>{config.alternateLabel}</Link></p></form></div></section>
}

export default AuthForm