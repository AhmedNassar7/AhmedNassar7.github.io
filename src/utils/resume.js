// RESUME_URL is the self-hosted PDF — used for Download (and as the
// file_download event's link_url). RESUME_VIEW_URL is a separate Google
// Drive link for View: Drive's own viewer works everywhere regardless of a
// visitor's local PDF-handling setup, unlike opening the raw file directly.
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

export const viewResume = () => {
  const link = document.createElement('a');
  link.href = RESUME_VIEW_URL;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
