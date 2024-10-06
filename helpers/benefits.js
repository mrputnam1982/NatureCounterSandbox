import BETTER_FOCUS_ACTIVE from '../assets/BETTER_FOCUS_ACTIVE.png';
import BETTER_FOCUS_INACTIVE from '../assets/BETTER_FOCUS_INACTIVE.png';
import BETTER_SLEEP_ACTIVE from '../assets/BETTER_SLEEP_ACTIVE.png';
import BETTER_SLEEP_INACTIVE from '../assets/BETTER_SLEEP_INACTIVE.png';
import BLOOD_PRESSURE_ACTIVE from '../assets/BLOOD_PRESSURE_ACTIVE.png';
import BLOOD_PRESSURE_INACTIVE from '../assets/BLOOD_PRESSURE_INACTIVE.png';
import GAIN_ENERGY_ACTIVE from '../assets/GAIN_ENERGY_ACTIVE.png';
import GAIN_ENERGY_INACTIVE from '../assets/GAIN_ENERGY_INACTIVE.png';
import HAPPINESS_ACTIVE from '../assets/HAPPINESS_ACTIVE.png';
import HAPPINESS_INACTIVE from '../assets/HAPPINESS_INACTIVE.png';
import IMMUNITY_ACTIVE from '../assets/IMMUNITY_ACTIVE.png';
import IMMUNITY_INACTIVE from '../assets/IMMUNITY_INACTIVE.png';
import LESS_ANXIETY_ACTIVE from '../assets/LESS_ANXIETY_ACTIVE.png';
import LESS_ANXIETY_INACTIVE from '../assets/LESS_ANXIETY_INACTIVE.png';
import LESS_DEPRESSION_ACTIVE from '../assets/LESS_DEPRESSION_ACTIVE.png';
import LESS_DEPRESSION_INACTIVE from '../assets/LESS_DEPRESSION_INACTIVE.png';
import LOWER_STRESS_ACTIVE from '../assets/LOWER_STRESS_ACTIVE.png';
import LOWER_STRESS_INACTIVE from '../assets/LOWER_STRESS_INACTIVE.png';
import MEMORY_ACTIVE from '../assets/MEMORY_ACTIVE.png';
import MEMORY_INACTIVE from '../assets/MEMORY_INACTIVE.png';
import MIND_ACTIVE from '../assets/MIND_ACTIVE.png';
import MIND_INACTIVE from '../assets/MIND_INACTIVE.png';
import POSITIVITY_ACTIVE from '../assets/POSITIVITY_ACTIVE.png';
import POSITIVITY_INACTIVE from '../assets/POSITIVITY_INACTIVE.png';

const benefits = [
  // {
  //   iconActive: BETTER_FOCUS_ACTIVE,
  //   iconInactive: BETTER_FOCUS_INACTIVE,
  //   name: 'Better Focus',
  // },
  // {
  //   iconActive: BETTER_SLEEP_ACTIVE,
  //   iconInactive: BETTER_SLEEP_INACTIVE,
  //   name: 'Better Sleep',
  // },
  {
    name: 'Gain Energy',
    iconActive: GAIN_ENERGY_ACTIVE,
    iconInactive: GAIN_ENERGY_INACTIVE,
    title: 'Feel more relaxed, yet energized',
    text:
      'Time in nature can result in a decrease in pulse rate (the physical sensation of a heart beat felt in the body) by 3.9%\nAmong healthy people, a lower resisting pulse rate is an indicator of a strong heart.',
    learnMoreUrl: 'https://app.riipen.com/projects/rV0M92Ol/details',
  },
  // {
  //   name: 'Increase Happiness',
  //   iconActive: HAPPINESS_ACTIVE,
  //   iconInactive: HAPPINESS_INACTIVE,
  // },
  // TODO: (David) There should be a healthier heart icon AND a Blood Pressure Icon that are different.
  // For now I'm just using the blood pressure one for both.
  {
    name: 'Healthier Heart',
    iconActive: BLOOD_PRESSURE_ACTIVE,
    iconInactive: BLOOD_PRESSURE_INACTIVE,
    title: 'Decrease in pulse rate by 3.9%',
    text:
      'Time in nature can result in a decrease in pulse rate (the physical sensation of a heart beat felt in the body) by 3.9%\nAmong healthy people, a lower resisting pulse rate is an indicator of a strong heart.',
    learnMoreUrl: 'https://crowddoing.world/',
  },
  // {
  //   name: 'Lower Anxiety',
  //   iconActive: LESS_ANXIETY_ACTIVE,
  //   iconInactive: LESS_ANXIETY_INACTIVE,
  // },
  // {
  //   name: 'Less Depression',
  //   iconActive: LESS_DEPRESSION_ACTIVE,
  //   iconInactive: LESS_DEPRESSION_INACTIVE,
  // },
  {
    name: 'Lower Blood Pressure',
    iconActive: BLOOD_PRESSURE_ACTIVE,
    iconInactive: BLOOD_PRESSURE_INACTIVE,
    title: 'Decrease systolic blood pressure 1.9%',
    text: 'Time in nature can result in a decrease in pulse rate',
    learnMoreUrl: 'https://bowvalleycollege.ca/',
  },
  // {
  //   name: 'Lower Stress',
  //   iconActive: LOWER_STRESS_ACTIVE,
  //   iconInactive: LOWER_STRESS_INACTIVE,
  // },
  // {
  //   name: 'Better Immunity',
  //   iconActive: IMMUNITY_ACTIVE,
  //   iconInactive: IMMUNITY_INACTIVE,
  // },
  // {
  //   name: 'Better Memory',
  //   iconActive: MEMORY_ACTIVE,
  //   iconInactive: MEMORY_INACTIVE,
  // },
  // {
  //   name: 'More Clarity',
  //   iconActive: MIND_ACTIVE,
  //   iconInactive: MIND_INACTIVE,
  // },
  // {
  //   name: 'More Positivity',
  //   iconActive: POSITIVITY_ACTIVE,
  //   iconInactive: POSITIVITY_INACTIVE,
  // },
];

export default benefits;
