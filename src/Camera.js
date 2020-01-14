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

import QRCodeScanner from 'react-native-qrcode-scanner';
import ModalWebView from './Modal/ModalWebView';
import { RNCamera } from "react-native-camera";

const Camera = class ScanScreen extends Component {

    state = {
        modalVisible: false,
        success: null,
        url: ''
    };
    
    openLink = () => {
        Linking.openURL(this.state.url)
        .catch(err =>
            alert("Erro ao abrir o link", err));
            this.setState({ success: false });
    };
    
    handleButton = () => {
        this.setState({ modalVisible: !this.state.modalVisible, success: false });
        this.scanner.reactivate();
    };
    
    onSuccess = async (e) => {
        await this.setState({ success: true, modalVisible: true, url: e.data });
    };

    render() {
        return (
            <View style={styles.container}>
                <QRCodeScanner
                    onRead={this.onSuccess}
                    ref={(node) => { this.scanner = node }}
                    flashMode={RNCamera.Constants.FlashMode.torch}
                />

            <ModalWebView 
                handleButton={this.handleButton} 
                modalVisible={this.state.modalVisible} 
                url={this.state.url} 
                openLink={this.openLink} 
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