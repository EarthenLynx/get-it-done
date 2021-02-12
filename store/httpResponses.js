module.exports = {
  // HTTP 20X
  success: {
    ok: {
      status: 'success',
      message: 'OK',
    },

    created: {
      status: 'success',
      message: 'Item created',
    },
  },

  // HTTP 40X
  clientError: {
    userExists: {
      status: 'client-error',
      message: 'The username is already taken, please choose another',
    },

    notAuthorizedResource: {
      status: 'not-authorized',
      message: 'You are not permitted to access this resource',
    },

    notAuthorizedAction: {
      status: 'not-authorized',
      message: 'You are not permitted to perform this operation',
    },

    missingAuthHeaders: {
      status: 'client-error',
      message: 'The request did not contain a valid authentication token',
    },

    missingRequestBody: {
      status: 'client-error',
      message: 'The request did not contain a body',
    },

    // 404
    authNotFound: {
      status: 'not-found',
      message: 'User - password combination not found',
    },
  },

  // HTTP 50X
  serverError: {
    internalError: {
      status: 'internal-server-error',
      message: 'An unexpected error has occured, please try again later',
    },
  },
};
