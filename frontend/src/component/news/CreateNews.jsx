import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {endpointsClient, endpointsServer} from "../../constant/endpoints";
import {withRouter} from 'react-router-dom';
import {socket} from "../../service/requestService";
import {Routes} from "../../constant/Routes";
import Card from "@material-ui/core/Card";

class CreateNews extends React.Component {

    onSubmit = event => {
        event.preventDefault();
        const title = event.target.elements[0].value;
        const content = event.target.elements[1].value;
        socket.on(endpointsClient.getNew, () => {
            this.props.history.push(Routes.news);
        });
        socket.emit(endpointsServer.postNews, {title, content});
    };

    render() {
        return (
            <Container maxWidth="sm">
                <Box m={6}>
                    <Card>
                        <form noValidate autoComplete='off' onSubmit={this.onSubmit}>
                            <Grid
                                container
                                direction="column"
                                justify="space-evenly"
                                alignItems="center"
                            >
                                <Box m={4}>
                                    <Grid item>
                                        <TextField id='title' label='title'/>
                                    </Grid>
                                </Box>
                                <Box m={4}>
                                    <Grid>
                                        <TextareaAutosize id='content'
                                                          aria-label='empty textarea'
                                                          placeholder='content'
                                                          rowsMin={4}/>
                                    </Grid>
                                </Box>

                                <Box m={2}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Create
                                    </Button>
                                </Box>
                            </Grid>
                        </form>
                    </Card>
                </Box>
            </Container>
        )
    }
}

export default withRouter(CreateNews);
