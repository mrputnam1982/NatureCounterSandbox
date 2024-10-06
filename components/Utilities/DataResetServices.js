import auth from '@react-native-firebase/auth';
import axios from 'axios';
import baseUrl from '../../helpers/baseUrl';
import { createToken } from '../../redux/actions/createToken';

export async function resetDataService() {
  const uid = auth().currentUser.uid;
  const header = await createToken();

  try {
    return await axios.delete(
      `${baseUrl}journal/allentries?uid=${uid}`,
      header,
    );
  } catch (err) {
    console.log('Error', err);
  }
}

export async function deleteAccountService() {
  const uid = auth().currentUser.uid;
  const header = await createToken();

  try {
    return await axios.delete(`${baseUrl}userdetails/${uid}`, header);
  } catch (err) {
    console.log('Error', err);
  }
}
