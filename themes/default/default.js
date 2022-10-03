import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#202124',
    },
    colors: {
        white: {
            color: "#fff"
        }
    },
    ListText: {
        color: "#fff",
        fontSize: 15,


    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#44464C',
        padding: 30
    },
    top: {
        backgroundColor: '#44464C',
        padding: 30,
        paddingBottom: 0,
        paddingStart: 20
    },
    h1: {
        fontSize: 40,
        color: "#fff",
        paddingBottom: 10
    },
    h2: {
        fontSize: 30,
        color: "#fff",
        paddingBottom: 10
    },
    h3: {
        fontSize: 20,
        color: "#fff",
        paddingBottom: 10
    },
    h4: {
        fontSize: 10,
        color: "#fff",
        paddingBottom: 10
    },
    containerList: {
        padding: 10,
        width: 250,
        height: 250,
        borderColor: '#fff',
        boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)"
    }

});

