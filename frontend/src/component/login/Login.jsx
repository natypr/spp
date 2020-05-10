import * as React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {Link, withRouter} from 'react-router-dom';
import {Routes} from '../../constant/Routes';
import {AuthContext} from "../AuthProvider";
import Alert from "../alert/Alert";
import Box from "@material-ui/core/Box";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {error: null}
    }

    login = (event) => {
        event.preventDefault();
        const email = event.target.elements[0].value;
        const password = event.target.elements[2].value;
        let resultPromise = this.context.login(email, password);
        resultPromise.then(() => {
            this.props.history.push(Routes.posts);
        }).catch(reason => {
            this.setState({error: reason.response.data.message})
        });
    };

    render() {
        return (
            <Container component='main' maxWidth='xs'>
                {this.state.error ? <Alert severity="error">{this.state.error}</Alert> : <></>}
                <div>
                    <Box my={5}>
                        <Typography component='h1' variant='h5'>
                            Sign in
                        </Typography>
                        <form noValidate onSubmit={this.login}>
                            <TextField
                                variant='outlined'
                                margin='normal'
                                required
                                fullWidth
                                id='email'
                                label='Email Address'
                                name='email'
                                autoComplete='email'
                                autoFocus
                            />
                            <TextField
                                variant='outlined'
                                margin='normal'
                                required
                                fullWidth
                                name='password'
                                label='Password'
                                type='password'
                                id='password'
                                autoComplete='current-password'
                            />
                            <Box my={2}>
                                <Button
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    color='primary'
                                >
                                    Sign In
                                </Button>
                            </Box>
                            <Grid container>
                                <Grid item>
                                    <Link to={Routes.registration} variant='body2'>
                                        Don't have an account? Sign Up
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </div>
            </Container>
        )
    }
}

Login.contextType = AuthContext;
export default withRouter(Login)
