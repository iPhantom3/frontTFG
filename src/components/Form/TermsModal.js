import React, { useState } from 'react'
import { StyleSheet, Modal, TouchableOpacity, View, Text, ScrollView } from 'react-native'

import CloseModalButton from '../ViewData/CloseModalButton';

export default TermsModal = () => {

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{flex: 1}} onPress={() => setModalVisible(!modalVisible)}>
        <Text style={styles.termsLink}>Términos y condiciones</Text>
      </TouchableOpacity>
      <Modal
        animationType= 'slide'
        transparent= {true}
        visible= {modalVisible}
      >
        <ScrollView style={styles.modalContainer}>
          <CloseModalButton setModalVisible={setModalVisible} />
          <Text style={styles.termsText}>
            {`      Todos los términos y condiciones establecidos en el presente (en lo sucesivo referidos conjuntamente como los "Términos de Uso") aplican para toso los usuarios (en lo sucesivo, el "Usuario") de Eurotaller y todos los servicios relacionados, existiendo en el presente o en el futuro (en lo sucesivo referidos conjuntamente como el "Servicio").
            
            1. Algunas definiciones
            Para los efectos del presente, 1.1 "contenido" significa cualquier y todo contenido, información, datos y materiales, incluyendo, sin la limitacion, textos, imagenes, fotografías, videos, música, gráficos, insignias, iconos, software y código fuente. 1.2 "Contenido" significa contenido hecho disponible en nuestros Servicio (sea por nosotros o por Usuarios). 1.3 "Anuncio del Usuario" significa cualquier Contenido anunciado, presentado, mostrado, exhibido, cargado, distribuido, transmitido, ofrecido o proporcionado por un Usuario. 1.4 "Términos Adicionales" significa los terminos y condiciones establecidos.
            
            2. Aceptacion de los Términos de Uso
            2.1. Uster conviene y acepta expresamente estar sujeto a los Términos de Uso y cumplir con los mismos. En caso de no estar de acuerdo con los Términos de Uso, favor de no ingresar o utilizar a cualquier Servicio o Contenido de nuestro Servicio. 2.2. Los niños menores de 15 años siempre deberán pedir el permiso de sus padres o guardianes antes de ingresar o utilizar a cualquier Servicio. Adicionalmente, los Usuarios de negocios conviene y acepta expresamente estar sujeto a los Términos de Uso y cumplir con los mismos. 2.3. Al tener acceso a nuestro Servicio, usted acepta adherirse a los Términos de Uso. 2.4. Asimismo, usted conviene y acepta expresamente estar sujeto a los Términos Adicionales y cumplir con los mismo (que forman parte integrante del presente).
            
            3. Modificación de los Términos de Uso
            Nos reservamos el derecho, a nuestra entera discreción, de actualizar o modificar los Términos de Uso o los Términos Adicionales en cualquier momento. Si realizamos cambios a los Términos de Uso, le informaremos fijando un aviso en nuestro sitio. De continuar utilizando nuestro Servicio después de tal aviso, usted acepta adherirse a los Términos de Uso según lo modificado. Usted siempre debería revisar y entender los Términos de Uso.
            
            4. Su Cuenta
            4.1. Como condición para su uso del Servicio, usted declara que toda información de registro que presenta es cierta y exacta, y matendrá la exactitud de dicha información. 4.2. Usted es plenamente responsable de mantener la confidencialidad de su clave de acceso. Usted es el único responsable por cualquier y todo uso y actividad en su cuenta, incluyendo usos y actividades por las personas que usted autorice o con los que comparta su clave de acceso. 4.3 Se puede cancelar la cuenta en cualquier momento. 4.4. Su registro y cuenta, si cualquiera, podrá cancelarse o darse por terminado sin notificación alguna si tenemos cualquier motivo para considerar que usted no está sujeto a y no cumple con los Términos de Uso. 4.5. Nos reservamos el derecho, a nuestra entrera discreción, de eliminar cualquier cuenta que ha estado inactivo durante un periodo superior a un año. 4.6. Usted está de acuerdo que si su cuenta es cancelada de acuerdo a estos Términos de Uso, usted no intentara reestablecer una cuenta nueva bajo cualquier otro nombre real o inventado. 4.7. Usted conviene en no utilizar la cuenta, nombre de Usuario o clave de acceso de otro Usuario en cualquier momentoo divulgar su clave de acceso a tercero alguno.`}
          </Text>
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
  termsLink: {
    color: 'blue',
    fontSize: 18,
    textDecorationLine: 'underline'
  },
  termsText:{
    fontSize: 16,
    marginTop: 50,
    paddingHorizontal: 10,
    paddingVertical: 20,
    textAlign: 'justify'
  }
})