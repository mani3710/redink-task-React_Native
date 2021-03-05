import React, { useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
function Splash(props) {
    useEffect(() => {
        setTimeout(() => {
            props.navigation.replace("HomeScreen");
        }, 2000)
    });
    const {
        containerStyle,
        lableStyle,
        activityIndicatorStyle
    } = style;

    return (
        <View style={containerStyle}>
            <Text style={lableStyle}>Blog Poster</Text>
            <ActivityIndicator
                style={activityIndicatorStyle}
                color={"#000"}
                size={50}
            />
        </View>
    );
}
const style = StyleSheet.create({
    containerStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    lableStyle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    activityIndicatorStyle: {
        width: 100,
        height: 100,
        marginTop: 20
    }
});
export default Splash;