import React from 'react';
import {Text, StyleSheet} from 'react-native';

/**
 *
 * @param errorMsg
 * @return {JSX.Element}
 * @constructor
 */
const ErrorPrompt = ({ errorMsg }) => errorMsg && <Text style={styles.errorLabel}>{errorMsg}</Text>;

export default ErrorPrompt;

const styles = StyleSheet.create({
  errorLabel: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 16,
  },
});
