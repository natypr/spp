import React from 'react';
import {BrowserRouter, Redirect, Switch} from 'react-router-dom';
import Navbar from "./component/navbar/Navbar";
import Posts from "./component/news/Posts";
import {Routes} from "./constant/Routes";
import Registration from "./component/registration/Registration";
import {AuthContext} from "./component/AuthProvider";
import Login from "./component/login/Login";
import {ApolloProvider} from 'react-apollo';
import ApolloClient from 'apollo-client';
import {endpoints} from "./constant/endpoints";
import {OnlyGuestRoute} from "./route/OnlyGuestRoute";
import {PrivateRoute} from "./route/PrivateRoute";
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {createUploadLink} from "apollo-upload-client";
import Editor from "./component/news/editor/EditorContainer";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const httpLink = createUploadLink({
    uri: endpoints.graphql,
    headers: {
        "keep-alive": "true"
    }
});

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('Jwt token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

const theme = createMuiTheme({
    palette: {
        type: "dark",
    }
});

class App extends React.Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <ApolloProvider client={client}>
                    <BrowserRouter>
                        <CssBaseline/>
                        <Navbar/>
                        <Switch>
                            <OnlyGuestRoute exact path={Routes.login} component={Login}/>
                            <OnlyGuestRoute exact path={Routes.registration} component={Registration}/>
                            <PrivateRoute exact path={Routes.editor} component={Editor}/>
                            <PrivateRoute exact path={Routes.posts} component={Posts}/>
                            <Redirect to={Routes.posts}/>
                        </Switch>
                    </BrowserRouter>
                </ApolloProvider>
            </ThemeProvider>
        );
    }
}

App.contextType = AuthContext;
export default App;
