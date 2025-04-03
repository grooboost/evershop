import PropTypes from 'prop-types';
import React from 'react';
import PageHeading from '@components/admin/cms/PageHeading';

export default function VariableEditVariableHeading({ backUrl, variable }) {
  return (
    <PageHeading
      backUrl={backUrl}
      heading={variable ? `Editing ${variable.name}` : 'Create a new variable'}
    />
  );
}

VariableEditVariableHeading.propTypes = {
  backUrl: PropTypes.string.isRequired,
  variable: PropTypes.shape({
    name: PropTypes.string.isRequired
  })
};

VariableEditVariableHeading.defaultProps = {
  variable: null
};

export const layout = {
  areaId: 'content',
  sortOrder: 5
};

export const query = `
  query Query {
    variable: cmsVariable(id: getContextValue("cmsVariableId", null)) {
      name
    }
    backUrl: url(routeId: "cmsVariableGrid")
  }
`;
