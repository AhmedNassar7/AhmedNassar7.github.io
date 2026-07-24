export const RESUME_URL = '/assets/PDFs/Ahmed_Nassar_Resume.pdf';
export const RESUME_VIEW_URL =
  'https://drive.google.com/file/d/1AZ9sVmv92Bqf_8hZIC49jYnkNMwwdTUv/view?usp=sharing';
export const RESUME_FILE_NAME = 'Ahmed_Nassar_Resume.pdf';

export const downloadResume = () => {
  const link = document.createElement('a');
  link.href = RESUME_URL;
  link.download = RESUME_FILE_NAME;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
