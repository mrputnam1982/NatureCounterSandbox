import {useEffect, useState} from 'react';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import baseUrl from '../helpers/baseUrl';

const useTimedBenefits = time => {
  const [benefits, setBenefits] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const token = await auth().currentUser.getIdToken();
        const config = {
          headers: {Authorization: `Bearer ${token}`},
        };
        const response = await axios.get(`${baseUrl}benefits/`, config);
        const gainedBenefits = response.data
          .map(category => {
            const filteredBenefits = category.benefits.filter(
              benefit => benefit.time <= (time ?? Number.MAX_SAFE_INTEGER),
            );
            return {
              ...category,
              benefits: filteredBenefits,
            };
          })
          .filter(category => category.benefits.length > 0);
        setBenefits(gainedBenefits);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBenefits();
  }, [time]);

  return {benefits, isLoading, error};
};

export default useTimedBenefits;
