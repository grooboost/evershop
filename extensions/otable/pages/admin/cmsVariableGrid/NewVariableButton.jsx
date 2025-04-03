import PropTypes from 'prop-types';
import React from 'react';
import Button from '@components/common/form/Button';

export default function NewVariableButton({ newVariableUrl }) {
  return <Button url={newVariableUrl} title="New Variable" />;
}

NewVariableButton.propTypes = {
  newVariableUrl: PropTypes.string.isRequired
};

export const layout = {
  areaId: 'pageHeadingRight',
  sortOrder: 10
};

export const query = `
  query Query {
    newVariableUrl: url(routeId: "cmsVariableNew")
  }
`;
