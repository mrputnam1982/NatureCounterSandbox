import RNFS from 'react-native-fs';

const profilePicturesDir = `${RNFS.DocumentDirectoryPath}/profilePictures`;

export default async function saveProfilePicture(uri, fileName) {
  const dirExists = await RNFS.exists(profilePicturesDir);
  if (!dirExists) {
    await RNFS.mkdir(profilePicturesDir);
  }
  const fileUri = `${profilePicturesDir}/${fileName}`;
  await RNFS.copyFile(uri, fileUri);
  return `file://${fileUri}`;
}
