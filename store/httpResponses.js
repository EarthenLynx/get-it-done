module.exports = {
  // HTTP 40X
  clientError: {
    userExists: {
      status: 'client-error',
      message: 'The username is already taken, please choose another',
    },

    missingRequestBody: {
      status: 'client-error',
      message: 'The request did not contain a body'
    }
  },

  // HTTP 50X
  serverError: {
    internalError: {
      status: 'internal-server-error',
      message: 'An unexpected error has occured, please try again later',
    },
  },
};
