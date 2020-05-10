import * as React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {styled} from '@material-ui/core/styles';

const MyButton = styled(({color, ...other}) => <Button {...other} />)({
    background: (props) =>
        props.color === 'red'
            ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
            : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 5,
    boxShadow: (props) =>
        props.color === 'red'
            ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
            : '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 38,
    padding: '0 34px',
    margin: 8,
});

export default class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.post.title,
            body: props.post.body,
            image: undefined
        }
    }

    onChangeTitle = (e) => {
        this.setState({title: e.target.value});
    };
    onChangeBody = (e) => {
        this.setState({body: e.target.value});
    };
    onChangeImg = (e) => {
        this.setState({image: e.target.files[0]});
    };
    onSave = () => {
        const {title, image, body} = this.state;
        this.props.onSave(title, body, image);
    };

    render() {
        return <Container maxWidth="sm">
            <Box m={6}>
                <Card>
                    <Grid
                        container
                        direction="column"
                        justify="space-evenly"
                        alignItems="center"
                    >
                        <Box m={1}>
                            {this.props.message}
                        </Box>
                        <Box m={2}>
                            <Grid spacing={2}
                                  container
                                  direction="row"
                                  justify="space-between"
                                  alignItems="center"
                            >
                                <Grid item>
                                    Title:
                                </Grid>
                                <Grid item>
                                    <TextField onChange={this.onChangeTitle}
                                               value={this.state.title} placeholder='title'
                                               variant="outlined"
                                               id='title' multiline rowsMax={4}/>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box m={2}>
                            <Grid spacing={2}
                                  container
                                  direction="row"
                                  justify="space-between"
                                  alignItems="center">
                                <Grid item>
                                    Body:
                                </Grid>
                                <Grid item>
                                    <TextField onChange={this.onChangeBody}
                                               value={this.state.body} placeholder="body"
                                               variant="outlined"
                                               id="body" multiline rowsMax={7}/>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box m={2}>
                            {!this.props.post.id &&
                            <React.Fragment>
                                <input
                                    name={'document'}
                                    hidden
                                    accept="image/*"
                                    onChange={this.onChangeImg}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                />
                                <label htmlFor="contained-button-file">
                                    <MyButton
                                        color={this.state.image ? 'blue' : 'red'}
                                        variant="contained"
                                        component="span"
                                    >
                                        Upload image
                                    </MyButton>
                                </label>
                            </React.Fragment>
                            }
                        </Box>

                        <Box m={4}>
                            <Grid justify="space-between" container spacing={5}>
                                <Grid item>
                                    <MyButton
                                        onClick={() => this.props.onCancel()}
                                        variant="contained"
                                        color="blue"
                                    >
                                        Cancel
                                    </MyButton>
                                </Grid>
                                <Grid item>
                                    <MyButton
                                        disabled={!this.state.title
                                        || !this.state.body
                                        || (!this.props.post.id ? !this.state.image : false)}
                                        onClick={this.onSave}
                                        type="submit"
                                        variant="contained"
                                        color="red"
                                    >
                                        Save
                                    </MyButton>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Card>
            </Box>
        </Container>
    }
}
