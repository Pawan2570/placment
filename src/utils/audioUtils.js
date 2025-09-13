// Audio utility for timer completion sound
export const createFinishTone = () => {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  
  return () => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 880;
    
    gainNode.gain.setValueAtTime(0.0001, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
    oscillator.stop(ctx.currentTime + 0.9);
  };
};

// Notification utility
export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) return false;
  if (Notification.permission === 'granted') return true;
  
  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

export const showNotification = async (title, body) => {
  const hasPermission = await requestNotificationPermission();
  
  if (hasPermission) {
    try {
      new Notification(title, { body });
    } catch (error) {
      console.warn('Notification failed:', error);
    }
  }
};
