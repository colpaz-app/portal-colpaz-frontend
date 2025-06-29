import { useState } from 'react';
import '../assets/styles/Accessibility.css';
import { useTranslation } from 'react-i18next';
import { useAccessibility } from '../hooks/useAccessibility';

const Accessibility = () => {
  const { t } = useTranslation();
  const {
    increaseFont,
    decreaseFont,
    toggleContrast,
    resetAccessibility,
  } = useAccessibility();

  const [showPanel, setShowPanel] = useState(false);
  const togglePanel = () => setShowPanel(prev => !prev);

  return (
    <div className="accessibility-container">
      <div className={`accessibility-panel ${showPanel ? 'open' : ''}`}>
        <button onClick={increaseFont} title={t('accessibility.increaseFont')}>
          <i className="fas fa-plus"></i>
        </button>
        <button onClick={decreaseFont} title={t('accessibility.decreaseFont')}>
          <i className="fas fa-minus"></i>
        </button>
        <button onClick={toggleContrast} title={t('accessibility.highContrast')}>
          <i className="fas fa-adjust"></i>
        </button>
        <button onClick={resetAccessibility} title={t('accessibility.reset')}>
          <i className="fas fa-sync-alt"></i>
        </button>
        <a
          href="http://sedboyaca.gov.co/"
          target="_blank"
          rel="noopener noreferrer"
          title={t('accessibility.secretary')}
        >
          <i className="fas fa-university"></i>
        </a>
        <a
          href="https://www.centroderelevo.gov.co/"
          target="_blank"
          rel="noopener noreferrer"
          title={t('accessibility.relayCenter')}
        >
          <i className="fas fa-sign-language"></i>
        </a>
      </div>

      <button
        className="accessibility-toggle"
        onClick={togglePanel}
        aria-label={t('accessibility.openMenu')}
      >
        <i className="fas fa-universal-access"></i>
      </button>
    </div>
  );
};

export default Accessibility;