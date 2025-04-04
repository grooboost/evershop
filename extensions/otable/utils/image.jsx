import imageCompression from 'browser-image-compression';

/**
 * 주어진 이미지 파일을 폭 또는 높이 기준으로 리사이즈하고 압축합니다.
 * @param file 압축할 이미지 파일
 * @param maxWidthOrHeight 최대 너비 또는 높이 (기본값: 400)
 * @returns 압축된 File 객체
 */
export const compressImage = async (
  file,
  maxWidthOrHeight = 540
) => {
  const options = {
    maxSizeMB: 1, // 1MB 이하로 압축 시도
    maxWidthOrHeight,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error('이미지 압축 중 오류 발생:', error);
    throw error;
  }
};
