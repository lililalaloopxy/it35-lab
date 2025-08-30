import { 
  IonAlert,
  IonAvatar,
  IonButton,
  IonContent, 
  IonIcon, 
  IonInput, 
  IonInputPasswordToggle,  
  IonPage,  
  IonToast,  
  useIonRouter
} from '@ionic/react';
import { logoIonic } from 'ionicons/icons';
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header="Notification"
      message={message}
      buttons={['OK']}
    />
  );
};

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const doLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
      return;
    }

    setShowToast(true); 
    setTimeout(() => {
      navigation.push('/it35-lab/app', 'forward', 'replace');
    }, 300);
  };
  
  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <div style={{
          display: 'flex',
          flexDirection:'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop:'25%'
        }}>
          <IonAvatar
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '150px',
              height: '150px',
              borderRadius: '50%', 
              overflow: 'hidden' 
            }}
          >
            <img 
             src="https://scontent.fmnl9-6.fna.fbcdn.net/v/t1.15752-9/494576848_23899999479597700_8614270150901344207_n.jpg?stp=dst-jpg_p480x480_tt6&_nc_cat=103&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeEFSaEQ5HE73HcpWGrUw1mchpsED1k7fceGmwQPWTt9x95Xg99A_Bl3lcHqn9U_TMXz8mcyfRRnhfD1bkF-Zqsw&_nc_ohc=nYNhmGs6CXUQ7kNvwHuXD7M&_nc_oc=AdnRJ7eIrF0uw_YDrZl8mX48Ey2tvVIMjmqe-HE4LaVVqWanM92K9dZfDBYhPDPCnJg&_nc_ad=z-m&_nc_cid=1066&_nc_zt=23&_nc_ht=scontent.fmnl9-6.fna&oh=03_Q7cD2AESXMDAKgZPNT0h4VNhgvrmn8dLjFiaXh5gPeYM_oWtYw&oe=683AC4AC" 
             alt="User Avatar" 
             style={{ width: '100%', height: '100%' }} 
            />
          </IonAvatar>
          <h1 style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>USER LOGIN</h1>
          <IonInput
            label="Email" 
            labelPlacement="floating" 
            fill="outline"
            type="email"
            placeholder="Enter Email"
            value={email}
            onIonChange={e => setEmail(e.detail.value!)}
          />
          <IonInput style={{ marginTop:'10px' }}      
            fill="outline"
            type="password"
            placeholder="Password"
            value={password}
            onIonChange={e => setPassword(e.detail.value!)}
          >
            <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
          </IonInput>
        </div>
        <IonButton onClick={doLogin} expand="full" shape='round'>
          Login
        </IonButton>

        <IonButton routerLink="/it35-lab/register" expand="full" fill="clear" shape='round'>
          Don't have an account? Register here
        </IonButton>

        {/* Reusable AlertBox Component */}
        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />

        {/* IonToast for success message */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Login successful! Redirecting..."
          duration={1500}
          position="top"
          color="primary"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;