import { login, signUp } from '../services/authService.js';

export async function signUpHandler(req, res) {
  const { email, username, password } = req.body;
  const newUser = await signUp(email, username, password);
  res
    .status(201)
    .json({ message: `New user created with an id of ${newUser.id}` });
}

export async function loginHandler(req, res) {
  const { email, password } = req.body;
  const accessToken = await login(email, password);
  res.status(200).json({ accessToken });
}
