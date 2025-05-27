import React from 'react';
import Area from '@components/common/Area';
import LoadingBar from '@components/common/LoadingBar';
import './Layout.scss';
import './tailwind.scss';

const noLayoutPaths = ['/community'];
export default function Layout() {
  const isNoLayoutPage =
  typeof window !== 'undefined' &&
  noLayoutPaths.some(path => window.location.pathname.startsWith(path));


  return (
    <>
      <LoadingBar />
      {!isNoLayoutPage && (
        <div className="page-width p-0">
          <div className="header grid grid-cols-3">
            <Area
              id="header"
              noOuter
              coreComponents={[
                {
                  component: { default: Area },
                  props: {
                    id: 'icon-wrapper',
                    className: 'icon-wrapper flex justify-end space-x-4'
                  },
                  sortOrder: 20
                }
              ]}
            />
          </div>
        </div>
      )}
      <main className="content">
        <Area id="content" noOuter />
      </main>
      {!isNoLayoutPage && (
        <div className="footer">
          <Area id="footer" noOuter coreComponents={[]} />
        </div>
      )}
    </>
  );
}

export const layout = {
  areaId: 'body',
  sortOrder: 1
};
