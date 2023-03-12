import React, { useState, useEffect } from 'react';
// import './Repertoire.css';



async function fileToBytes(selectedFile){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result ;
      const bytes = new Uint8Array(arrayBuffer);
      resolve(bytes);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(selectedFile);
  });
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      const base64 = result ? result.toString().split(',')[1] : null;
      if (base64) {
        resolve(base64);
      } else {
        reject(new Error('Unable to convert file to Base64.'));
      }
    };

    reader.onerror = (error) => {
      console.error('Error occurred while reading file.', error);
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}



function Repertoire() {
  const [ressources, setRessources] = useState([]);
  const [showNewFolderForm, setShowNewFolderForm] = useState(false);
  const [showUploadFileForm, setShowUploadFileForm] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleNewFolderClick = () => {
    setShowNewFolderForm(true);
  };

  const handleNewFolderSubmit = async (event) => {
    event.preventDefault();
    setShowNewFolderForm(false);

    try {
      const response = await fetch('http://localhost:8000/repertoire/nouveau', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom: newFolderName, type: 'dossier' }),
      });
      if (response.ok) {
        const data = await response.json();
        setRessources([...ressources, data]);
        setNewFolderName('');
      } else {
        console.error("HTTP error! status: ${response.status}");
      }
    } catch (error) {
      console.error("Failed to create new folder: ${error}");
    }
  };

  const handleNewFolderNameChange = (event) => {
    setNewFolderName(event.target.value);
  };

  const handleUploadFileClick = () => {
    setShowUploadFileForm(true);
  };

  const handleUploadFileSubmit = async (event) => {
    event.preventDefault();
    setShowUploadFileForm(false);

    if (!selectedFile) {
      console.error('No file selected!');
      return;
    }

    const formData = new FormData();
    formData.append('fichier', selectedFile, selectedFile.name);
    const binary_value = await fileToBase64(selectedFile);


    console.log(binary_value);
    try {
      const response = await fetch('http://localhost:8000/fichier/ajout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom: selectedFile.name, type: 'fichier', value: binary_value }),
      });
      if (response.ok) {
        const data = await response.json();
        setRessources([...ressources, data]);
        setSelectedFile(null);
      } else {
        console.error("HTTP error! status: ${response.status}");
      }
    } catch (error) {
      console.error("Failed to upload file: ${error}");
    }
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  async function fetchRessourcesInFolder(folderId) {
    try {
      const response = await fetch(`http://localhost:8000/ressources/${folderId}`);
      if (response.ok) {
        const data = await response.json();
        setRessources(data);
      } else {
        console.error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Failed to fetch resources: ${error}`);
    }
  }

  useEffect(() => {
    async function fetchRessources() {
      try {
        const response = await fetch('http://localhost:8000/ressources/1');
        if (response.ok) {
          const data = await response.json();
          setRessources(data);
        } else {
          console.error("HTTP error! status: ${response.status}");
        }
      } catch (error) {
        console.error("Failed to fetch resources: ${error}");
      }
    }
    fetchRessources().then(r => console.log(r));
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Etude &gt; P1 &gt; Info</span>
        <div>
          <button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '8px 16px', marginRight: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={handleNewFolderClick}>Nouveau dossier</button>
          <button style={{ backgroundColor: '#008CBA', color: 'white', padding: '8px 16px', marginRight: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={handleUploadFileClick}>Ajouter un fichier</button>
        </div>
      </div>
      {showNewFolderForm && (
        <form onSubmit={handleNewFolderSubmit}>
          <input
            type="text"
            placeholder="Nom du dossier"
            value={newFolderName}
            onChange={handleNewFolderNameChange}
            style={{ padding: '8px 16px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '8px 16px', marginRight: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} type="submit">Créer</button>
          <button style={{ backgroundColor: '#f44336', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} type="button" onClick={() => setShowNewFolderForm(false)}>Annuler</button>
        </form>
      )}

      {showUploadFileForm && (
        <form onSubmit={handleUploadFileSubmit}>
          <input type="file" onChange={handleFileInputChange} style={{ marginBottom: '10px' }} />
          <button style={{ backgroundColor: '#008CBA', color: 'white', padding: '8px 16px', marginRight: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} type="submit">Envoyer</button>
          <button style={{ backgroundColor: '#f44336', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} type="button" onClick={() => setShowUploadFileForm(false)}>Annuler</button>
        </form>
      )}

      <div style={{ display: 'flex', borderBottom: '1px solid #ddd', padding: '10px 0', fontWeight: 'bold' }}>
        <div style={{ flex: '1', marginRight: '10px' }}>Nom</div>
        <div style={{ flex: '1', marginRight: '10px' }}>Modifié le</div>
        <div style={{ flex: '1', marginRight: '10px' }}>Type</div>
        <div style={{ flex: '1' }}>Taille</div>
      </div>
      {ressources.map((r, i) => (
        <div key={i} style={{ display: 'flex', borderBottom: '1px solid #ddd', padding: '10px 0' }}>
          <div style={{ flex: '1', marginRight: '10px' }}>{r.nom}</div>
          <div style={{ flex: '1', marginRight: '10px' }}>{r.date_creation}</div>
          <div style={{ flex: '1', marginRight: '10px' }}>{r.type}</div>
          <div style={{ flex: '1' }}>{r.taille}</div>
        </div>
      ))}
    </div>
  );
}








export default Repertoire;
