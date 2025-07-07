import { useState } from 'react';
import '../assets/styles/Accessibility.css';
import { useTranslation } from 'react-i18next';
import { useAccessibility } from '../hooks/useAccessibility';
import Button from './Button';

const Accessibility = () => {
  const { t } = useTranslation();
  const {
    increaseFont,
    decreaseFont,
    toggleContrast,
    toggleDarkMode,
    resetAccessibility,
  } = useAccessibility();

  const [showPanel, setShowPanel] = useState(false);
  const togglePanel = () => setShowPanel(prev => !prev);

  return (
    <div className="accessibility-container">
      <div className={`accessibility-panel ${showPanel ? 'open' : ''}`}>
        <Button size="icon" onClick={increaseFont} title={t('accessibility.increaseFont')}>
          <i className="fas fa-plus"></i>
        </Button>
        <Button size="icon" onClick={decreaseFont} title={t('accessibility.decreaseFont')}>
          <i className="fas fa-minus"></i>
        </Button>
        <Button size="icon" onClick={toggleDarkMode} title={t('accessibility.darkMode')}>
          <i className="fas fa-moon"></i>
        </Button>

        <Button size="icon" onClick={toggleContrast} title={t('accessibility.highContrast')}>
          <i className="fas fa-adjust"></i>
        </Button>
        <Button size="icon" onClick={resetAccessibility} title={t('accessibility.reset')}>
          <i className="fas fa-sync-alt"></i>
        </Button>
        <a
          href="https://www.centroderelevo.gov.co/"
          target="_blank"
          rel="noopener noreferrer"
          title={t('accessibility.relayCenter')}
        >
          <i className="fas fa-sign-language"></i>
        </a>
      </div>

      <Button
        size='padding-0'
        variant='accessibility'
        className="accessibility-toggle"
        onClick={togglePanel}
        aria-label={t('accessibility.openMenu')}
      >
        <i className="fas fa-universal-access"></i>
      </Button>
    </div>
  );
};

export default Accessibility;