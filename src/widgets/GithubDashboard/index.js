import { useEffect } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import Loading from '../Common/Loading';
import GoAuth from '../Common/GoAuth';
import StyledWrapper from './styled';
import useToken from './useToken';

const cid = 'f3505bc46977fad4bb33';
const authLink = `https://github.com/login/oauth/authorize?client_id=${cid}&scope=repo&redirect_uri=${encodeURI(
  `${process.env.REACT_APP_GH_REDIRECT}`
)}`;
import Card from './Card';
const GET_USER_DATA = gql`
  query {
    viewer {
      avatarUrl
      name
      login
      repositories(
        isFork: false
        isLocked: false
        first: 100
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        nodes {
          pushedAt
          name
          stargazerCount
          forkCount
          url
          homepageUrl
          isArchived
          object(expression: "master") {
            ... on Commit {
              history {
                totalCount
              }
            }
          }
        }
      }
    }
  }
`;
let goAuth = authLink;
// identity.launchWebAuthFlow
export default function GithubDashboard() {
  const { token } = useToken();
  const [loadUserData, { loading, data }] = useLazyQuery(GET_USER_DATA);
  useEffect(() => {
    if (token) {
      loadUserData();
    }
  }, [token, loadUserData]);

  console.log('user data', { data });
  if (!token) return <GoAuth auth={goAuth} />;
  if (loading || !data) return <Loading />;
  const {
    viewer: {
      avatarUrl,
      login,
      repositories: { nodes }
    }
  } = data;
  return (
    <StyledWrapper>
      <a href={`https://github.com/${login}/`} target="_blank" className="head">
        <img
          data-default="https://static.nicegoodthings.com/privoce/developer.png"
          className="avatar"
          title={login}
          src={`${avatarUrl}`}
          alt="用户头像"
        />
      </a>
      <ul className="list">
        {nodes
          .filter((n) => !n.isArchived)
          .map((repo) => {
            return <Card key={repo.url} {...repo} />;
          })}
      </ul>
    </StyledWrapper>
  );
}
