import React, { useState } from 'react';
import {
  Image,
  Linking,
  Picker,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Divider, Snackbar } from 'react-native-paper';
import { Button } from '../Button';
import FAQListItem from '../HelpCenter/FAQListItem.js';
import TextInput from '../Input/TextInput';
import Modal from '../Utilities/Modal.js';
import faqs from './faqs.js';
import styles from './styles.js';
import useAddBackButton from "../../components/Utilities/useAddBackButton";
import { useNavigation } from '@react-navigation/native';

const HelpCenterSection = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [email, setEmail] = useState(null);
  const [text, setText] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigation = useNavigation();

  useAddBackButton(navigation, true);

  const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const sendEmail = () => {
    const subject = selectedTopic;
    const body = text;
    const recipient = 'nc_customerservice@crowddoing.world';
    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;
    Linking.openURL(mailtoUrl);
    setShowModal(!showModal);
    setEmailSent(true);
    setEmail(null);
    setText(null);
  };

  return (
    <ScrollView>
      <View>
        <Image
          style={styles.helpCenterImage}
          source={require('./HelpCenter-headerGraphic.png')}
        />
      </View>
      <View style={styles.faqContainer}>
        <View style={styles.faqSection}>
          <Text style={styles.faqTitle}> FAQ </Text>
        </View>
        <Divider style={styles.faqOuterDivider} />
        <View />
        {faqs.map((faq, index) => (
          <FAQListItem
            key={index}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
        <Divider style={styles.faqOuterDivider} />
      </View>
      <Snackbar
        visible={emailSent}
        onDismiss={() => setEmailSent(false)}
        duration={5000}
        wrapperStyle={{bottom: 50}}>
        Email Submitted.
      </Snackbar>
      <View style={styles.contactUsContainer}>
        <View style={styles.contactUsSection}>
          <Text style={styles.contactUs}>Contact Us</Text>
        </View>
      </View>
      <View style={styles.topicContainer}>
        <View style={styles.topicSection}>
          <Text style={styles.topicQuestion}> How can we help?</Text>
        </View>
      </View>
      <View style={styles.dropdownContainer}>
        <Picker
          mode="dropdown"
          key={emailSent ? 'reload-picker' : 'default-picker'}
          style={styles.pickerStyle}
          selectedTopic={selectedTopic}
          onValueChange={(itemValue, itemIndex) => setSelectedTopic(itemValue)}>
          <Picker.Item label="Select Topic" enabled={false} color="grey" />
          <Picker.Item label="Report Issues" value="Report Issues" />
          <Picker.Item label="Suggest Article" value="Suggest Article" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>
      {/*{selectedTopic && !emailSent && (*/}
        <View style={styles.emailContainer}>
          <View style={styles.contactEmailSection}>
            <Text style={styles.contactEmailText}> Contact Email </Text>
          </View>
          <TextInput
            style={styles.emailInputBox}
            placeholder="Email"
            value={email}
            onChangeText={em => {
              if (em.trim().length > 0) {
                setEmail(em.trim());
              } else setEmail(null);
            }}
          />
        </View>
      {/* })} */}
      {selectedTopic && validateEmail(email) && !emailSent && (
        <View style={styles.messageContainer}>
          <View style={styles.messageSection}>
            <Text style={styles.message}> Let us know what happened </Text>
          </View>
          <TextInput
            style={styles.textBox}
            multiline={true}
            numberofLines={10}
            placeholder="Type Here"
            value={text}
            onChangeText={text => {
              if (text.trim().length > 0) {
                setText(text);
              } else setText(null);
            }}
          />
        </View>
      )}
      {selectedTopic && email && !emailSent && (
        <Button
          label="Submit"
          onPress={validateEmail(email) ? sendEmail : null}
          type={validateEmail(email) ? 'green' : 'transparent'}
        />
      )}
      <Modal active={showModal} setActive={setShowModal} autoHeight>
        <View style={styles.modalContainer}>
          <Image
            style={styles.modalImage}
            source={require('./SymptomsElements.png')}
          />
          <Text style={styles.modalBold}>Contacting Nature Counter</Text>
          <Text style={styles.modalText}>
            Thank you for bringing this to our attention. We have received your
            report and will reach out to you via the email you provided. Please
            give us 3 to 5 business days to respond.
          </Text>
          <TouchableOpacity
            style={styles.buttonModal}
            onPress={() => setShowModal(!showModal)}>
            <Text style={styles.buttonTextModal}> Got it </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default HelpCenterSection;
