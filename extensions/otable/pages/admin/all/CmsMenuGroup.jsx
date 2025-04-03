import PropTypes from 'prop-types';
import React from 'react';
import VarIcon from '@heroicons/react/solid/esm/VariableIcon';
import PageIcon from '@heroicons/react/solid/esm/DocumentIcon';
import WidgetIcon from '@heroicons/react/solid/esm/PuzzleIcon';
import NavigationItemGroup from '@components/admin/cms/NavigationItemGroup';

export default function CmsMenuGroup({ cmsVariableGrid, cmsPageGrid, widgetGrid }) {
  return (
    <NavigationItemGroup
      id="cmsMenuGroup"
      name="CMS"
      items={[
        {
          Icon: VarIcon,
          url: cmsVariableGrid,
          title: 'Variables'
        },
        {
          Icon: PageIcon,
          url: cmsPageGrid,
          title: 'Pages'
        },
        {
          Icon: WidgetIcon,
          url: widgetGrid,
          title: 'Widgets'
        }
      ]}
    />
  );
}

CmsMenuGroup.propTypes = {
  cmsVariableGrid: PropTypes.string.isRequired,
  cmsPageGrid: PropTypes.string.isRequired,
  widgetGrid: PropTypes.string.isRequired
};

export const layout = {
  areaId: 'adminMenu',
  sortOrder: 60
};

export const query = `
  query Query {
    cmsVariableGrid: url(routeId:"cmsVariableGrid")
    cmsPageGrid: url(routeId:"cmsPageGrid")
    widgetGrid: url(routeId:"widgetGrid")
  }
`;
