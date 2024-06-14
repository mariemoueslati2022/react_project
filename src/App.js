import React, { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './SearchBar';

// Fonction pour renommer les utilisateurs avec des noms musulmans et attribuer une profession aléatoire
const renameUsersWithMuslimNamesAndProfession = (users) => {
  const muslimNames = [
    'Muhammad', 'Aisha', 'Fatima', 'Ali', 'Khadija', 'Omar', 'Zainab', 'Abdullah', 'Maryam', 'Hassan'
  ];
  const professions = {
    'Ingénieur': 'informatique', 
    'Médecin': 'médecine', 
    'Architecte': 'bâtiment', 
    'Enseignant': 'éducation', 
    'Avocat': 'juridique', 
    'Pharmacien': 'médicament', 
    'Pilote': 'voler', 
    'Entrepreneur': 'entrepreneur'
  };

  // Mapper chaque utilisateur avec un nom musulman et une profession aléatoire
  return users.map(user => ({
    ...user,
    name: muslimNames[Math.floor(Math.random() * muslimNames.length)], // Choix aléatoire d'un nom musulman
    profession: Object.keys(professions)[Math.floor(Math.random() * Object.keys(professions).length)] // Choix aléatoire d'une profession
  }));
};

// Fonction pour générer des posts basés sur les professions
const generatePostsByProfession = (professions) => {
  const posts = [];

  professions.forEach((value, key) => {
    switch (key) {
      case 'Ingénieur':
        posts.push({ title: 'Développement Web moderne', body: 'Découvrez les dernières tendances en développement web.' });
        posts.push({ title: 'Introduction à l\'intelligence artificielle', body: 'Les bases de l\'IA expliquées de manière simple.' });
        break;
      case 'Médecin':
        posts.push({ title: 'Nouveautés en chirurgie orthopédique', body: 'Les techniques les plus récentes en chirurgie orthopédique.' });
        posts.push({ title: 'Gestion des patients atteints de COVID-19', body: 'Meilleures pratiques pour le traitement des patients COVID-19.' });
        break;
      // Ajouter d'autres cas pour les autres professions selon les besoins
      default:
        break;
    }
  });

  return posts;
};

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        // Renommer les noms des utilisateurs avec des noms musulmans et attribuer une profession
        const usersWithMuslimNamesAndProfession = renameUsersWithMuslimNamesAndProfession(data);
        setUsers(usersWithMuslimNamesAndProfession);
      });

    // Simuler la génération de posts en fonction des professions
    const professions = new Map(Object.entries({
      'Ingénieur': 'informatique', 
      'Médecin': 'médecine', 
      'Architecte': 'bâtiment', 
      'Enseignant': 'éducation', 
      'Avocat': 'juridique', 
      'Pharmacien': 'médicament', 
      'Pilote': 'voler', 
      'Entrepreneur': 'entrepreneur'
    }));
    const generatedPosts = generatePostsByProfession(professions);
    setPosts(generatedPosts);
  }, []);

  const filterUsers = (term) => {
    if (!term) {
      return users;
    }
    return users.filter(user =>
      user.name.toLowerCase().includes(term.toLowerCase())
    );
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleUserClick = (userId) => {
    setSelectedUserId(userId === selectedUserId ? null : userId);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Liste des utilisateurs</h1>
        <SearchBar handleSearch={handleSearch} />
        <ul>
          {filterUsers(searchTerm).map(user => (
            <li key={user.id}>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <p>{user.phone}</p>
              <p>Profession: {user.profession}</p>
              {selectedUserId === user.id && (
                <div>
                  <h3>Détails de l'utilisateur</h3>
                  <p><strong>Nom:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Téléphone:</strong> {user.phone}</p>
                  <p><strong>Profession:</strong> {user.profession}</p>
                  <button onClick={() => handleUserClick(user.id)}>Fermer</button>
                </div>
              )}
              {!selectedUserId && (
                <button onClick={() => handleUserClick(user.id)}>Voir détails</button>
              )}
            </li>
          ))}
        </ul>
        
        
      </header>
    </div>
  );
}

export default App;
