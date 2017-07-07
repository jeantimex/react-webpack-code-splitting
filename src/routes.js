/**
 * This file handles all routing and async loading of
 * split JavaScript files. The splitting of components
 * is based off the routes created in this file.
 */

// <Core /> is where our navigation and child components get passed through
import Core from './components/Core';

// throws an error in the console if the page wasn't able to load
function errorLoading(error) {
  throw new Error(`Dynamic page loading failed: ${error}`);
}

// Loading modules!
function loadRoute(cb) {
  return module => cb(null, module.default);
}

/**
 * This object we are exporting is the equivalent of:
 * <Route path="/" component={Core}>
 *   <IndexRoute component={Home}/>
 *   <Route path="about" component={About}/>
 *   <Route path="users" component={Users}>
 *   <Route path="*" component={Home}/>
 * </Route>
 */
export default {
  path: '/', // at index '/', the <Core /> component will be loaded
  component: Core,
  indexRoute: { // but we also want our indexRoute to load <Home />
    getComponent(location, cb) {
      System.import('./components/Home')
        .then(loadRoute(cb))
        .catch(errorLoading);
    },
  },
  childRoutes: [
    {
      path: 'about', // '/about' loads <Core /> with <About /> passed as a child
      getComponent(location, cb) {
        System.import('./components/About')
          .then(loadRoute(cb, false))
          .catch(errorLoading);
      },
    },
    {
      path: 'users', // '/users' loads <Core /> with <Users /> passed as a child
      getComponent(location, cb) {
        System.import('./components/Users')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
    },
    {
      path: '*', // fallback to <Home /> if the route isn't found
      getComponent(location, cb) {
        System.import('./components/Home')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
    },
  ],
};
