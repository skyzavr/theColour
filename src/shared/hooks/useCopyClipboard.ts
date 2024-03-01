export const useCopyClipboard = (message: string) => {
  const copyToClipboard = async () => {
    const errorMsg = 'There is some problem...';
    try {
      await navigator.clipboard.writeText(message || errorMsg);
    } catch {
      message = errorMsg;
    }
    return message;
  };
  const copy = () => {
    return copyToClipboard().then((el) => el);
  };
  return copy;
};
