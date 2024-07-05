//Redux
import { resetMessage } from "../slices/photoSlice";

export const useResetComponentMessage = (dispatch) => {
  return () => {
    setTimeout(() => {
      dispatch(resetMessage(0));
    }, 5000);
  };
};
