import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import baseUrl from '../../helpers/baseUrl';
import userState from '../../helpers/userState';
import {createToken} from '../../redux/actions/createToken';

export async function sendToEmailService(startDate, endDate) {
  const uid = userState.getUserStateId();

  const header = await createToken();
  const params = new URLSearchParams({
    uid,
    startDate,
    endDate,
  });

  try {
    return await axios.get(`${baseUrl}reports/sendToEmail?${params}`, header);
  } catch (err) {
    console.log('Error', err);
  }
}

export async function saveToPhoneService(startDate, endDate) {
  const uid = userState.getUserStateId();

  const header = await createToken();
  const params = new URLSearchParams({
    uid,
    startDate,
    endDate,
  });

  try {
    const response = await axios.get(
      `${baseUrl}reports/download?${params}`,
      header,
    );

    if (response?.status === 204) {
      return response;
    }

    const downloadLink = baseUrl + response.data?.downloadLink;
    const {config, fs} = RNFetchBlob;
    const downloads = fs.dirs.DownloadDir;

    const fileName = 'Nature_Counter_Progress_Report.pdf';
    const filePath = `${downloads}/${fileName}`;

    await config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: fileName,
        path: filePath,
      },
    }).fetch('GET', downloadLink);

    return {status: response.status, filePath};
  } catch (err) {
    console.log('Error', err);
  }
}

export async function deleteReportService() {
  const uid = userState.getUserStateId();

  const header = await createToken();

  try {
    return await axios.delete(`${baseUrl}reports/delete?uid=${uid}`, header);
  } catch (err) {
    console.log('Error', err);
  }
}
