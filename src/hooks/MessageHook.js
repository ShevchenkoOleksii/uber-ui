import {useCallback} from "react";

export const useMessage = () => {
  return useCallback((text, messageClass = 'message_info') => {
    if (window.M && text) {
      window.M.toast({html: text, classes: messageClass});
    }
  }, []);
};