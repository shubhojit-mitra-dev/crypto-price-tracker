import { useEffect, useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import { fetchCryptoSuccess } from './features/crypto/cryptoSlice';
import { sampleCryptoData } from './services/sampleData';
import { cryptoSocketService } from './services/cryptoSocketService';
import { CryptoHeader } from './components/crypto/CryptoHeader';
import { CryptoTable } from './components/crypto/CryptoTable';

// Main content wrapper component
const CryptoTracker = () => {
  const dispatch = useDispatch();
  const [isUpdating, setIsUpdating] = useState(false);

  // Load initial data
  useEffect(() => {
    dispatch(fetchCryptoSuccess(sampleCryptoData));
  }, [dispatch]);

  // Handle toggling live updates
  const handleToggleUpdates = () => {
    if (isUpdating) {
      cryptoSocketService.stop();
    } else {
      cryptoSocketService.start();
    }
    setIsUpdating(!isUpdating);
  };

  return (
    <div className="container py-8 mx-auto">
      <CryptoHeader 
        isUpdating={isUpdating} 
        onToggleUpdates={handleToggleUpdates} 
      />
      <CryptoTable />
    </div>
  );
};

// Root App component with Redux Provider
const App = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-background">
        <CryptoTracker />
      </div>
    </Provider>
  );
};

export default App;