type FormEventHandler<T = Element> = (event: React.FormEvent<T>) => void
import FormEventHandler from 'react';
import './contact.css'
import { useState, type ChangeEvent } from 'react';
// Définition de la forme des données

interface ContactState {
  nom: string;
  email: string;
}

export default function ContactForm() {
  // État typé avec notre interface
  const [formData, setFormData] = useState<ContactState>({
    nom: '',
    email: ''
  });

  // Gestion des changements de saisie
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  // Pour la soumission du formulaire
  // On utilise FormEventHandler pour typer directement la fonction
  const handleSubmit: FormEventHandler<HTMLFormElement> = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://devince.fr/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // On transforme l'objet en chaîne JSON
      });

      if (response.ok) {
       // const data = await response.json();
       // alert('Succès ! Merci ' + formData.nom);
        alert(`Formulaire envoyé pour ${formData.nom} (${formData.email})  !`);
        // Optionnel : Réinitialiser le formulaire ici
      } else {
        alert('Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
      alert('Impossible de contacter le serveur');
    }

    
  };
 /*
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email-field">Votre Email :</label>
      <input id="email-field" type="text" value={name} onChange={handleChange} />
      <button type="submit">Envoyer</button>
    </form>
  );
   Gestion de la soumission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert(`C'est envoyé pour ${formData.nom} (${formData.email}) !`);
  };
*/
  return (
    <div >
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nom-field">Nom : </label> 
          <input 
            id="nom-field"  
            type="text" 
            name="nom" 
            value={formData.nom} 
            onChange={handleChange} 
          />
        </div>
        <br />
        <div>
          <label htmlFor="email-field">Email : </label>
          <input 
            id="email-field"  
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
          />
        </div>
        <br />
        <button type="submit">Valider</button>
      </form>
    </div>
  );
}