const useFileDownloader = () => {
  const downloadFile = async ({ fileUrl, authToken, isFetch = false }) => {
    try {
      if (!isFetch) {
        const a = document.createElement('a');
        a.href =
          'https://api.emonev.koneksiku.my.id/public/upload/data-triwulan/1701753052496_data-triwulan.29';
        a.download = 'downloaded-file';
        a.style.display = 'none';
        a.target = '_blank';

        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(a.href);
        document.body.removeChild(a);

        return;
      }

      const response = await fetch(fileUrl, {
        headers: {
          Authorization: authToken,
        },
      });

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
      console.log(error);
      alert('Error downloading the file:', error);
    }
  };

  return { downloadFile };
};

export default useFileDownloader;
