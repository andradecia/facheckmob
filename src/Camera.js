'use strict';
import React, { Component } from 'react';

import {
    Alert,
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking,
    View,
    Dimensions
} from 'react-native';

import { RNCamera } from "react-native-camera";
import QRCodeScanner from 'react-native-qrcode-scanner';
import ModalWebView from './Modal/ModalWebView';

const Camera = class ScanScreen extends Component {

    static navigationOptions = {
        title: 'Câmera',
        header: null
    }

    state = {
        modalVisible: false,
        success: null,
        url: "",
        chaveQR: 654321,
        notify: {
            nomeEvento: "",
            eventoArea: "",
            usuarioNome: "",
            usuarioTipo: ""
        }
    };
    
    openLink = () => {
        Linking.openURL(this.state.url)
        .catch(err =>
            alert("Erro ao abrir o link", err));
            this.setState({ 
                success: false 
            });
    };

    goBackHome = () => {
        this.props.navigation.navigate('Home');
    };

    handleButton = () => {
        this.setState({ 
            modalVisible: !this.state.modalVisible, 
            success: false 
        });
        this.scanner.reactivate();
    };
    
    onSuccess = async (e) => {

        const {chaveQR,notify} = this.state;

        if(e.type == 'QR_CODE') {

            console.log(e.type);
            console.log(e.data);
            console.log((e.data == " ") ? "_VAZIO_" : e.data);
            console.log(typeof(e.data));
            
            fetch('https://www.colorbox.art.br/teste/app/scann.php', {
                method:'POST',
                header: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body:JSON.stringify({
                    // we will pass our input data to server
                    chave_qrcode: chaveQR,
                    numero_qrcode: (e.data == " ") ? "" : e.data
                })
                
            })
            .then((response) => response.json())
            .then((responseJson) => {
                
                console.log(responseJson);
                
                if(responseJson.qrcode_ok == 1) {
                    
                    console.log(responseJson.qrcode_ok);

                    this.setState({ 
                        modalVisible: true, 
                        success: true, 
                        notify: {
                            codEvento: responseJson.evento,
                            nomeEvento: responseJson.evento_nome,
                            eventoArea: responseJson.area,
                            usuarioNome: responseJson.usuario,
                            usuarioTipo: responseJson.tipo_usuario
                        }
                    });
                }
                else {

                    let erroMsg = '';

                    switch(responseJson.qrcode_ok) {
                        case 0:
                            erroMsg = 'QRCode vazio';
                            break;
                        case 2:
                            erroMsg = 'QRCode inválido';
                            break;
                        default:
                            erroMsg = 'Erro não identificado';
                            break;                        
                    }

                    Alert.alert(
                        'Atenção',
                        erroMsg,
                        [
                            {
                                text: 'Cancelar',
                                onPress: () => this.props.navigation.navigate('Home'),
                                style: 'cancel',
                            },
                            {
                                text: 'Tentar de novo', 
                                onPress: () => this.scanner.reactivate()
                            },
                        ],
                        {
                            cancelable: false
                        },
                      );
                }

            })
            .catch((error) => {

                console.error(error);
            }); 
        }
    };

    render() {

        return (
            <View style={styles.container}>

                <QRCodeScanner
                    onRead={this.onSuccess}
                    ref={(node) => {this.scanner = node}}
                    flashMode={RNCamera.Constants.FlashMode.torch}
                />
                
                <ModalWebView 
                    handleButton={this.handleButton} 
                    goBackHome={this.goBackHome} 
                    modalVisible={this.state.modalVisible} 
                    url={this.state.url} 
                    openLink={this.openLink} 
                    notify={this.state.notify}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "black"
    },
    touchable: {
        padding: 16
    },
    text: {
        fontSize: 21,
        color: "rgb(0,122,255)"
    },
    cameraContainer: {
        height: Dimensions.get('window').height,
    }
});

AppRegistry.registerComponent('default', () => ScanScreen);
export default Camera;