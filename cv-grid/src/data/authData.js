export const loginForm = {
  eyebrow: 'LOGIN / SECURE ACCESS',
  title: 'RETURN TO YOUR\nCV SYSTEM.',
  inverse: false,
  fields: [
    { id: 'email', label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'name@company.com' },
    { id: 'password', label: 'Password', type: 'password', autoComplete: 'current-password', placeholder: '••••••••' },
  ],
  submitLabel: 'Login',
  alternatePrompt: 'No account yet?',
  alternateLabel: 'Register for CV/Grid.',
  alternateTo: '/signup',
}

export const signupForm = {
  eyebrow: 'REGISTER / NEW SYSTEM',
  title: 'BUILD A BETTER\nCV LOOP.',
  inverse: true,
  fields: [
    { id: 'fullName', label: 'Name', type: 'text', autoComplete: 'name', placeholder: 'Gargeek Nama' },
    { id: 'email', label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'name@company.com' },
    { id: 'password', label: 'Password', type: 'password', autoComplete: 'new-password', placeholder: 'Minimum 8 characters' },
  ],
  submitLabel: 'Create account',
  alternatePrompt: 'Already registered?',
  alternateLabel: 'Login to continue.',
  alternateTo: '/login',
}