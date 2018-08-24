export function logoutUserAction() {
  return { type: 'LOGOUT' };
}

export function logInUserAction(foundUser) {
  return { type: 'LOGIN', payload: foundUser };
}
