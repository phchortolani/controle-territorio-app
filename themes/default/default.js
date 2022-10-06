import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#44464C' /* '#202124' */,
        /*   borderBottomWidth: 10,
          borderTopWidth: 10,
          borderColor: '#202124',
          borderStyle: "solid", */
    },
    colors: {
        white: {
            color: "#fff"
        }
    },
    ListText: {
        fontSize: 20,
    },
    button: {
        margin: 0,
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingTop: 9
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 12,
        padding: 9
    },
    badge: {
        fontSize: 10,
        backgroundColor: "orange",
        borderRadius: 10,
        padding: 4,
        color: "white",
        fontWeight: "bold"
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#202124',
        textAlign: "center"
    },
    top: {
        backgroundColor: '#202124',
        padding: 30,
        paddingBottom: 0,
        paddingStart: 20,
        /*      borderBottomWidth: 5,
             borderColor: '#5b3e84',
             borderStyle: "solid", */
    },
    h1: {
        fontSize: 40,
        color: "#fff",
        paddingTop: 5,
        paddingBottom: 10
    },
    h2: {
        fontSize: 30,
        color: "#fff",
        paddingTop: 5,
        paddingBottom: 10
    },
    h3: {
        fontSize: 20,
        color: "#fff",
        paddingTop: 5,
        paddingBottom: 10
    },
    h4: {
        fontSize: 10,
        color: "#fff",
        paddingTop: 5,
        paddingBottom: 10
    },
    containerList: {
        padding: 10,
        width: 250,
        height: 250,
        borderColor: '#fff',
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,

    }


});

