import React, {Component} from 'react';
import SysConn from './System';
import {
    AsyncStorage,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    FlatList,
    ImageBackground,
    BackHandler
} from 'react-native';

const Home = class HomeScreen extends Component {

    static navigationOptions = {
        title: 'Home',
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            port_login: this.props.navigation.state.params.port_login,
            port_senha: this.props.navigation.state.params.port_senha,
            area: this.props.navigation.state.params.area,
            area_nome: this.props.navigation.state.params.area_nome,
            evento: this.props.navigation.state.params.evento,
            evento_nome: this.props.navigation.state.params.evento_nome
        };
    }

    logout = async () => {
        try {
            await AsyncStorage.setItem('checklogin', JSON.stringify({
                "responseJson":{"logado":0}
            }));
            this.props.navigation.navigate('Login');
        }
        catch(e) {
            // saving error
            console.log(e);
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => { return true });
    }

    opencamera = ()=>this.props.navigation.navigate('Camera', { 
        port_login: this.state.port_login,
        port_senha: this.state.port_senha,
        area_id: this.state.area,
        evento_id: this.state.evento,
        evento_nome: this.state.evento_nome
    });

    render(){
        return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <ImageBackground
                        accessibilityRole={'image'}
                        source={require('./icone_brand2.png')}
                        style={styles.background}
                        imageStyle={styles.logo}>
                        <Text style={styles.text}>Amult Checkin</Text>
                    </ImageBackground>

                    <View style={styles.body}>

                        <View style={[styles.sectionContainer, styles.btnLogoff]}>
                            <Button color="#880E4F" style={styles.buttonSend}  title="Sair" onPress={this.logout} />
                        </View>

                        <View style={styles.sectionContainer}>
                            <Text style={[styles.mBottom40, styles.sectionTitle]}>Olá, {this.state.port_login}!</Text>
                            <Text style={styles.mBottom16}>Evento: ({this.state.evento}) {this.state.evento_nome}</Text>
                            <Text style={styles.mBottom40}>Setor: ({this.state.area}) {this.state.area_nome}</Text>
                            <Button color="#ec6b15" style={styles.buttonSend}  title="Câmera" onPress={this.opencamera} />
                        </View>

                    </View>

                </ScrollView>
            </SafeAreaView>
        </>
        );
  }
};

const Colors = {
    primary: '#1292B4',
    white: '#FFF',
    lighter: '#F3F3F3',
    light: '#DAE1E7',
    dark: '#444',
    black: '#000',
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    body: {
        paddingBottom: 36,
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.dark,
    },
    buttonSend: {
        height: 40,
        color: '#ec6b15'
    },
    mBottom40: {
        marginBottom: 40
    },
    mBottom16: {
        marginBottom: 16
    },
    background: {
        paddingBottom: 16,
        paddingTop: 16,
        paddingHorizontal: 32,
        backgroundColor: Colors.primary,
    },
    logo: {
        opacity: 0.2,
        overflow: 'visible',
        resizeMode: 'cover',
        marginLeft: -128,
        marginBottom: -192,
    },
    text: {
        fontSize: 12,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: Colors.white,
    },
    btnLogoff: {
        flex: 1,
        alignSelf: "flex-end"
    }
});

export default Home;
