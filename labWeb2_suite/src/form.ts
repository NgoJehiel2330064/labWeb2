interface Formulaire {
    id: number;
    titre: string;
    auteur: string;
    contenu: string;
    date: string;
}
 

function envoyerFormulaire(form: any)
{
    const data = new FormData(form);
                const publication = {
                    titre: data.get("titre"),
                    auteur: data.get("auteur"),
                    contenu: data.get("contenu"),
                    date: data.get("date")
                };

    fetch('http://localhost:3000/posts', {
        method: 'POST', // Méthode de la requête
        headers: {
            'Content-Type': 'application/json; charset=UTF-8', // Format des données
        },
        body: JSON.stringify({ // Données à envoyer
            titre: publication.titre,
            auteur: publication.auteur,
            contenu: publication.contenu,
            date: publication.date
        }),
    })
    .then((response) => response.json()) // Transformation de la réponse
    .then((json) => console.log(json)) // Affichage du résultat
    .catch((error) => console.error('Erreur:', error));
 // Gestion des erreurs
}

 
 function datePicker() {
        $("#datepicker").datepicker();
  } 

  function dialog() {

    // Initialisation du dialog (fermé au départ)
    $("#dialog").dialog({
        resizable: false,
        height: 160,
        width: 500,
        autoOpen: false,
        modal: true,
        buttons: {
            "Publier": function () {
                $(this).dialog("close");
                //form.submit(); // on envoie vraiment le formulaire
                envoyerFormulaire(form);
            },
            "Annuler": function () {
                $(this).dialog("close");
            }
        }
    });

    let form: any; // variable pour stocker le formulaire

    $("#form-publication").submit(function (e) {
        e.preventDefault(); // on bloque l’envoi
        form = this;        // on garde une référence au formulaire
        $("#dialog").dialog("open"); // on ouvre la fenêtre
    });
}


  $(document).ready(() => {
  datePicker();
  dialog();

  });
