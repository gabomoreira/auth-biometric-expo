import { useEffect, useState } from 'react';
import {  Alert, Button, Text, View } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication'

import { styles } from './styles';


export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false) 

  async function verifyAvaliableAuthentication() {
   const compatible = await LocalAuthentication.hasHardwareAsync() 
   console.log(compatible, 'compatible')

   const types = await LocalAuthentication.supportedAuthenticationTypesAsync()
                  .then((types) => types.map(type => LocalAuthentication.AuthenticationType[type]))
   console.log(types, 'types')
  }

  async function handleAuthentication() {
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync()
    console.log(isBiometricEnrolled, 'isBiometricEnrolled')

    if(!isBiometricEnrolled) {
      return Alert.alert('Login', 'Nenhuma biometria encontrada. Por favor cadastre no dispositivo.')
    }

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login com biometria',
      fallbackLabel: 'Biometria não reconhecida',
    })
    setIsAuthenticated(auth.success)
    console.log(auth, 'auth')
  }

  useEffect(() => {
    verifyAvaliableAuthentication()
  }, [])

  useEffect(() => {
    console.log(isAuthenticated)
  }, [isAuthenticated])

  return (
    <View style={styles.container}>
      <Text>
        Usuário conectado: {isAuthenticated ? 'Sim' : 'Não'}
      </Text>

      <Button title='Entrar' onPress={handleAuthentication} />
    </View>
  );
}
