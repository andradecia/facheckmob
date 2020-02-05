'use strict';
import React, { Component } from 'react';

import {
    Alert,
    AppRegistry,
    StyleSheet,
    Text,
    Linking,
    View,
    Dimensions
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import ModalWebView from './Modal/ModalWebView';

const { width, height } = Dimensions.get("window");

const Camera = class ScanScreen extends Component {

    static navigationOptions = {
        title: 'Câmera'
    }

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            success: null,
            url: "",
            chaveQR: 654321,
            port_login: this.props.navigation.state.params.port_login,
            port_senha: this.props.navigation.state.params.port_senha,
            area_id: this.props.navigation.state.params.area_id,
            evento_id: this.props.navigation.state.params.evento_id,
            evento_nome: this.props.navigation.state.params.evento_nome,
            notify: {
                codEvento: "",
                nomeEvento: "",
                eventoArea: "",
                usuarioNome: "",
                usuarioTipo: ""
            }
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

        const {
            port_login,
            port_senha,
            evento_nome,
            evento_id,
            area_id,
            chaveQR,
            notify
        } = this.state;

        if(e.type == 'QR_CODE') {

            console.log('Tipo do código: ' + e.type);
            console.log('Número lido: ' + (e.data == " ") ? "_VAZIO_" : e.data);
            console.log('Tipo da variável: ' + typeof(e.data));
            console.log(`Evento: ID ${evento_id} / Nome ${evento_nome}`);
            console.log(`Área ID: ${area_id}`);
            //console.log(`Porteiro: ${port_login} / ${port_senha}`);
            
            fetch('http://www.amultsys.com.br/app/scann.php', {
                method:'POST',
                header: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body:JSON.stringify({
                    // we will pass our input data to server
                    chave_qrcode: chaveQR,
                    numero_qrcode: (e.data == " ") ? "" : e.data,
                    evento: evento_id,
                    evento_nome: evento_nome,
                    area: area_id,
                    port_login: port_login,
                    port_senha: port_senha
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
                            erroMsg = 'QRCode já utilizado';
                            break;
                        case 2:
                            erroMsg = 'QRCode não localizado';
                            break;
                       default:
                            erroMsg = responseJson.msg;
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
                    showMarker={true}
                    onRead={this.onSuccess}
                    ref={(node) => {this.scanner = node}}
                    cameraStyle={{height: height, width: width}}
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
        flexDirection: 'column',
        backgroundColor: "grey"
    },
    text: {
        fontSize: 21,
        color: "rgb(0,122,255)"
    }
});

AppRegistry.registerComponent('default', () => ScanScreen);
export default Camera;