import React, { useContext, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import CustomModal from './CustomModal';
import useCurrentUser from '../../hooks/useCurrentUser';
const DeleteAccountModal = ({
  visibility,
  toggleVisibility,
  logout,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const {user, updateUser} = useCurrentUser();

  const handleConfirmDelete = async () => {
    // make the deleted flag on the database as true
    await updateUser({
      ...user,
      deleted: true,
    });
    logout();
  };

  const handleDeleteAccount = () => {
    setConfirmDelete(true);
  };

  const handleCancel = () => {
    setConfirmDelete(false);
    toggleVisibility(false);
  };

  const title = 'Delete Account';
  const deleteText =
    'Once you delete your account, all your personal data ' +
    'connected to your account including your login information will be ' +
    'permanently deleted. Do you want to continue?';
  const confirmText =
    'Are you absolutely sure you want to delete your ' +
    'account? This action cannot be undone.\n' + 
    'Please log in again in order to continue deleting your account.' ;

  return (
    <>
      {!confirmDelete ? (
        <CustomModal
          visibility={visibility}
          toggleVisibility={toggleVisibility}
          title={title}
          text={deleteText}
          onConfirm={handleDeleteAccount}
          onClose={handleCancel}
        />
      ) : (
        <CustomModal
          visibility={visibility}
          toggleVisibility={toggleVisibility}
          title={title}
          text={confirmText}
          onConfirm={handleConfirmDelete}
          onClose={handleCancel}
        />
      )}
    </>
  );
};

export default DeleteAccountModal;
