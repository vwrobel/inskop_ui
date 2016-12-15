  const SERVER_ADDRESS = process.env.SERVER_ADDRESS;

  const fileTransferApi = (payload) => {
    const { authenticated, token, endpoint, body, contentType, method } = payload;

    let config = {};

    if (authenticated) {
      if (token) {
        config = {
          method,
          headers: {
            'Content-Type': contentType,
            Authorization: `Bearer ${token}`
          },
          body
        };
      } else {
        throw new Error('No token saved!');
      }
    }

    return fetch(`${SERVER_ADDRESS}/api/rest/v1/${endpoint}`, config)
      .then((response) =>
        response.text().then((text) => ({ text, response }))
      ).then(({ text, response }) => {
        if (!response.ok) {
          return Promise.reject(text);
        }
        return text;
      }).catch((err) => console.log(err));
  };


  export const FILE_TRANSFER_API = Symbol('FILE_TRANSFER_API');

  export default () => (next) => (action) => {
    const fileTransferApiAction = action[FILE_TRANSFER_API];

    if (typeof fileTransferApiAction === 'undefined') {
      return next(action);
    }

    const { payload, types } = fileTransferApiAction;

    const [, successType, errorType] = types;

    return fileTransferApi(payload).then(
      (response) =>
        next({
          type: successType,
          payload: {
            text: response,
            message: 'ok'
          }
        }),
      (error) => next({
        type: errorType,
        payload: {
          error: error.message || 'There was an error.'
        }
      })
    );
  };
