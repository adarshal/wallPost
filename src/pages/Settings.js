import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../hooks';
import styles from '../styles/settings.module.css';
// from const auth we will get current user details
//at auth.user?.email}  it will check if user authorised or null null if auth then .email added else undefined
const Settings = () => {
  const auth = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(auth.user?.name ? auth.user.name : '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingForm, setSavingForm] = useState(false);
  const { addToast } = useToasts();

const clearForm=()=>{
    setConfirmPassword('')
    setPassword('')
}

  const updateProfile = async() => {
    setSavingForm(true);
    let error = false;
    if (!name || !confirmPassword || !password) {
      addToast("Please fill all details", {
        appearance: 'error',
      });
      error = true;
    }
    if (password !== confirmPassword) {
        addToast('password and confirm password mismatch', {
          appearance: 'error',
          autoDismiss: true,
        });
        error = true;
      }
      if(error){
        return setSavingForm(false)
      }
    const response = await  auth.updateUser(auth.user._id,name,  password, confirmPassword);
      if(response.success){
        setSavingForm(false);
        setEditMode(false)
        clearForm()
        return addToast('User updated successfully',
        {appearance:'success'})
      }else{
        addToast(response.message,
        {appearance:'error'})
      }

    setSavingForm(false);
  };
  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/3917/3917058.png"
          alt="img"
        />
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email </div>

        <div className={styles.fieldValue}>{auth.user?.email} </div>
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name </div>
        {editMode ? (
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        ) : (
          <div className={styles.fieldValue}>{auth.user?.name} </div>
        )}
      </div>

      {editMode && (
        <div>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>
            <input
          placeholder="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
            
            </div>
          </div>
          <div className={styles.field}>
            <div
              className={styles.fieldLabel}>
              
            
              Confirm password
            </div>
            <input type="password" onChange={(e) => {
                setConfirmPassword(e.target.value);
              }} />
          </div>
        </div>
      )}
      <div className={styles.btnGrp}>
        {editMode ? (
          <>
            <button
              className={`button ${styles.saveBtn}`}
              onClick={updateProfile}
              disabled={savingForm}
            >
              {savingForm ? 'Saving Form' : 'Save Profile'}
            </button>
            <button
              className={`button ${styles.editBtn}`}
              onClick={() => {
                setEditMode(false);
              }}
            >
              Go Back
            </button>
          </>
        ) : (
          <button
            className={`button ${styles.editBtn}`}
            onClick={() => {
              setEditMode(true);
            }}
          >
            Edit profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Settings;
