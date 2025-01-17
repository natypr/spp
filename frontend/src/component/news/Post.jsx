import * as React from "react";
import {useContext} from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {withRouter} from "react-router-dom";
import {useMutation} from '@apollo/react-hooks';
import {DELETE_POST, DIS_LIKE, LIKE} from "../../constant/mutation";
import {AuthContext} from "../AuthProvider";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {Routes} from "../../constant/Routes";
import {getRouteForUpdate} from "../../helper/routeHelper";
import {GET_POSTS} from "../../constant/query";
import Grid from "@material-ui/core/Grid";

const Post = (props) => {
    const post = props.post;

    const updateCache = (client, {data: {deletePost: item}}) => {
        const data = client.readQuery({
            query: GET_POSTS,
        });
        const newData = {
            posts: data.posts.filter(t => t.id !== item.id)
        };
        client.writeQuery({
            query: GET_POSTS,
            data: newData
        });
    };

    const [addLike, {loading: addLikeLoading}] = useMutation(LIKE);
    const [removeLike, {loading: removeLikeLoading}] = useMutation(DIS_LIKE);
    const [deletePost, {loading: deleting}] = useMutation(DELETE_POST);

    const authContext = useContext(AuthContext);

    const remove = () => {
        if (deleting) return;
        deletePost({
            variables: {id: post.id},
            update: updateCache
        });
    };

    const like = () => {
        if (addLikeLoading) return;
        addLike({variables: {id: post.id}})
    };

    const unLike = () => {
        if (removeLikeLoading) return;
        removeLike({variables: {id: post.id}})
    };

    const onEdit = () => {
        props.history.push(getRouteForUpdate(Routes.editor, post.id));
    };

    let isPostHasLikesFromCurrentUser = post.likes.findIndex(user => user.id === authContext.currentUser.id) > -1;
    return (
        <Box m={2}>
            <Card>
                <CardHeader title={post.title}/>
                <CardContent>
                    <Box mb={2}>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {post.body}
                        </Typography>
                    </Box>
                    <img src={`${post.imageUrl}`} alt={""}/>
                </CardContent>
                <CardActions>
                    {
                        isPostHasLikesFromCurrentUser ?
                            <IconButton onClick={unLike} aria-label="Like">
                                <FavoriteIcon/>
                            </IconButton>
                            :
                            <IconButton onClick={like} aria-label="Like">
                                <FavoriteBorderIcon/>
                            </IconButton>
                    }
                    <Typography>
                        {post.likes.length}
                    </Typography>
                    {
                        authContext.currentUser.id === post.owner.id
                            ?
                            <React.Fragment>
                                <Grid container justify="flex-end">
                                    <IconButton color='secondary' onClick={remove} aria-label="delete">
                                        <DeleteIcon fontSize="large"/>
                                    </IconButton>
                                    <IconButton color='primary' onClick={onEdit} aria-label="edit">
                                        <EditIcon fontSize="large"/>
                                    </IconButton>
                                </Grid>
                            </React.Fragment>
                            :
                            <React.Fragment/>
                    }
                </CardActions>
            </Card>
        </Box>
    )
};

export default withRouter(Post);
