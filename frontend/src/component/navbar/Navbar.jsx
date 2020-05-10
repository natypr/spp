import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {Routes} from "../../constant/Routes";
import {Link, withRouter} from 'react-router-dom';
import {AuthContext} from "../AuthProvider";
import IconButton from "@material-ui/core/IconButton";
import {ExitToApp} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import {getRouteForCreate} from "../../helper/routeHelper";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AddBoxIcon from '@material-ui/icons/AddBox';
import ExploreIcon from '@material-ui/icons/Explore';
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Box} from "@material-ui/core";


class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: true,
        };
    }

    isActive = () => this.state.active;
    toggle = () => {
        this.setState({
            active: !this.isActive()
        });
    };

    create = () => {
        this.props.history.push(getRouteForCreate(Routes.editor));
    };

    posts = () => {
        this.props.history.push(Routes.posts);
    };

    logout = () => this.context.logout();

    render() {
        return (
            <AppBar color='light' position='static'>
                <Toolbar>
                    {this.context.currentUser ?
                        <>
                            <IconButton onClick={this.posts}>
                                <ExploreIcon/>
                            </IconButton>
                            <IconButton onClick={this.create}>
                                <AddBoxIcon/>
                            </IconButton>
                            <IconButton>
                                <FavoriteIcon/>
                            </IconButton>
                        </>
                        :
                        <></>
                    }
                    <FormControlLabel
                        labelPlacement="start"
                        label="Darkness"
                        control={
                            <Switch
                                checked={this.state.active}
                                onChange={this.toggle}
                                value="checkedB"
                                color="primary"
                            />
                        }
                    />
                    {this.context.currentUser ?
                        <>
                            <Box ml={3}>
                                <Typography>
                                    Hi,{this.context.currentUser.name}!
                                </Typography>
                            </Box>
                            <IconButton onClick={this.logout}>
                                <ExitToApp color='secondary'>
                                </ExitToApp>
                            </IconButton>

                        </>
                        :
                        <Link to={Routes.login}>
                            <Box ml={3}>
                                <IconButton>
                                    <ExitToApp color='action'/>
                                </IconButton>
                            </Box>
                        </Link>
                    }
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.contextType = AuthContext;
export default withRouter(Navbar)
