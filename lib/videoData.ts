const videoDataStore: any = {};

export const storeVideoData = (id: any, data: any) => {
  videoDataStore[id] = data;
};

export const getVideoData = (id: any) => {
  return videoDataStore[id];
};
