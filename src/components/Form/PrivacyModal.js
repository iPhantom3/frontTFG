import React, { useState } from 'react'
import { StyleSheet, Modal, TouchableOpacity, View, Text, ScrollView } from 'react-native'

import CloseModalButton from '../ViewData/CloseModalButton';

export default PrivacyModal = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState({});

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{flex: 1}} onPress={() => setModalVisible(!modalVisible)}>
        <Text style={styles.privacyLink}>Política de privacidad</Text>
      </TouchableOpacity>
      <Modal
        animationType= 'slide'
        transparent= {true}
        visible= {modalVisible}
      >
        <ScrollView style={styles.modalContainer}>
          <CloseModalButton setModalVisible={setModalVisible} />
          <Text style={styles.privacyText}>{`     Esta politíca expresa cómo se tratará y protegerá la informacion personal de todas las personas que se relacionen con EuroTaller a través de esta aplicación. Por favor, deber leer todos los apartados de los Términos y condiciones y de la presente Política de Privacidad antes de utilizar esta web.
          
          De conformidad con los dispuesto en el Reglamento UE 2016/679, del Parlamento Europeo y del Consejo del 27 de abril de 2016 (RGPD) y de la Ley Orgánica 3/2018, del 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales, EuroTaller te informa que mediante la aceptación de esta Política de Privacidad, prestas tu consentimiento expreso, informado, libre e inequívoco para que los datos que proporcionas, y sobre los que se aplican las medidas de seguridad, técnicas y organizativas previstas en la normativa vigente, sean tratados por EuroTaller, como responsable del tratamiento.

          Los datos de carácter personal que pudiésemos recabar directamente del interesado a través de EuroTaller App serán tratados de forma confidencial y quedarán incorporados a la correspondiente actividad de tratamiento titularidad de EuroTaller.
          
          Adicionalmente, aclarar los subsiguientes apartados:

          1. Finalidad
          -Envío de comunicaciones comerciales sobre productos o servicios de EuroTaller.
          
          2. Legitimación
          -Consetimiento del titular de los datos a la contratación e interés legítimo del responsable para el envío de comunicaciones comerciales.
          
          3. Destinatarios
          -Los consentidos expresamente por el titular de los datos para el cumplimiento de las finalidades antedichas y los que por imperativo legal resulten exigibles al responsable.
          
          4. Derechos
          -Tiene derechos a acceder, a rectificar, a suprimir sus datos, a solicitar la portabilidad de los mismos y a oponerse o limitar el tratamiento.
          `}</Text>
        </ScrollView>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  privacyLink: {
    color: 'blue',
    fontSize: 18,
    textDecorationLine: 'underline'
  },
  privacyText:{
    fontSize: 16,
    marginTop: 50,
    paddingHorizontal: 10,
    paddingVertical: 20,
    textAlign: 'justify'
  }
})