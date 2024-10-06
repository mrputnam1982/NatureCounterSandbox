import React, {useState} from 'react';
import BenefitsModal from './BenefitsModal';
import benefits from '../../helpers/benefits';

const withBenefitsModal = WrappedComponent => {
  const withBenefitsModal = props => {
    const [showModal, setShowModal] = useState(false);
    const [selectedBenefitIndex, setSelectedBenefitIndex] = useState(0);
    const selectedBenefit = benefits[selectedBenefitIndex];

    const handlePressBenefit = index => {
      setSelectedBenefitIndex(index);
      setShowModal(true);
    };

    return (
      <>
        <BenefitsModal
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
          selectedBenefit={selectedBenefit}
          selectedBenefitIndex={selectedBenefitIndex}
          onPressBack={() => setSelectedBenefitIndex(selectedBenefitIndex - 1)}
          onPressNext={() => setSelectedBenefitIndex(selectedBenefitIndex + 1)}
        />
        <WrappedComponent {...props} onPressBenefit={handlePressBenefit} />
      </>
    );
  };

  return withBenefitsModal;
};

export default withBenefitsModal;
