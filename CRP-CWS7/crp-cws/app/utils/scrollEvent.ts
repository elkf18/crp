import { runInAction } from "mobx";

export const onScroll = (e: any, scrollState: any) => {
  const offset = e.nativeEvent.contentOffset.y;
  let diff = 0;
  if (scrollState.offset > offset) {
    diff = scrollState.offset - offset;
  } else {
    diff = offset - scrollState.offset;
  }

  if (diff >= 10 || offset === 0) {
    runInAction(() => {
      try {
        scrollState.direction = scrollState.offset >= offset || offset === 0 ? "up" : "down";
        scrollState.offset = offset;
      } catch (e: any) {

      }
    });
  }
};

export const resetScrollState = (scrollState: any) =>
  runInAction(() => {
    try {
      scrollState.direction = "";
      scrollState.offset = 0;
    } catch (e: any) {

    }
  });
