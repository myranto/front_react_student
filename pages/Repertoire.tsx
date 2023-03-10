import React, { useState, useEffect } from 'react';
import './Repertoire.css';

interface Ressource {
  nom: string;
  type: string;
  date_creation: string;
  taille: number;
}

function fileToBytes(selectedFile: File): Promise<Uint8Array> {
  return new Promise<Uint8Array>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const bytes = new Uint8Array(arrayBuffer);
      resolve(bytes);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(selectedFile);
  });
}


function Repertoire() {
  const [ressources, setRessources] = useState<Ressource[]>([]);
  const [showNewFolderForm, setShowNewFolderForm] = useState(false);
  const [showUploadFileForm, setShowUploadFileForm] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleNewFolderClick = () => {
    setShowNewFolderForm(true);
  };

  const handleNewFolderSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
        console.error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Failed to create new folder: ${error}`);
    }
  };

  const handleNewFolderNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewFolderName(event.target.value);
  };

  const handleUploadFileClick = () => {
    setShowUploadFileForm(true);
  };

  const handleUploadFileSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowUploadFileForm(false);

    if (!selectedFile) {
      console.error('No file selected!');
      return;
    }

    const formData = new FormData();
    formData.append('fichier', selectedFile, selectedFile.name);
    const binary_value = await fileToBytes(selectedFile);


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
        console.error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Failed to upload file: ${error}`);
    }
  };


  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  useEffect(() => {
    async function fetchRessources() {
      try {
        const response = await fetch('http://localhost:8000/ressources/1');
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
    fetchRessources();
  }, []);

  return (
    <div className="repertoire">
      <div className="header">
        <span>Etude &gt; P1 &gt; Info</span>
        <div className="actions">
          <button onClick={handleNewFolderClick}>Nouveau dossier</button>
          <button onClick={handleUploadFileClick}>Ajouter un fichier</button>
        </div>
      </div>
      {showNewFolderForm && (
        <form onSubmit={handleNewFolderSubmit}>
          <input
            type="text"
            placeholder="Nom du dossier"
            value={newFolderName}
            onChange={handleNewFolderNameChange}
          />
          <button type="submit">Créer</button>
          <button type="button" onClick={() => setShowNewFolderForm(false)}>
            Annuler
          </button>
        </form>
      )}

      {showUploadFileForm && (
        <form onSubmit={handleUploadFileSubmit}>
          <input type="file" onChange={handleFileInputChange} />
          <button type="submit">Envoyer</button>
          <button type="button" onClick={() => setShowUploadFileForm(false)}>
            Annuler
          </button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Type</th>
            <th>Date de création</th>
            <th>Taille</th>
          </tr>
        </thead>
        <tbody>
          {ressources.map((ressource, index) => (
            <tr key={index}>
              <td>{ressource.nom}</td>
              <td>{ressource.type}</td>
              <td>{ressource.date_creation}</td>
              <td>{ressource.taille}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Repertoire;