import styles from '../Section/styles';
import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Divider} from 'react-native-paper';
import HTML from 'react-native-render-html';

const FAQListItem = ({question, answer}) => {
  const [faqExpanded, setFaqExpanded] = useState(false);

  const expandFAQ = () => {
    setFaqExpanded(!faqExpanded);
  };

  return (
    <View style={styles.questionsContainer}>
      <View
        style={
          faqExpanded ? styles.expandedQuestion : styles.collapsedQuestion
        }>
        <View
          style={[
            styles.singleQuestionContainer,
            {marginTop: faqExpanded ? 18.5 : 0},
          ]}>
          <Text style={styles.faqQuestion}>{question}</Text>
          <TouchableOpacity onPress={expandFAQ}>
            <Image
              style={styles.expansionButton}
              source={
                !faqExpanded
                  ? require('./plusButton.png')
                  : require('./minusButton.png')
              }
            />
          </TouchableOpacity>
        </View>
        {faqExpanded && (
          <>
            <View style={styles.expandedAnswer}>
              <Divider style={[styles.faqDivider, {marginBottom: 24}]} />
              <HTML
                style={styles.answer}
                source={{html: answer}}
                contentWidth={271}
              />
              <View />
            </View>
          </>
        )}
      </View>
      <Divider style={styles.faqDivider} />
    </View>
  );
};

export default FAQListItem;
