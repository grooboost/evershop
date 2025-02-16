import React from 'react';
import PropTypes from 'prop-types';
import './Logo.scss';

export default function Logo({
  themeConfig: {
    logo: { src, alt = 'Otable', width = '128px', height = '128px' }
  }
}) {
  return (
    <div className="logo md:ml-0 flex justify-center items-center">
      {src && (
        <a href="/" className="logo-icon">
          <img src={src} alt={alt} width={width} height={height} />
        </a>
      )}
      {!src && (
        <a href="/" className="logo-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="138"
            height="128"
            viewBox="0 0 138 128"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M63.1325 121.194C62.944 121.196 62.7553 121.197 62.5664 121.197C47.0025 121.197 32.792 115.53 21.9747 106.191C12.5953 95.652 6.91608 81.8804 6.91608 66.8117C6.91608 49.1496 14.7183 33.2697 27.136 22.2886C18.2215 32.8624 12.8671 46.4138 12.8671 61.1883C12.8671 90.864 34.4685 115.606 63.1325 121.194ZM69 120.871C38.1355 117.726 14.0734 92.2053 14.0734 61.1883C14.0734 43.8765 21.5692 28.2769 33.5599 17.3244C43.4326 10.6875 55.3906 6.80307 68.2762 6.80307C83.8401 6.80307 98.0506 12.4701 108.868 21.8093C118.247 32.348 123.927 46.1196 123.927 61.1883C123.927 92.2053 99.8645 117.726 69 120.871ZM69 122.057C66.8849 122.268 64.7386 122.377 62.5664 122.377C50.0323 122.377 38.3591 118.772 28.5713 112.565C39.273 121.456 53.1341 126.82 68.2762 126.82C81.5278 126.82 93.7983 122.712 103.829 115.727C95.3069 119.979 85.6566 122.377 75.4336 122.377C73.2614 122.377 71.1151 122.268 69 122.057ZM110.15 110.676C100.277 117.312 88.3192 121.197 75.4336 121.197C75.2447 121.197 75.0559 121.196 74.8674 121.194C103.531 115.606 125.133 90.864 125.133 61.1883C125.133 49.0846 121.539 37.8017 115.339 28.3044C124.263 38.7255 129.636 52.155 129.636 66.8117C129.636 84.1235 122.141 99.7231 110.15 110.676ZM110.907 111.598C99.7339 121.775 84.7484 128 68.2762 128C49.4615 128 32.5865 119.878 21.1169 107.024C8.16521 95.8132 0 79.4333 0 61.1883C0 27.3949 28.0119 0 62.5664 0C64.7386 0 66.8849 0.108254 69 0.319545C71.1151 0.108254 73.2614 0 75.4336 0C109.988 0 138 27.3949 138 61.1883C138 82.1004 127.273 100.562 110.907 111.598ZM74.8674 1.18222C75.0559 1.18056 75.2447 1.17972 75.4336 1.17972C109.322 1.17972 136.794 28.0465 136.794 61.1883C136.794 78.8504 128.991 94.7304 116.574 105.711C125.488 95.1377 130.843 81.5862 130.843 66.8117C130.843 48.5667 122.677 32.1868 109.726 20.9763C100.823 10.9985 88.6632 3.87209 74.8674 1.18222ZM69 1.50562C81.6214 2.79171 93.1052 7.81953 102.271 15.4348C92.4836 9.22788 80.8103 5.62335 68.2762 5.62335C58.0532 5.62335 48.4029 8.02118 39.8811 12.2731C48.2669 6.43324 58.2184 2.60424 69 1.50562ZM63.1325 1.18222C51.5496 3.44064 41.12 8.82651 32.8029 16.4016C16.4367 27.4377 5.70979 45.8996 5.70979 66.8117C5.70979 78.9154 9.30329 90.1983 15.5038 99.6956C6.57919 89.2745 1.20629 75.845 1.20629 61.1883C1.20629 28.0465 28.6782 1.17972 62.5664 1.17972C62.7553 1.17972 62.944 1.18056 63.1325 1.18222ZM37.4353 63.9975C37.4353 66.7457 37.7476 69.443 38.3723 72.0893C40.3503 80.8426 44.7228 87.3059 51.4898 91.479C56.5911 94.5325 62.4732 96.0084 69.1361 95.9066C79.3386 95.8048 87.0946 92.7004 92.4041 86.5934C97.8177 80.3847 100.524 72.9036 100.524 64.1502C100.524 55.3969 97.9738 48.0175 92.8726 42.0124C87.1467 35.3965 79.1824 32.0885 68.9799 32.0885C62.317 32.0885 56.5911 33.6152 51.8022 36.6687C47.1173 39.6204 43.5256 43.5391 41.027 48.4247C38.6325 53.3103 37.4353 58.5013 37.4353 63.9975ZM87.0946 75.6008C86.0535 78.7561 85.0125 81.2498 83.9714 83.0819C80.4317 89.3924 75.3825 92.5477 68.8237 92.5477C62.265 92.5477 55.2958 89.3925 51.8603 83.0819C49.0494 77.891 47.5919 71.4786 47.4878 63.8449C47.3837 56.1094 48.7891 49.6461 51.7041 44.4551C55.0356 38.45 62.1088 35.4473 68.9799 35.4473C73.3524 35.4473 77.0482 36.8214 80.0673 39.5696C85.7933 44.8623 88.6562 53.5648 88.6562 65.677C88.6562 69.1376 88.1357 72.4456 87.0946 75.6008Z"
              fill="black"
            />
          </svg>
        </a>
      )}
    </div>
  );
}

Logo.propTypes = {
  themeConfig: PropTypes.shape({
    logo: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
      width: PropTypes.string,
      height: PropTypes.string
    })
  })
};

Logo.defaultProps = {
  themeConfig: {
    logo: {
      src: '',
      alt: 'Otable',
      width: '128',
      height: '146'
    }
  }
};

export const layout = {
  areaId: 'header',
  sortOrder: 10
};

export const query = `
  query query {
    themeConfig {
      logo {
        src
        alt
        width
        height
      }
    }
  }
`;
