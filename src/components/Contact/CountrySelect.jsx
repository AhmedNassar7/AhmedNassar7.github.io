import PropTypes from 'prop-types';
import Select from 'react-select';
import ReactCountryFlag from 'react-country-flag';

// react-select (@emotion + @floating-ui, ~36 KB gzipped) and
// react-country-flag are bundled together here and lazy-loaded from
// Contact.jsx, so none of it is in the initial payload — the contact form
// sits well below the fold. Contact renders a fully usable native <select>
// fallback while this chunk loads (or if it ever fails to fetch).

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
    <ReactCountryFlag countryCode={code} svg style={{ marginRight: '10px' }} />
    {label}
  </div>
);

const CountrySelect = ({ value, onChange, options }) => (
  <Select
    value={value}
    onChange={onChange}
    options={options}
    aria-label="Country"
    formatOptionLabel={formatOptionLabel}
    styles={customStyles}
    className="country-select"
    classNamePrefix="select"
  />
);

CountrySelect.propTypes = {
  value: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
    code: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
      code: PropTypes.string,
    }),
  ).isRequired,
};

export default CountrySelect;
