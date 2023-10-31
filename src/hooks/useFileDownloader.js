const useFileDownloader = () => {
  const downloadFile = async (fileUrl) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();

      const a = document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = 'downloaded-file';
      a.style.display = 'none';

      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(a.href);
      document.body.removeChild(a);
    } catch (error) {
      alert('Error downloading the file:', error);
    }
  };

  return { downloadFile };
};

export default useFileDownloader;
