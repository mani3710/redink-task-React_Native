import React from 'react';
import { Text, View, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { Dialog } from 'react-native-simple-dialogs';
export default class UpdatePostDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authorName: this.props.updatePostDetails.author,
            title: this.props.updatePostDetails.title,
            description: this.props.updatePostDetails.description
        }
    }
    render() {

        return (
            <View>
                <Dialog
                    visible={this.props.showUpdateDialog}
                    dialogStyle={style.dialogStyle}
                    onTouchOutside={false}
                >
                    <KeyboardAvoidingView style={{ width: "100%" }}>
                        <Text style={style.titleLabelStyle}>Update Blog</Text>
                        <TextInput
                            placeholder="Enter the Author name"
                            style={style.textInputStyle}
                            value={this.state.authorName}
                            onChangeText={(text) => { this.setState({ authorName: text }) }}
                            keyboardAppearance

                        />
                        <TextInput
                            placeholder="Enter the Title"
                            style={style.textInputStyle}
                            value={this.state.title}
                            onChangeText={(text) => { this.setState({ title: text }) }}
                            keyboardAppearance
                        />
                        <TextInput
                            placeholder="Enter the Description"
                            style={style.textInputStyle}
                            value={this.state.description}
                            onChangeText={(text) => { this.setState({ description: text }) }}
                            keyboardAppearance

                        />
                        <View style={style.btnContainerStyle}>
                            <Text
                                onPress={() => this.props.hindUpdatePostDialog()}
                                style={style.cancelBtnStyle}>Cancel</Text>
                            <Text
                                onPress={() => { this.props.updatePostFunc(this.state.authorName, this.state.title, this.state.description) }}
                                style={style.addBtnStyle}>Update</Text>
                        </View>
                    </KeyboardAvoidingView>
                </Dialog>
            </View>
        )
    }
}
const style = StyleSheet.create({
    dialogStyle: {
        borderRadius: 20,

        elevation: 0
    },
    textInputStyle: {
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        marginTop: 10
    },
    titleLabelStyle: {
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "center"
    },
    btnContainerStyle: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10
    },
    cancelBtnStyle: {
        color: "red",
        fontSize: 18,
        padding: 5
    },
    addBtnStyle: {
        color: "green",
        fontSize: 18,
        padding: 5
    }
});