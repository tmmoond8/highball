export const getImageUrl = url =>
  url ??
  'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1613735418/noticon/dfzcwdbtls4cs6bpsoqk.png';

export const getRandomProfileImageUrl = () => {
  const profileImageSet = [
    'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1613735253/noticon/mshhmt49mj5qu9aeibko.png',
    'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1613735311/noticon/bj3ik6yhfdxgut0odhpx.png',
    'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1613735339/noticon/rsehi7at2o6zuwg6cbub.png',
    'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1613735367/noticon/bldjxjeyiultsfpo1ppk.png',
    'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1613735392/noticon/ggaqjh4wfjf0miavt4dc.png',
    'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1613735418/noticon/dfzcwdbtls4cs6bpsoqk.png',
  ];
  return profileImageSet[
    Math.floor((Math.random() * 100) % profileImageSet.length)
  ];
};
