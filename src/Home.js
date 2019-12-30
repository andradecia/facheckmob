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

const Home = class HomeScreen extends Component {

    static navigationOptions = {
        title: 'Home',
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            nome: this.props.navigation.state.params.nome
        };

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
                  <Text>Olá, {this.state.nome}</Text>
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
});

export default Home;
