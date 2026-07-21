import { useState } from 'react';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import Select from 'react-select';
import ReactCountryFlag from 'react-country-flag';
import emailjs from 'emailjs-com';
import { addMessage } from '../../firebase';
import { trackEvent } from './../../utils/analytics';
import { Logger, LogLevel } from '../../utils/logger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile, faFaceFrown } from '@fortawesome/free-regular-svg-icons';
import './Contact.scss';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: null,
    message: '',
  });
  const [status, setStatus] = useState('');

  const countries = [
    { value: 'AF', label: 'Afghanistan', code: 'AF' },
    { value: 'AL', label: 'Albania', code: 'AL' },
    { value: 'DZ', label: 'Algeria', code: 'DZ' },
    { value: 'AD', label: 'Andorra', code: 'AD' },
    { value: 'AO', label: 'Angola', code: 'AO' },
    { value: 'AG', label: 'Antigua and Barbuda', code: 'AG' },
    { value: 'AR', label: 'Argentina', code: 'AR' },
    { value: 'AM', label: 'Armenia', code: 'AM' },
    { value: 'AU', label: 'Australia', code: 'AU' },
    { value: 'AT', label: 'Austria', code: 'AT' },
    { value: 'AZ', label: 'Azerbaijan', code: 'AZ' },
    { value: 'BS', label: 'Bahamas', code: 'BS' },
    { value: 'BH', label: 'Bahrain', code: 'BH' },
    { value: 'BD', label: 'Bangladesh', code: 'BD' },
    { value: 'BB', label: 'Barbados', code: 'BB' },
    { value: 'BY', label: 'Belarus', code: 'BY' },
    { value: 'BE', label: 'Belgium', code: 'BE' },
    { value: 'BZ', label: 'Belize', code: 'BZ' },
    { value: 'BJ', label: 'Benin', code: 'BJ' },
    { value: 'BT', label: 'Bhutan', code: 'BT' },
    { value: 'BO', label: 'Bolivia', code: 'BO' },
    { value: 'BA', label: 'Bosnia and Herzegovina', code: 'BA' },
    { value: 'BW', label: 'Botswana', code: 'BW' },
    { value: 'BR', label: 'Brazil', code: 'BR' },
    { value: 'BN', label: 'Brunei', code: 'BN' },
    { value: 'BG', label: 'Bulgaria', code: 'BG' },
    { value: 'BF', label: 'Burkina Faso', code: 'BF' },
    { value: 'BI', label: 'Burundi', code: 'BI' },
    { value: 'KH', label: 'Cambodia', code: 'KH' },
    { value: 'CM', label: 'Cameroon', code: 'CM' },
    { value: 'CA', label: 'Canada', code: 'CA' },
    { value: 'CV', label: 'Cape Verde', code: 'CV' },
    { value: 'CF', label: 'Central African Republic', code: 'CF' },
    { value: 'TD', label: 'Chad', code: 'TD' },
    { value: 'CL', label: 'Chile', code: 'CL' },
    { value: 'CN', label: 'China', code: 'CN' },
    { value: 'CO', label: 'Colombia', code: 'CO' },
    { value: 'KM', label: 'Comoros', code: 'KM' },
    { value: 'CR', label: 'Costa Rica', code: 'CR' },
    { value: 'HR', label: 'Croatia', code: 'HR' },
    { value: 'CU', label: 'Cuba', code: 'CU' },
    { value: 'CY', label: 'Cyprus', code: 'CY' },
    { value: 'CZ', label: 'Czechia', code: 'CZ' },
    { value: 'DK', label: 'Denmark', code: 'DK' },
    { value: 'DJ', label: 'Djibouti', code: 'DJ' },
    { value: 'DM', label: 'Dominica', code: 'DM' },
    { value: 'DO', label: 'Dominican Republic', code: 'DO' },
    { value: 'CD', label: 'DR Congo', code: 'CD' },
    { value: 'EC', label: 'Ecuador', code: 'EC' },
    { value: 'EG', label: 'Egypt', code: 'EG' },
    { value: 'SV', label: 'El Salvador', code: 'SV' },
    { value: 'GQ', label: 'Equatorial Guinea', code: 'GQ' },
    { value: 'ER', label: 'Eritrea', code: 'ER' },
    { value: 'EE', label: 'Estonia', code: 'EE' },
    { value: 'SZ', label: 'Eswatini', code: 'SZ' },
    { value: 'ET', label: 'Ethiopia', code: 'ET' },
    { value: 'FJ', label: 'Fiji', code: 'FJ' },
    { value: 'FI', label: 'Finland', code: 'FI' },
    { value: 'FR', label: 'France', code: 'FR' },
    { value: 'GA', label: 'Gabon', code: 'GA' },
    { value: 'GM', label: 'Gambia', code: 'GM' },
    { value: 'GE', label: 'Georgia', code: 'GE' },
    { value: 'DE', label: 'Germany', code: 'DE' },
    { value: 'GH', label: 'Ghana', code: 'GH' },
    { value: 'GR', label: 'Greece', code: 'GR' },
    { value: 'GD', label: 'Grenada', code: 'GD' },
    { value: 'GT', label: 'Guatemala', code: 'GT' },
    { value: 'GN', label: 'Guinea', code: 'GN' },
    { value: 'GW', label: 'Guinea-Bissau', code: 'GW' },
    { value: 'GY', label: 'Guyana', code: 'GY' },
    { value: 'HT', label: 'Haiti', code: 'HT' },
    { value: 'HN', label: 'Honduras', code: 'HN' },
    { value: 'HU', label: 'Hungary', code: 'HU' },
    { value: 'IS', label: 'Iceland', code: 'IS' },
    { value: 'IN', label: 'India', code: 'IN' },
    { value: 'ID', label: 'Indonesia', code: 'ID' },
    { value: 'IR', label: 'Iran', code: 'IR' },
    { value: 'IQ', label: 'Iraq', code: 'IQ' },
    { value: 'IE', label: 'Ireland', code: 'IE' },
    { value: 'IL', label: 'Israel', code: 'IL' },
    { value: 'IT', label: 'Italy', code: 'IT' },
    { value: 'CI', label: 'Ivory Coast', code: 'CI' },
    { value: 'JM', label: 'Jamaica', code: 'JM' },
    { value: 'JP', label: 'Japan', code: 'JP' },
    { value: 'JO', label: 'Jordan', code: 'JO' },
    { value: 'KZ', label: 'Kazakhstan', code: 'KZ' },
    { value: 'KE', label: 'Kenya', code: 'KE' },
    { value: 'KI', label: 'Kiribati', code: 'KI' },
    { value: 'KW', label: 'Kuwait', code: 'KW' },
    { value: 'KG', label: 'Kyrgyzstan', code: 'KG' },
    { value: 'LA', label: 'Laos', code: 'LA' },
    { value: 'LV', label: 'Latvia', code: 'LV' },
    { value: 'LB', label: 'Lebanon', code: 'LB' },
    { value: 'LS', label: 'Lesotho', code: 'LS' },
    { value: 'LR', label: 'Liberia', code: 'LR' },
    { value: 'LY', label: 'Libya', code: 'LY' },
    { value: 'LI', label: 'Liechtenstein', code: 'LI' },
    { value: 'LT', label: 'Lithuania', code: 'LT' },
    { value: 'LU', label: 'Luxembourg', code: 'LU' },
    { value: 'MG', label: 'Madagascar', code: 'MG' },
    { value: 'MW', label: 'Malawi', code: 'MW' },
    { value: 'MY', label: 'Malaysia', code: 'MY' },
    { value: 'MV', label: 'Maldives', code: 'MV' },
    { value: 'ML', label: 'Mali', code: 'ML' },
    { value: 'MT', label: 'Malta', code: 'MT' },
    { value: 'MH', label: 'Marshall Islands', code: 'MH' },
    { value: 'MR', label: 'Mauritania', code: 'MR' },
    { value: 'MU', label: 'Mauritius', code: 'MU' },
    { value: 'MX', label: 'Mexico', code: 'MX' },
    { value: 'FM', label: 'Micronesia', code: 'FM' },
    { value: 'MD', label: 'Moldova', code: 'MD' },
    { value: 'MC', label: 'Monaco', code: 'MC' },
    { value: 'MN', label: 'Mongolia', code: 'MN' },
    { value: 'ME', label: 'Montenegro', code: 'ME' },
    { value: 'MA', label: 'Morocco', code: 'MA' },
    { value: 'MZ', label: 'Mozambique', code: 'MZ' },
    { value: 'MM', label: 'Myanmar', code: 'MM' },
    { value: 'NA', label: 'Namibia', code: 'NA' },
    { value: 'NR', label: 'Nauru', code: 'NR' },
    { value: 'NP', label: 'Nepal', code: 'NP' },
    { value: 'NL', label: 'Netherlands', code: 'NL' },
    { value: 'NZ', label: 'New Zealand', code: 'NZ' },
    { value: 'NI', label: 'Nicaragua', code: 'NI' },
    { value: 'NE', label: 'Niger', code: 'NE' },
    { value: 'NG', label: 'Nigeria', code: 'NG' },
    { value: 'KP', label: 'North Korea', code: 'KP' },
    { value: 'MK', label: 'North Macedonia', code: 'MK' },
    { value: 'NO', label: 'Norway', code: 'NO' },
    { value: 'OM', label: 'Oman', code: 'OM' },
    { value: 'PK', label: 'Pakistan', code: 'PK' },
    { value: 'PW', label: 'Palau', code: 'PW' },
    { value: 'PA', label: 'Panama', code: 'PA' },
    { value: 'PG', label: 'Papua New Guinea', code: 'PG' },
    { value: 'PY', label: 'Paraguay', code: 'PY' },
    { value: 'PE', label: 'Peru', code: 'PE' },
    { value: 'PH', label: 'Philippines', code: 'PH' },
    { value: 'PL', label: 'Poland', code: 'PL' },
    { value: 'PT', label: 'Portugal', code: 'PT' },
    { value: 'QA', label: 'Qatar', code: 'QA' },
    { value: 'CG', label: 'Republic of the Congo', code: 'CG' },
    { value: 'RO', label: 'Romania', code: 'RO' },
    { value: 'RU', label: 'Russia', code: 'RU' },
    { value: 'RW', label: 'Rwanda', code: 'RW' },
    { value: 'KN', label: 'Saint Kitts and Nevis', code: 'KN' },
    { value: 'LC', label: 'Saint Lucia', code: 'LC' },
    { value: 'VC', label: 'Saint Vincent and the Grenadines', code: 'VC' },
    { value: 'WS', label: 'Samoa', code: 'WS' },
    { value: 'SM', label: 'San Marino', code: 'SM' },
    { value: 'ST', label: 'São Tomé and Príncipe', code: 'ST' },
    { value: 'SA', label: 'Saudi Arabia', code: 'SA' },
    { value: 'SN', label: 'Senegal', code: 'SN' },
    { value: 'RS', label: 'Serbia', code: 'RS' },
    { value: 'SC', label: 'Seychelles', code: 'SC' },
    { value: 'SL', label: 'Sierra Leone', code: 'SL' },
    { value: 'SG', label: 'Singapore', code: 'SG' },
    { value: 'SK', label: 'Slovakia', code: 'SK' },
    { value: 'SI', label: 'Slovenia', code: 'SI' },
    { value: 'SB', label: 'Solomon Islands', code: 'SB' },
    { value: 'SO', label: 'Somalia', code: 'SO' },
    { value: 'ZA', label: 'South Africa', code: 'ZA' },
    { value: 'KR', label: 'South Korea', code: 'KR' },
    { value: 'SS', label: 'South Sudan', code: 'SS' },
    { value: 'ES', label: 'Spain', code: 'ES' },
    { value: 'LK', label: 'Sri Lanka', code: 'LK' },
    { value: 'SD', label: 'Sudan', code: 'SD' },
    { value: 'SR', label: 'Suriname', code: 'SR' },
    { value: 'SE', label: 'Sweden', code: 'SE' },
    { value: 'CH', label: 'Switzerland', code: 'CH' },
    { value: 'SY', label: 'Syria', code: 'SY' },
    { value: 'TJ', label: 'Tajikistan', code: 'TJ' },
    { value: 'TZ', label: 'Tanzania', code: 'TZ' },
    { value: 'TH', label: 'Thailand', code: 'TH' },
    { value: 'TL', label: 'Timor-Leste', code: 'TL' },
    { value: 'TG', label: 'Togo', code: 'TG' },
    { value: 'TO', label: 'Tonga', code: 'TO' },
    { value: 'TT', label: 'Trinidad and Tobago', code: 'TT' },
    { value: 'TN', label: 'Tunisia', code: 'TN' },
    { value: 'TR', label: 'Turkey', code: 'TR' },
    { value: 'TM', label: 'Turkmenistan', code: 'TM' },
    { value: 'TV', label: 'Tuvalu', code: 'TV' },
    { value: 'UG', label: 'Uganda', code: 'UG' },
    { value: 'UA', label: 'Ukraine', code: 'UA' },
    { value: 'AE', label: 'United Arab Emirates', code: 'AE' },
    { value: 'GB', label: 'United Kingdom', code: 'GB' },
    { value: 'US', label: 'United States', code: 'US' },
    { value: 'UY', label: 'Uruguay', code: 'UY' },
    { value: 'UZ', label: 'Uzbekistan', code: 'UZ' },
    { value: 'VU', label: 'Vanuatu', code: 'VU' },
    { value: 'VA', label: 'Vatican City', code: 'VA' },
    { value: 'VE', label: 'Venezuela', code: 'VE' },
    { value: 'VN', label: 'Vietnam', code: 'VN' },
    { value: 'YE', label: 'Yemen', code: 'YE' },
    { value: 'ZM', label: 'Zambia', code: 'ZM' },
    { value: 'ZW', label: 'Zimbabwe', code: 'ZW' },
  ].sort((a, b) => a.label.localeCompare(b.label));

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      padding: '8px 12px',
      cursor: 'pointer',
      backgroundColor: state.isSelected
        ? 'var(--primary)'
        : state.isFocused
          ? 'rgba(100, 108, 255, 0.1)'
          : 'transparent',
      '&:hover': {
        backgroundColor: 'rgba(100, 108, 255, 0.1)',
      },
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: 'var(--glass-bg)',
      borderColor: 'var(--glass-border)',
      '&:hover': {
        borderColor: 'var(--primary)',
      },
    }),
  };

  const formatOptionLabel = ({ label, code }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <ReactCountryFlag
        countryCode={code}
        svg
        style={{ marginRight: '10px' }}
      />
      {label}
    </div>
  );

  const logger = new Logger(LogLevel.DEBUG);

  /**
   * Handles the form submission.
   * Tracks the form submission event, sends the message via EmailJS,
   * saves the form data to Firebase, and updates the form state.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Track form submission event
      trackEvent({
        action: 'form_submit',
        category: 'Contact',
        label: formData.name || 'Anonymous',
        value: 1,
      });

      // Send message via EmailJS
      try {
        // EmailJS config from environment variables
        const emailResponse = await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.name || 'Anonymous',
            from_email: formData.email || 'No Email Provided',
            country: formData.country?.label || 'N/A',
            message: formData.message,
            to_email: import.meta.env.VITE_EMAILJS_TO_EMAIL,
          },
          import.meta.env.VITE_EMAILJS_USER_ID,
        );
        logger.info(`EmailJS Response: ${emailResponse}`);
      } catch (emailError) {
        logger.error(
          `EmailJS Error: ${emailError?.status} ${emailError?.text}`,
        );
        setStatus('error');
        return; // Exit if EmailJS fails
      }

      // Save form data to Firebase
      try {
        await addMessage({
          name: formData.name || 'Anonymous',
          email: formData.email || 'No Email Provided',
          country: formData.country?.label || 'N/A',
          message: formData.message,
        });
        logger.info('Message saved to Firebase');
      } catch (firebaseError) {
        logger.error(
          `Firebase Error: ${firebaseError.message || firebaseError}`,
        );
        setStatus('error');
        return; // Exit if Firebase fails
      }

      // Reset form state on success
      setStatus('success');
      setFormData({ name: '', email: '', country: null, message: '' });
    } catch (error) {
      logger.error(`Form submission error: ${error}`);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact-section">
      <Container>
        <h2 className="section-title text-center mb-5" data-aos="fade-up">
          Contact Me
        </h2>

        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="contact-form-wrapper" data-aos="fade-up">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="contactName">
                  <Form.Label>
                    Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="custom-input"
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="contactEmail">
                  <Form.Label>
                    Email <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="custom-input"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>
                    Country{' '}
                    <span style={{ opacity: 0.5, fontSize: '0.85rem' }}>
                      (Optional)
                    </span>
                  </Form.Label>
                  <Select
                    value={formData.country}
                    onChange={(value) =>
                      setFormData({ ...formData, country: value })
                    }
                    options={countries}
                    aria-label="Country"
                    formatOptionLabel={formatOptionLabel}
                    styles={customStyles}
                    className="country-select"
                    classNamePrefix="select"
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="contactMessage">
                  <Form.Label>
                    Message <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    className="custom-input"
                  />
                </Form.Group>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
                {status === 'success' && (
                  <Alert variant="success" className="mt-4">
                    Message sent successfully
                    <FontAwesomeIcon
                      icon={faFaceSmile}
                      style={{ marginLeft: '10px' }}
                    />
                  </Alert>
                )}
                {status === 'error' && (
                  <Alert variant="danger" className="mt-4">
                    Failed to send message. Please try again
                    <FontAwesomeIcon
                      icon={faFaceFrown}
                      style={{ marginLeft: '10px' }}
                    />
                  </Alert>
                )}
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
