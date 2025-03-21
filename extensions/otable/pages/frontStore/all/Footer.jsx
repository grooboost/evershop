import React from 'react';
import PropTypes from 'prop-types';
import Company from './Company';
import CompanyMobile from './CompanyMobile';

function Footer({ themeConfig: { copyRight } }) {
  return (<>
    <div className="hidden md:block"><Company /></div>
    <div className="block md:hidden"><CompanyMobile /></div>  
  </>)
}

Footer.propTypes = {
  themeConfig: PropTypes.shape({
    copyRight: PropTypes.string
  })
};

Footer.defaultProps = {
  themeConfig: {
    copyRight: '© grooboost Inc. All Rights Reserved.'
  }
};

export default Footer;

export const layout = {
  areaId: 'footer',
  sortOrder: 10
};

export const query = `
  query query {
    themeConfig {
      copyRight
    }
  }
`;
