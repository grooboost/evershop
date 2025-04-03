import PropTypes from 'prop-types';
import React from 'react';
import Error from '@components/common/form/fields/Error';
import '../Field.scss';

function DynamicTextarea({
  name,
  value,
  label,
  onChange,
  error,
  instruction,
  placeholder
}) {
  const [_value, setValue] = React.useState(value || '');

  React.useEffect(() => {
    setValue(value || '');
  }, [value]);

  const onChangeFunc = (e) => {
    setValue(e.target.value);
    if (onChange) onChange.call(window, e.target.value);
  };

  // 줄 수 계산 (최소 1줄)
  const lineCount = (_value.match(/\n/g)?.length ?? 0) + 1;
  const rows = Math.max(1, lineCount);

  return (
    <div className={`form-field-container ${error ? 'has-error' : null}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className="field-wrapper flex flex-grow">
        <textarea
          type="text"
          className="form-field"
          id={name}
          name={name}
          placeholder={placeholder}
          value={_value}
          onChange={onChangeFunc}
          rows={rows}
        />
        <div className="field-border" />
      </div>
      {instruction && (
        <div className="field-instruction mt-sm">{instruction}</div>
      )}
      <Error error={error} />
    </div>
  );
}

DynamicTextarea.propTypes = {
  error: PropTypes.string,
  instruction: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string
};

DynamicTextarea.defaultProps = {
  error: undefined,
  instruction: undefined,
  label: undefined,
  onChange: undefined,
  value: undefined,
  placeholder: undefined
};

export { DynamicTextarea };
