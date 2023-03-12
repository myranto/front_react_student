import React from 'react';

const FileDisplay = ({ base64String }) => {
  let content;
  let type = getFileType(base64String);
  if (type === 'image') {
    content = <img src={base64String.substring(22)} alt="Image encodée en Base64" />;
  } else if (type === 'pdf') {
    content = <embed src={`data:application/pdf;base64,${base64String.substring(22)}`} type="application/pdf" width="100%" height="500px" />;
  } else if (type === 'text') {
    content = <pre>{atob(base64String.substring(22))}</pre>;
  } else {
    content = <p>Fichier non pris en charge</p>;
  }

  return (
    <div>
      {content}
    </div>
  );
};

// import React from 'react';
// import FileDisplay from './FileDisplay';
//
// const MyComponent = () => {
//   const base64String = '...'; // La chaîne Base64 du fichier
//   const fileType = 'pdf'; // Le type de fichier (image, pdf ou texte)
//
//   return (
//     <div>
//       <h1>Mon composant</h1>
//       <FileDisplay base64String={base64String} type={fileType} />
//     </div>
//   );
// };
const getFileType = (base64String) => {
  const header = base64String.substring(0, 30);
  let type = '';

  if (header.includes('data:image/jpeg;base64')) {
    type = 'image';
  } else if (header.includes('data:image/png;base64')) {
    type = 'image';
  } else if (header.includes('data:application/pdf;base64')) {
    type = 'pdf';
  } else if (header.includes('data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64')) {
    type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  } else if (header.includes('data:text/plain;base64')) {
    type = 'text';
  } else {
    type = 'unknown';
  }
  return type;
};


export default FileDisplay;
