import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilePdf,
  faChevronDown,
  faEye,
  faDownload,
} from '@fortawesome/free-solid-svg-icons';
import {
  RESUME_URL,
  RESUME_VIEW_URL,
  RESUME_FILE_NAME,
  downloadResume,
} from '../../utils/resume';
import { trackEvent } from '../../utils/analytics';
import './ResumeMenu.scss';

// One navbar control for the résumé: the button opens a two-item menu
// (View / Download) rather than adding two separate items. The same actions
// also live in the Resume section and the command palette.
const ResumeMenu = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const handleView = () => {
    trackEvent('select_content', {
      content_type: 'resume',
      content_id: 'resume_view',
    });
    window.open(RESUME_VIEW_URL, '_blank', 'noopener,noreferrer');
    setOpen(false);
  };

  const handleDownload = () => {
    // Matches GA4's recommended file_download schema — Enhanced Measurement's
    // automatic file-download detection must stay OFF for this stream or the
    // click is counted twice (see Resume.jsx for the same note).
    trackEvent('file_download', {
      file_name: RESUME_FILE_NAME,
      file_extension: 'pdf',
      link_url: RESUME_URL,
      link_text: 'Download Resume',
    });
    downloadResume();
    setOpen(false);
  };

  return (
    <div className="resume-menu" ref={ref}>
      <button
        type="button"
        className="resume-menu__trigger"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Résumé options"
      >
        <FontAwesomeIcon icon={faFilePdf} className="resume-menu__file-icon" />
        <span className="resume-menu__label">Résumé</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`resume-menu__caret${open ? ' is-open' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            className="resume-menu__pop"
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
          >
            <button type="button" role="menuitem" onClick={handleView}>
              <FontAwesomeIcon icon={faEye} />
              View
            </button>
            <button type="button" role="menuitem" onClick={handleDownload}>
              <FontAwesomeIcon icon={faDownload} />
              Download
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeMenu;
