import React, {useRef, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  Text,
  Modal,
} from 'react-native';
import {Button} from '../Button';
import privacyPolicy from '../../public/text/privacyPolicy';
import termsPolicy from '../../public/text/termsOfUse';

const PrivacyAndTerms = ({visibility, toggleVisibility}) => {
  const [onPrivacyModal, setOnPrivacyModal] = useState(true);

  // to reset the scrollview to the top when the modal is opened
  const scrollViewRef = useRef();

  const resetPageState = () => {
    toggleVisibility('');
    setOnPrivacyModal(true);
  };

  const handleNextButton = () => {
    setOnPrivacyModal(false);
    scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: true});
  };

  const handleBackButton = () => {
    setOnPrivacyModal(true);
    scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: true});
  };

  return (
    <>
      <Modal
        visible={visibility}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          toggleVisibility('');
        }}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <ScrollView style={styles.scrollContainer} ref={scrollViewRef}>
              <TouchableOpacity onPress={resetPageState} style={styles.exitBtn}>
                <Text style={{fontSize: 20}}>X</Text>
              </TouchableOpacity>
              <Text style={styles.title}>
                {onPrivacyModal ? 'Privacy Policy' : 'Terms of Use'}
              </Text>
              <Text style={styles.subtitle}>Introduction</Text>
              <Text style={styles.paragraph}>
                {onPrivacyModal ? privacyPolicy : termsPolicy}
              </Text>
            </ScrollView>
            <View style={styles.modalButtons}>
              {onPrivacyModal ? (
                <Button
                  style={{
                    flex: 1,
                    padding: 10,
                    alignItems: 'center',
                  }}
                  onPress={resetPageState}
                  type="white"
                  label="Close"
                  size="small"
                />
              ) : (
                <Button
                  style={{
                    flex: 1,
                    padding: 10,
                    alignItems: 'center',
                  }}
                  onPress={handleBackButton}
                  type="white"
                  label="Back"
                  size="small"
                />
              )}
              {onPrivacyModal ? (
                <Button
                  style={{
                    flex: 1,
                    padding: 10,
                    alignItems: 'center',
                  }}
                  onPress={handleNextButton}
                  type="green"
                  label="Next"
                  size="small"
                />
              ) : (
                <Button
                  style={{
                    flex: 1,
                    padding: 10,
                    alignItems: 'center',
                  }}
                  onPress={resetPageState}
                  type="green"
                  label="Close"
                  size="small"
                />
              )}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  exitBtn: {
    alignItems: 'flex-end',
    padding: 10,
  },
  container: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    height: '80%',
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    elevation: 5,
    padding: 5,
    margin: 0,
    alignItems: 'center',
  },
  scrollContainer: {
    margin: 10,
    marginBottom: 30,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default PrivacyAndTerms;
