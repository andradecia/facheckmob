import React from "react";
import { 
  View,
  Text, 
  Dimensions, 
  TouchableOpacity, 
  Modal 
} from "react-native";

import PropTypes from 'prop-types';

const { width, height } = Dimensions.get("window");

const ModalWebView = props => (
  <Modal animationType="slide" transparent={false} visible={props.modalVisible}>
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ width: width - 50, height: height - 100 }}>
        <Text>Evento {props.notify.codEvento}</Text>
        <Text>{props.notify.nomeEvento}</Text>
        <Text>Setor {props.notify.eventoArea}</Text>
        <Text>Nome: {props.notify.usuarioNome}</Text>
        <Text>Área: {props.notify.usuarioTipo}</Text>
      </View>
      <View
        style={{
          height: 40,
          flexDirection: "row",
          justifyContent: "space-around"
        }}
      >
        <TouchableOpacity 
          style = {{ 
            backgroundColor: "#D50000", 
            padding: 10,
            paddingHorizontal: 32,
            marginRight: 5
          }}
          onPress={props.goBackHome}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {{ 
            backgroundColor: "#00C853", 
            padding: 10,
            paddingHorizontal: 32,
            marginLeft: 5
          }}           
          onPress={props.handleButton}>
          <Text>Ler outro QRCode</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

ModalWebView.propTypes = {

  modalVisible: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  notify: PropTypes.object.isRequired,
  openLink: PropTypes.func.isRequired,
  handleButton: PropTypes.func.isRequired,
  goBackHome: PropTypes.func.isRequired,

}

export default ModalWebView;