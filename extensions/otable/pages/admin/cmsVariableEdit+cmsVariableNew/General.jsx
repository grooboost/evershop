import PropTypes from 'prop-types';
import React from 'react';
import Area from '@components/common/Area';
import { get } from '@evershop/evershop/src/lib/util/get';
import { Field } from '@evershop/otable/components/common/form/Field';
import { Card } from '@components/admin/cms/Card';
import Editor from '@components/common/form/fields/Editor';

export default function General({
  variable,
  browserApi,
  deleteApi,
  uploadApi,
  folderCreateApi
}) {
  const fields = [
    {
      component: { default: Field },
      props: {
        type: 'text',
        id: 'name',
        name: 'name',
        label: 'Name',
        placeholder: 'Name',
        validationRules: ['notEmpty']
      },
      sortOrder: 10
    },
    {
      component: { default: Field },
      props: {
        id: 'cmsVariableId',
        name: 'cms_variable_id',
        type: 'hidden'
      },
      sortOrder: 10
    },
    {
      component: { default: Field },
      props: {
        type: 'dynamictextarea',
        value: variable?.data? JSON.stringify(variable.data, null, 2) : '{}',
        name: 'data',
        label: 'data',
        placeholder: '{}',
        validationRules: ['notEmpty']
      },
      sortOrder: 30
    }
  ].map((f) => {
    if (get(variable, `${f.props.id}`) !== undefined) {
      // eslint-disable-next-line no-param-reassign
      f.props.value = get(variable, `${f.props.id}`);
    }
    return f;
  });

  return (
    <Card title="General">
      <Card.Session>
        <Area id="variableEditGeneral" coreComponents={fields} />
      </Card.Session>
    </Card>
  );
}

General.propTypes = {
  variable: PropTypes.shape({
    cmsVariableId: PropTypes.number,
    name: PropTypes.string,
    data: PropTypes.object,
  }),
  browserApi: PropTypes.string.isRequired,
  deleteApi: PropTypes.string.isRequired,
  folderCreateApi: PropTypes.string.isRequired,
  uploadApi: PropTypes.string.isRequired
};

General.defaultProps = {
  variable: {
    cmsVariableId: null,
    name: '',
    data: '{}'
  }
};

export const layout = {
  areaId: 'wideScreen',
  sortOrder: 10
};

export const query = `
  query Query {
    variable: cmsVariable(id: getContextValue("cmsVariableId", null)) {
      cmsVariableId
      name
      data
    }
    browserApi: url(routeId: "fileBrowser", params: [{key: "0", value: ""}])
    deleteApi: url(routeId: "fileDelete", params: [{key: "0", value: ""}])
    uploadApi: url(routeId: "imageUpload", params: [{key: "0", value: ""}])
    folderCreateApi: url(routeId: "folderCreate")
  }
`;
