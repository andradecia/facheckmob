import React, {Component} from 'react';
import SysConn from './System';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    StatusBar,
    Button,
    FlatList,
    ImageBackground
} from 'react-native';

const Login = class LoginScreen extends Component {

    static navigationOptions = {
        title: 'Login',
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            loginInput:'admin@teste.com',
            senhaInput:'123456'
        };

        this.logar = this.logar.bind(this);

        // Deslogando usuário
        SysConn.logout();
        
    };

    logar() {

        // Monitorando login
        SysConn.addAuthListener((user)=>{
            
            if(user) {
                
                SysConn.getUserInfo((info)=>{
                    let nome = info.val().nome;
                    this.props.navigation.navigate('Home', {nome});
                });
            }
            
        });

        // Logando usuário
        SysConn.login(this.state.loginInput, this.state.senhaInput)
        .catch((error)=>{
        
            switch(error.code) {
                case "auth/invalid-email":
                    alert("E-mail inválido");
                    break;
                case "auth/wrong-password":
                    alert("Senha inválida");
                    break;
                case "auth/user-not-found":
                    alert("Usuário não encontrado");
                    break;
                case "auth/network-request-failed":
                    alert("A requisição falhou");
                    break;
                default:
                    alert("Ocorreu um erro inesperado. Por favor, tente mais tarde.");
                    break;
            }
        });
    }

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

                        <View style={styles.sectionContainer}>
                            <TextInput 
                                value="admin@teste.com" 
                                style={styles.input} 
                                onChangeText={(loginInput)=>this.setState({loginInput})} 
                                placeholder="LOGIN" />
                        </View>

                        <View style={styles.sectionContainer}>
                            <TextInput 
                                value="123456" 
                                style={styles.input} 
                                onChangeText={(senhaInput)=>this.setState({senhaInput})} 
                                placeholder="SENHA" 
                                secureTextEntry={true} />
                        </View>

                        <View style={styles.sectionContainer}>
                            <Button 
                                color="#ec6b15" 
                                style={styles.buttonSend} 
                                title="Entrar" 
                                onPress={this.logar} />
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
    engine: {
        position: 'absolute',
        right: 0,
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
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.black,
    },
    highlight: {
    fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
    input: {
        color: Colors.dark,
        fontSize: 14,
        padding: 4,
        paddingLeft: 14,
        borderWidth: 1,
        borderColor: Colors.light,
        height: 40,
    },
    buttonSend: {
        height: 40,
        color: '#ec6b15'
    },
    background: {
        paddingBottom: 40,
        paddingTop: 96,
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
        fontSize: 36,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        letterSpacing: -2,
        color: Colors.white,
    },
});

export default Login;
