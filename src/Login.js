import React, { Component } from 'react';
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
            UserKey:123456,
            UserLogin:'',
            UserPassword:''
        };
    };

    login = () => {
        
        const {UserKey,UserLogin,UserPassword} = this.state;
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // Verifica Email
        
        if(UserLogin == "") {
            alert("Informe seu Login");
            //this.setState({email:'Please enter Email address'})
		}
		else if(UserPassword == "") {
            alert("Informe sua Senha");
            //this.setState({email:'Please enter password'})
        }
        
		else {

            fetch('http://www.amultsys.com.br/app/login.php', {
                method:'POST',
                header: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body:JSON.stringify({
                    // we will pass our input data to server
                    chave: UserKey,
                    login: UserLogin,
                    senha: UserPassword
                })
                
            })
            .then((response) => response.json())
            .then((responseJson) => {
                
                console.log(responseJson);
                
                if(responseJson.logado == 1) {
                    
                    this.props.navigation.navigate('Home', { 
                        port_login: UserLogin,
                        port_senha: UserPassword,
                        area: responseJson.area,
                        area_nome: responseJson.area_nome,
                        evento: responseJson.evento,
                        evento_nome: responseJson.evento_nome
                    });
                }
                else{

                    alert("Erro ao acessar. Verifique seu login e senha");
                }

            })
            .catch((error) => {

                console.error(error);
            });
        }
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
                                style={styles.input} 
                                onChangeText={(UserLogin)=>this.setState({UserLogin})} 
                                placeholder="LOGIN" />
                        </View>

                        <View style={styles.sectionContainer}>
                            <TextInput 
                                style={styles.input} 
                                onChangeText={(UserPassword)=>this.setState({UserPassword})} 
                                placeholder="SENHA" 
                                secureTextEntry={true} />
                        </View>

                        <View style={styles.sectionContainer}>
                            <Button 
                                color="#ec6b15" 
                                style={styles.buttonSend} 
                                title="Entrar" 
                                onPress={this.login} />
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
