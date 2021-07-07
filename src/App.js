import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LanguageProvider } from 'uselanguage';

import { ToastProvider } from 'react-toast-notifications';

import languages from './lang';
import useGithubToken from './widgets/GithubDashboard/useToken';
import Loading from './component/Loading';
// import 'animate.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
const Home = lazy(() => import(/* webpackChunkName: "page.home" */ './page/Home'));
const Widget = lazy(() => import(/* webpackChunkName: "page.widget" */ './page/Widget'));
const Authing = lazy(() => import(/* webpackChunkName: "page.authing" */ './page/Authing'));
const UserPortal = lazy(() =>
  import(/* webpackChunkName: "page.userPortal" */ './page/UserPortal')
);
const UserPortalWidget = lazy(() =>
  import(/* webpackChunkName: "page.userPortal.widget" */ './page/UserPortal/widget')
);
const OAuth = lazy(() => import(/* webpackChunkName: "page.oauth" */ './page/OAuth'));
const Transfer = lazy(() => import(/* webpackChunkName: "page.transfer" */ './page/Transfer'));
const RoomTransfer = lazy(() =>
  import(/* webpackChunkName: "page.room.transfer" */ './page/RoomTransfer')
);
const NotFound = lazy(() => import(/* webpackChunkName: "page.404" */ './page/NotFound'));
// import PageTitle from './component/PageTitle';

function App() {
  const { token } = useGithubToken();
  const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
    headers: {
      Authorization: `bearer ${token}`
    }
  });
  return (
    <LanguageProvider defaultValue={languages[0]} persisted languages={languages}>
      <ApolloProvider client={client}>
        <ToastProvider>
          <Suspense fallback={<Loading />}>
            <Router basename={'/'}>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/widgets/:widget">
                  <Widget />
                </Route>
                <Route exact path="/authing">
                  <Authing />
                </Route>
                <Route exact path={'/p/:username'}>
                  <UserPortal />
                </Route>
                <Route exact path={'/p/:username/:widget'}>
                  <UserPortalWidget />
                </Route>
                <Route exact path="/transfer/r/:id/:dest">
                  <RoomTransfer />
                </Route>
                <Route exact path="/transfer/:dest">
                  <Transfer />
                </Route>
                <Route exact path="/oauth/:app">
                  <OAuth />
                </Route>
                <Route>
                  <NotFound />
                </Route>
              </Switch>
            </Router>
          </Suspense>
        </ToastProvider>
      </ApolloProvider>
    </LanguageProvider>
  );
}

export default App;
