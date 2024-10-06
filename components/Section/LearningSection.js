import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  Picker,
  TouchableOpacity,
  Linking,
  Pressable,
} from "react-native";

const LearningSection = () => {

    const url = "https://lms.crowddoing.world/login/index.php";

    return (Linking.openURL(url));

}

export default LearningSection;