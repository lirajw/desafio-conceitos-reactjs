import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repository, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {    
      setRepository(...repository, response.data);
    });
  }, []);

  async function handleAddRepository() {
    try {
      const response = await api.post('repositories', {
        title: `Desafio React ${Date.now()}`,
        url: "https://github.com/rocketseat-education/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs", 
        techs: ["Node.js", "REACT"]
      });

      console.log(response);

      setRepository(repository => [...repository, response.data]);

    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveRepository(id) {
    try {

      await api.delete(`repositories/${id}`);

      const repoDelete = [...repository];
      const index = repoDelete.findIndex(repo => repo.id == id);
      repoDelete.splice(index, 1);

      setRepository(repoDelete);
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          
            repository.map((repo) => ( 
              
              <li key={repo.id}>
                      {repo.title}
                      <button onClick={() => handleRemoveRepository(repo.id)}>
                        Remover
                      </button>
            </li>))            
        }
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
