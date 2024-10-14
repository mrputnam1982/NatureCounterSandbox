import {Platform} from 'react-native';

// for local dev - uncomment this line and comment out the next line
const baseUrl =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:3000/'
    : 'http://localhost:3000/';

// for deployment - uncomment this line and comment out the previous line
// const baseUrl =
//   'https://nature-counter-container.blackisland-d94d206d.centralus.azurecontainerapps.io/';

// const baseUrl = 'http://10.0.2.2:5000/';
// const baseUrl = 'https://ad973f2adfb39eab0.awsglobalaccelerator.com/'
// const baseUrl = 'http://18.118.197.111/'

export default baseUrl;
