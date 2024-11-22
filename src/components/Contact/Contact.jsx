import { useState } from 'react';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import Select from 'react-select';
import ReactCountryFlag from 'react-country-flag';
import emailjs from 'emailjs-com';
import { addMessage } from '../../firebase';
import './Contact.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile, faFaceFrown } from '@fortawesome/free-regular-svg-icons';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: null,
    message: '',
  });
  const [status, setStatus] = useState('');

  const countries = [
    { value: 'AE', label: 'United Arab Emirates', code: 'AE' },
    { value: 'AR', label: 'Argentina', code: 'AR' },
    { value: 'AT', label: 'Austria', code: 'AT' },
    { value: 'AU', label: 'Australia', code: 'AU' },
    { value: 'BE', label: 'Belgium', code: 'BE' },
    { value: 'BH', label: 'Bahrain', code: 'BH' },
    { value: 'BR', label: 'Brazil', code: 'BR' },
    { value: 'CA', label: 'Canada', code: 'CA' },
    { value: 'CH', label: 'Switzerland', code: 'CH' },
    { value: 'CL', label: 'Chile', code: 'CL' },
    { value: 'CN', label: 'China', code: 'CN' },
    { value: 'CO', label: 'Colombia', code: 'CO' },
    { value: 'CZ', label: 'Czech Republic', code: 'CZ' },
    { value: 'DE', label: 'Germany', code: 'DE' },
    { value: 'DK', label: 'Denmark', code: 'DK' },
    { value: 'DZ', label: 'Algeria', code: 'DZ' },
    { value: 'EG', label: 'Egypt', code: 'EG' },
    { value: 'ES', label: 'Spain', code: 'ES' },
    { value: 'FI', label: 'Finland', code: 'FI' },
    { value: 'FR', label: 'France', code: 'FR' },
    { value: 'GB', label: 'United Kingdom', code: 'GB' },
    { value: 'GR', label: 'Greece', code: 'GR' },
    { value: 'HK', label: 'Hong Kong', code: 'HK' },
    { value: 'HU', label: 'Hungary', code: 'HU' },
    { value: 'IE', label: 'Ireland', code: 'IE' },
    { value: 'IN', label: 'India', code: 'IN' },
    { value: 'IQ', label: 'Iraq', code: 'IQ' },
    { value: 'IT', label: 'Italy', code: 'IT' },
    { value: 'JO', label: 'Jordan', code: 'JO' },
    { value: 'JP', label: 'Japan', code: 'JP' },
    { value: 'KW', label: 'Kuwait', code: 'KW' },
    { value: 'LB', label: 'Lebanon', code: 'LB' },
    { value: 'LY', label: 'Libya', code: 'LY' },
    { value: 'MA', label: 'Morocco', code: 'MA' },
    { value: 'MX', label: 'Mexico', code: 'MX' },
    { value: 'NL', label: 'Netherlands', code: 'NL' },
    { value: 'NO', label: 'Norway', code: 'NO' },
    { value: 'NZ', label: 'New Zealand', code: 'NZ' },
    { value: 'OM', label: 'Oman', code: 'OM' },
    { value: 'PL', label: 'Poland', code: 'PL' },
    { value: 'PT', label: 'Portugal', code: 'PT' },
    { value: 'QA', label: 'Qatar', code: 'QA' },
    { value: 'RO', label: 'Romania', code: 'RO' },
    { value: 'RU', label: 'Russia', code: 'RU' },
    { value: 'SA', label: 'Saudi Arabia', code: 'SA' },
    { value: 'SE', label: 'Sweden', code: 'SE' },
    { value: 'TN', label: 'Tunisia', code: 'TN' },
    { value: 'TR', label: 'Turkey', code: 'TR' },
    { value: 'US', label: 'United States', code: 'US' },
    { value: 'YE', label: 'Yemen', code: 'YE' },
    { value: 'ZA', label: 'South Africa', code: 'ZA' },
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
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    // Track form submission event
    trackEvent({
      action: 'form_submit',
      category: 'Contact',
      label: formData.name || 'Anonymous',
      value: 1,
    });

    try {
      // Send message via EmailJS
      await emailjs.send(
        'service_av6m7ke',
        'template_k953vzz',
        {
          from_name: formData.name,
          from_email: formData.email,
          country: formData.country?.label,
          message: formData.message,
          to_email: 'a.moh.nassar00@gmail.com',
        },
        'qNN3I3qiPiVG_BA7-',
      );

      // Save form data to Firebase Realtime Database
      await addMessage({
        name: formData.name,
        email: formData.email,
        country: formData.country?.label,
        message: formData.message,
        timestamp: new Date(),
      });

      // Reset form state
      setStatus('success');
      setFormData({ name: '', email: '', country: null, message: '' });
    } catch {
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
                <Form.Group className="mb-4">
                  <Form.Label>Name</Form.Label>
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

                <Form.Group className="mb-4">
                  <Form.Label>Email</Form.Label>
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
                  <Form.Label>Country</Form.Label>
                  <Select
                    value={formData.country}
                    onChange={(value) =>
                      setFormData({ ...formData, country: value })
                    }
                    options={countries}
                    formatOptionLabel={formatOptionLabel}
                    styles={customStyles}
                    className="country-select"
                    classNamePrefix="select"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Message</Form.Label>
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
