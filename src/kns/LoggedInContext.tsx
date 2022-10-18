import { P, BlockCode, Img, Code, H4, Link } from "./components";

const contextCode = `import React from "react";
import { GraphQLClient } from "graphql-hooks";
import jwt_decode from "jwt-decode";
import { useGenerateToken, useRefreshToken } from "../api/tokens";
import { getToken, setToken, deleteToken } from "../localStorage";

// refresh every 10 min
const TOKEN_REFRESH_INTERVAL_MS = 1000 * 60 * 10;

interface IClaims {
  sub: string;
  roles: { isActive: boolean; isAdmin: boolean };
}

interface IUserInfo {
  isLoggedIn: boolean;
  userId: string;
  isActive: boolean;
  isAdmin: boolean;
}

function jwt2userInfo(token: string): IUserInfo {
  const claims = jwt_decode<IClaims>(token);
  return {
    isLoggedIn: true,
    userId: claims.sub,
    isActive: claims.roles.isActive,
    isAdmin: claims.roles.isAdmin,
  };
}

const ANON_USER_INFO: IUserInfo = {
  isLoggedIn: false,
  userId: "",
  isActive: false,
  isAdmin: false,
};

interface ILoggedInContext {
  isLoggedIn: boolean;
  userId: string;
  isActive: boolean;
  isAdmin: boolean;
  error?: string;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const defaultContext = {
  isLoggedIn: false,
  userId: "",
  isActive: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
};

export const LoggedInContext =
  React.createContext<ILoggedInContext>(defaultContext);

function getInitUserInfo(): IUserInfo {
  const oldToken = getToken();
  if (oldToken) return jwt2userInfo(oldToken);
  return ANON_USER_INFO;
}

interface ILoggedInContextProviderProps {
  children: React.ReactNode;
  gqlClient: GraphQLClient;
}

/**
 * Provides context for using global logged-in state
 *
 * Handles both sending the request (and updating results) when logging
 * in and writing the token to localStorage (deleting it on logout).
 * Just use \`isLoggedIn\` to find out whether the user is logged in.
 *
 * While user is logged in a token refresh will be attempted regularly.
 * If this fails, the token will be assumed expired and the user will be
 * logged out.
 *
 * @param props only children props
 */
export function LoggedInContextProvider(props: ILoggedInContextProviderProps) {
  const [state, setState] = React.useState<IUserInfo>(getInitUserInfo());
  const [generateToken, loginState] = useGenerateToken();
  const [refreshToken, refreshState, resetRefresh] = useRefreshToken();

  // on init if token found in localStorage, trigger refresh with it
  React.useEffect(() => {
    const oldToken = getToken();
    if (oldToken) {
      props.gqlClient.setHeader("Authorization", \`Bearer \${oldToken}\`);
      refreshToken();
    }
  }, [props.gqlClient, refreshToken]);

  // on init setup regular intervals if logged in
  React.useEffect(() => {
    const id = setInterval(() => {
      if (state.isLoggedIn) {
        refreshToken();
      }
    }, TOKEN_REFRESH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [state.isLoggedIn, refreshToken]);

  // on refresh response set token if successful else logout
  React.useEffect(() => {
    if (refreshState.error) {
      deleteToken();
      props.gqlClient.removeHeader("Authorization");
      setState(ANON_USER_INFO);
    }
    if (refreshState.data?.token) {
      setToken(refreshState.data.token);
      props.gqlClient.setHeader(
        "Authorization",
        \`Bearer \${refreshState.data.token}\`
      );
      setState(jwt2userInfo(refreshState.data.token));
    }
  }, [refreshState.error, refreshState.data, props.gqlClient]);

  // on login response set token if successful
  React.useEffect(() => {
    if (loginState.data?.token) {
      setToken(loginState.data.token);
      props.gqlClient.setHeader(
        "Authorization",
        \`Bearer \${loginState.data.token}\`
      );
      setState(jwt2userInfo(loginState.data.token));
    }
  }, [loginState.data, props.gqlClient]);

  function handleLogin(email: string, password: string) {
    generateToken({ variables: { payload: { email, password } } });
  }

  function handleLogout() {
    resetRefresh();
    deleteToken();
    props.gqlClient.removeHeader("Authorization");
    setState(ANON_USER_INFO);
  }

  return (
    <LoggedInContext.Provider
      value={{
        isLoggedIn: state.isLoggedIn,
        userId: state.userId,
        isActive: state.isActive,
        isAdmin: state.isAdmin,
        error: loginState.error && "Something went wrong",
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {props.children}
    </LoggedInContext.Provider>
  );
}`;

const initRefreshCode = `// on init if token found in localStorage, trigger refresh with it
React.useEffect(() => {
  const oldToken = getToken();
  if (oldToken) {
    props.gqlClient.setHeader("Authorization", \`Bearer \${oldToken}\`);
    refreshToken();
  }
}, [props.gqlClient, refreshToken]);`;

const refreshIntervalsCode = `// on init setup regular intervals if logged in
React.useEffect(() => {
  const id = setInterval(() => {
    if (state.isLoggedIn) {
      refreshToken();
    }
  }, TOKEN_REFRESH_INTERVAL_MS);
  return () => clearInterval(id);
}, [state.isLoggedIn, refreshToken]);`;

export default function Page(): JSX.Element {
  return (
    <>
      <Img
        src="https://media.defense.gov/2004/Aug/09/2000590026/2000/2000/0/040809-F-0000C-001.JPG"
        width="500px"
        height="300px"
      />
      <P>asd</P>
      <BlockCode code={contextCode} lang="typescript" label="loggedIn.tsx" />
      <P>asd</P>
      <H4>Security Consierations</H4>
      <P>asd</P>
      <BlockCode code={initRefreshCode} lang="typescript" />
      <H4>Development Environment</H4>
      <P>asd</P>
      <BlockCode code={refreshIntervalsCode} lang="typescript" />
    </>
  );
}
