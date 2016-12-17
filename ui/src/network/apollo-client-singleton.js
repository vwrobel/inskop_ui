import ApolloClient from 'apollo-client';
import cookie from 'react-cookie';
import ResponseMiddlewareNetworkInterface from './response-middleware-network-interface';
import log from '../log';

const responseMiddlewareNetworkInterface = new ResponseMiddlewareNetworkInterface();

// Sample error handling middleware
responseMiddlewareNetworkInterface.use({
  applyResponseMiddleware: (response, next) => {
    if (response.errors) {
      if (typeof window !== 'undefined') {
        log.error(JSON.stringify(response.errors));
        alert(`There was an error in your GraphQL request: ${response.errors[0].message}`);
      }
    }
    next();
  }
});

const networkInterface = responseMiddlewareNetworkInterface;


networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    // get the authentication token from local storage if it exists
    const idToken = cookie.load('idToken') || null;
    req.options.headers.authorization = `Bearer ${idToken}`;
    next();
  }
}]);


const ApolloClientSingleton = new ApolloClient({
  networkInterface,
  connectToDevTools: typeof window !== 'undefined',
  shouldBatch: true,
  dataIdFromObject: (o) => o.id
});
export default ApolloClientSingleton;
