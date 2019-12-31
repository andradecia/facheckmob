import React, { Component } from 'react';
import { View, text, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';


const Camera = class CameraScreen extends Component {

    static navigationOptions = {
        title: 'Câmera',
        header: null
    }

    render() {
        return (
            <View style={styles.container}>
                <RNCamera 
                    style = {styles.camera} ref = {(camera)=>{
                        this.camera = camera;
                    }}
                    type={ RNCamera.Constants.Type.back }
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                      }}
                      onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        console.log(barcodes);
                      }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'#000000'
    },
    camera:{
        flex:1
    }
})

export default Camera;