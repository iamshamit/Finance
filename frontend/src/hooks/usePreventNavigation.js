// src/hooks/usePreventNavigation.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const usePreventNavigation = (hasUnsavedChanges) => {
  const navigate = useNavigate();
  const [showPrompt, setShowPrompt] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    const handleNavigationAttempt = (e) => {
      if (!hasUnsavedChanges) return;
      
      e.preventDefault();
      setShowPrompt(true);
      setPendingNavigation(e.target.pathname);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.querySelectorAll('a[href]').forEach(link => {
      link.addEventListener('click', handleNavigationAttempt);
    });

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.querySelectorAll('a[href]').forEach(link => {
        link.removeEventListener('click', handleNavigationAttempt);
      });
    };
  }, [hasUnsavedChanges]);

  const handleConfirmNavigation = () => {
    setShowPrompt(false);
    if (pendingNavigation) {
      navigate(pendingNavigation);
    }
  };

  const handleCancelNavigation = () => {
    setShowPrompt(false);
    setPendingNavigation(null);
  };

  return { showPrompt, handleConfirmNavigation, handleCancelNavigation };
};