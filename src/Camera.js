'use strict';
import React, { Component } from 'react';

import {
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

    state = {
        modalVisible: false,
        success: null,
        url: '',
        notify: 'Sem Retorno'
    };
    
    openLink = () => {
        Linking.openURL(this.state.url)
        .catch(err =>
            alert("Erro ao abrir o link", err));
            this.setState({ 
                success: false 
            });
    };
    
    handleButton = () => {
        this.setState({ 
            modalVisible: !this.state.modalVisible, 
            success: false 
        });
        this.scanner.reactivate();
    };
    
    onSuccess = async (e) => {
        if(e.type == 'QR_CODE') {

            console.log(e.type);
            console.log(e.data);
            
            this.setState({ 
                modalVisible: true, 
                success: true, 
                url: `http://amultsys.com.br/app/?chave_qrcode=654321&numero_qrcode=${e.data}`,
                notify: 'Acesso Liberado'
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