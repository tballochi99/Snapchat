import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 42,
        justifyContent: 'center',
        backgroundColor: '#FFFC00',
    },
    white: {
        backgroundColor: 'rgba(255,252,0,0)',
    },
    formLogin: {
        paddingBottom: 40,
    },
    view: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // borderRadius: 100,
        // backgroundColor: 'lightgray',
        // borderBottomWidth: 1,
        // borderColor: 'rgba(0, 0, 0, 0.1)',
        padding: 6,
        marginTop: 6,
        marginBottom: 6,

    },
    viewlist: {
        backgroundColor: '#eeeeee',
        borderRadius: 6,
        shadowColor: 'black',
    },
    input: {
        marginBottom: 6,
        padding: 6,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 100,
        backgroundColor: 'white',
        color: '#20232a',
        textAlign: 'center',
        fontSize: 20,
    },
    button: {
        marginTop: 6,
        marginBottom: 6,
        padding: 6,
        minWidth: 46,
        borderRadius: 100,
        color: 'white',
        textAlign: 'center',
        // backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signup: {
        backgroundColor: '#FE2A9C',
    },
    login: {
        backgroundColor: '#00FFFC',
    },
    snap: {
        backgroundColor: '#FE2A9C',
    },
    photo: {
        backgroundColor: '#00FFFC',
    },
    logout: {
        backgroundColor: '#FF5050',
    },
    text: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cancel: {
        fontWeight: 'normal',
        color: '#FF5050',
    },
    black: {
        fontWeight: 'normal',
        color: 'black',
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    durations: {
        width: 200,
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        fontSize: 24,
        color: '#20232a',
        backgroundColor: '#eaeaea',
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
    },
    username: {
        color: '#fff',
        fontSize: 18,
    },
    list: {
        marginBottom: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
        width: '100%',
    },
    images: {
        alignSelf: 'center',
        width: 104,
        height: 104,
    },
    icon: {
        marginBottom: '20%',
    },
    arrow: {
        alignSelf: 'center',
        width: 38,
        height: 38,
    },
    countdown: {
        position: 'absolute',
        top: 10,
        right: 10,
        color: '#fff',
        fontSize: 24,
        textShadowRadius: 10,
        textShadowColor: 'black',
    },
    title: {
        color: 'black',
        fontSize: 24,
    },
});

export default styles;