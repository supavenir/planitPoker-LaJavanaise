import React from 'react'
  
export default function SignIn() {
    return (
      <main>
        <div class='ui container center aligned'>
            <div class='ui segment'>
                <form method='post' class='ui form validForm' action=''>
                    <div class='field'>
                        <label>*Login (nom d'utilisateur) :</label>
                        <input type='text'></input>
                    </div>
                    <div class='field'>
                        <label>*Nom Prenom:</label>
                        <input type='text' required='required' name='nom'></input>
                    </div>
                    <div class='field'>
                        <label>*Adresse courriel :</label>
                        <input type='email' required='required' name='email'></input>
                    </div>
                    <div class='field'>
                        <label>*Mot de passe (au minimum 8 caractères) :</label>
                        <input type='password' required='required' name='password'></input>
                    </div>
                    <button class='ui button' type='submit'>Valider</button>
                </form>
            </div>

        </div>
      </main>
    )
}