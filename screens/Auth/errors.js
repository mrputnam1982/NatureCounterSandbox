const errors = {
  'auth/invalid-email': 'Please enter valid email address or password.',
  'auth/email-already-in-use':
    'The email address is already in use by another account.',
  'auth/weak-password': 'The password is too weak.',
  'auth/user-not-found':
    'There is no user record corresponding to this identifier. The user may have been deleted.',
  'auth/wrong-password': 'The password is invalid.',
  'auth/user-disabled': 'The user has been disabled.',
  'auth/account-exists-with-different-credential': 'There is already another account associated with the same email address.',
};

export default errors;
