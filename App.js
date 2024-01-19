import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import ConsultaDB from './components/ConsultaDB';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleConsultar = () => {
    if (inputValue.trim() === "") {
      setMessage("Por favor ingresa un numero de cupon");
      return;
    }
    const codigoCupon = inputValue.replace("-", "");
    setInputValue(codigoCupon)
    setModalVisible(true);
  };

  const formatInput = (text) => {
    // Elimina caracteres no numéricos
    const formattedText = text.replace(/[^\d]/g, '');

    // Aplica el formato según la longitud
    if (formattedText.length === 6) {
      setInputValue(`${formattedText.slice(0, 1)}-${formattedText.slice(1)}`);
    } else if (formattedText.length === 7) {
      setInputValue(`${formattedText.slice(0, 2)}-${formattedText.slice(2)}`);
    } else if (formattedText.length === 8) {
      setInputValue(`${formattedText.slice(0, 3)}-${formattedText.slice(3)}`);
    } else if (formattedText.length >= 9) {
      setInputValue(`${formattedText.slice(0, 4)}-${formattedText.slice(4)}`);
    } else {
      setInputValue(formattedText);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.titleContain}>
          <Text style={styles.title}>TucuPon</Text>
        </View>
        <View style={styles.descriptionContain}>
          <Text style={styles.description}>Coloca el codigo del cupon y verifica su informacion</Text>
          {message && <Text style={styles.message}>Por favor ingresa un numero de cupon</Text>}
        </View>
        <View style={styles.containerInput}>
          <TextInput
            placeholder="XX-XXXXX"
            value={inputValue}
            onChangeText={formatInput}
            keyboardType="numeric"
            maxLength={9}
            style={styles.inputCupon}
          />
        </View>
        <TouchableOpacity style={[styles.buttonVerificar, styles.shadow]} title="Verificar cupon" onPress={handleConsultar}>
          <Text style={styles.appButtonText}>Verificar cupon</Text>
        </TouchableOpacity>
      </View>
      <ConsultaDB setInputValue={setInputValue} inputValue={inputValue} closeModal={closeModal} visible={modalVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonVerificar: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: '#97AF41',
    borderRadius: 20,
  },
  appButtonText: {
    textAlign: 'center',
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  containerInput: {
    borderWidth: 4,
    borderColor: "#5B6B22",
    borderStyle: "dashed",
    borderRadius: 20,
    padding: 13,
    alignItems: 'center',
    marginBottom: 20
  },
  inputCupon: {
    fontSize: 22,
    textAlign: 'center',
    width: "100%"
  },
  titleContain: {
    alignItems: "center",
  },
  descriptionContain: {
    alignItems: "center",
    marginBottom: 15
  },
  title: {
    fontSize: 45,
    color: "#5B6B22",
    fontWeight: "bold"
  },
  message: {
    fontSize: 15,
    color: "#5B6B22",
    fontWeight: "bold",
    textAlign: "center"
  },
  description: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center"
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
});
