import React from 'react';
import { Text, View, StyleSheet, FlatList, RefreshControl, ToastAndroid } from 'react-native';
import { getData, creatPost } from '../components/Actions';
import { connect } from 'react-redux';
import { Card, Button } from 'react-native-elements';
import CreateBlogDialog from '../components/dialogBoxes/createBlogDialog';
import UpdateBlogDialog from '../components/dialogBoxes/updatePost';
import API from '../components/api';
import { Dialog } from 'react-native-simple-dialogs';

class Home extends React.Component {
    constructor(props) {
        super(props);
        console.log("home");
        this.state = {
            isShowSpinner: false,
            isShowCreateDialog: false,
            seletedPostId: 0,
            updatePostDetails: {},
            showUpdateDialog: false

        }
        this.props.getData();
    }
    hindCreatePostDialog() {
        this.setState({ isShowCreateDialog: false })
    }
    hindUpdatePostDialog() {
        this.setState({ showUpdateDialog: false });
    }
    makeToast(label) {
        ToastAndroid.showWithGravity(
            label,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    }
    creatPostRequest(author, title, description) {
        this.hindCreatePostDialog();
        let k = String(author)
        API.createPost(author, title, description)
            .then(res => res.json())
            .then(resJson => {
                this.makeToast("Posted");
                this.props.getData();
            }).catch(e => {
                this.makeToast("Something went wrong !");
            })
    }
    deletePost() {
        this.setState({ isShowDeleteWarningDialog: false });

        API.deletePost(this.state.seletedPostId)
            .then(res => res.json())
            .then(resJson => {
                this.makeToast("Posted");
                this.props.getData();
            }).catch(e => {
                this.makeToast("Something went wrong !");
            })
    }
    updatePostFunc(author, title, description) {
        this.setState({ showUpdateDialog: false });

        API.updatePost(this.state.updatePostDetails.id, author, title, description)
            .then(res => res.json())
            .then(resJson => {
                this.makeToast("Updated");
                this.props.getData();
            }).catch(e => {
                this.makeToast("Something went wrong !");
            })
    }
    render() {

        return (
            <View style={style.containerStyle}>

                <Button
                    onPress={() => { this.setState({ isShowCreateDialog: true }) }}
                    color="#000"
                    title={"Add Blog"}
                    titleStyle={{ fontSize: 18, color: "#000" }}
                    buttonStyle={style.addBtnStyle}

                />
                <FlatList
                    refreshControl={
                        <RefreshControl
                            progressViewOffset={50}
                            refreshing={this.state.isShowSpinner}
                            onRefresh={() => { this.props.getData() }}

                        />
                    }
                    data={this.props.blogPostList}
                    renderItem={({ item, index }) => {
                        return (
                            <Card containerStyle={style.cardStyle}>
                                <Text>{item.title}</Text>
                                <Text>{item.description}</Text>
                                <Text>{item.author}</Text>
                                <View style={style.btnContainerStyle}>
                                    <Text
                                        onPress={() => this.setState({ isShowDeleteWarningDialog: true, seletedPostId: item.id })}
                                        style={style.deleteBtnStyle}>Delete</Text>
                                    <Text
                                        onPress={() => { this.setState({ updatePostDetails: item, showUpdateDialog: true }) }}
                                        style={style.updateBtnStyle}>Update</Text>
                                </View>
                            </Card>
                        );
                    }}
                />
                <CreateBlogDialog
                    showDialog={this.state.isShowCreateDialog}
                    hindCreatePostDialog={this.hindCreatePostDialog.bind(this)}
                    creatPostRequest={this.creatPostRequest.bind(this)}
                />
                <UpdateBlogDialog
                    showUpdateDialog={this.state.showUpdateDialog}
                    updatePostDetails={this.state.updatePostDetails}
                    hindUpdatePostDialog={this.hindUpdatePostDialog.bind(this)}
                    updatePostFunc={this.updatePostFunc.bind(this)}
                />
                <Dialog
                    visible={this.state.isShowDeleteWarningDialog}
                    dialogStyle={style.dialogStyle}
                    onTouchOutside={false}
                >
                    <View style={{ width: "100%" }}>
                        <Text>Do you want to delete ?</Text>
                        <View style={style.btnContainerStyle}>
                            <Text
                                onPress={() => this.setState({ isShowDeleteWarningDialog: false })}
                                style={style.noBtnStyle}>No</Text>
                            <Text
                                onPress={() => { this.deletePost() }}
                                style={style.yesBtnStyle}>yes</Text>
                        </View>

                    </View>
                </Dialog>
            </View>
        );
    }
}
const style = StyleSheet.create({
    containerStyle: {
        flex: 1
    },
    cardStyle: {
        width: "90%",
        alignSelf: "center",
        marginTop: 10
    },
    addBtnStyle: {
        backgroundColor: "transparent",
        padding: 5,
        marginRight: 10,
        alignSelf: "flex-end"
    },
    btnContainerStyle: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10
    },
    deleteBtnStyle: {
        color: "red",
        fontSize: 18,
        padding: 5
    },
    updateBtnStyle: {
        color: "orange",
        fontSize: 18,
        padding: 5
    },
    dialogStyle: {
        borderRadius: 20,
        elevation: 0
    },
    noBtnStyle: {
        color: "red",
        fontSize: 15,
        padding: 5
    },
    yesBtnStyle: {
        color: "green",
        fontSize: 15,
        padding: 5
    },

});

const mapStateToProps = (state) => {
    return {
        blogPostList: state.Blog.blogPostList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getData: () => dispatch(getData()),
        creatPost: (author, title, description) => dispatch(creatPost(author, title, description))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
