import PropTypes from 'prop-types';
import React from 'react';
import { Toggle } from '@components/common/form/fields/Toggle';

export default function Status({ cmsVariable }) {
  return (
    <div className="form-field-container">
      <Toggle
        id="status"
        name="status"
        label="Status"
        value={cmsVariable?.status || false}
      />
    </div>
  );
}

Status.propTypes = {
  cmsVariable: PropTypes.shape({
    status: PropTypes.number,
    includeInNave: PropTypes.number
  })
};

Status.defaultProps = {
  cmsVariable: null
};

export const layout = {
  areaId: 'variableEditGeneral',
  sortOrder: 15
};

export const query = `
  query Query {
    cmsVariable(id: getContextValue("cmsVariableId", null)) {
      status
    }
  }
`;
