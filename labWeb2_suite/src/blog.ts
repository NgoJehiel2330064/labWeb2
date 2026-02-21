// On définit nos interfaces pour la sécurité des types
interface Publication {
    id: number;
    titre: string;
    auteur: string;
    date: string;
    contenu: string;
}

interface Commentaire {
    id: number;
    contenu: string;
    postId: number;
}

$(document).ready(() => {
    // 1. Extraire l'ID de l'URL (ex: blog.html?id=3) 
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (postId) {
        chargerPublication(postId);
        chargerCommentaires(postId);
        envoyerCommentaire(postId);
    } else {
        console.error("Aucun identifiant de publication trouvé dans l'URL.");
    }
});

// 2. Charger le contenu de l'article 
function chargerPublication(id: string) {
    $.ajax({
        url: `http://localhost:3000/posts/${id}`,
        method: 'GET',
        success: (pub: Publication) => {
            const $liste = $('#contenus'); // Cible le conteneur de l'article
            $liste.empty(); // On vide le contenu statique
            
            const blogHtml = `
                <div class="col-lg-8">
                   <h1 class="text-center">${pub.titre}</h1>
                      <p>${pub.contenu}</p>
                        <figure class="text-center my-4">
                            <img src="image/cloud.png" alt="Caption" class="img-fluid" style="max-width: 300px;">
                            <figcaption class="mt-2">Caption</figcaption>
                        </figure>
                </div>`;
            $liste.append(blogHtml);
        },
        error: (err) => console.error("Erreur lors du chargement de l'article :", err)
    });
}

// 3. Charger et afficher les commentaires 
function chargerCommentaires(id: string) {
    $.ajax({
        url: `http://localhost:3000/comments?postId=${id}`,
        method: 'GET',
        success: (commentaires : Commentaire[]) => {
            const $listeCommentaires = $('#liste-commentaires');
            $listeCommentaires.empty();

            commentaires.forEach(com => {
                const bloc = `
                    <div class="d-flex gap-3 mb-4">
                        <div>
                            <i class="bi bi-person-circle fs-1"></i>
                        </div>
                        <div class="flex-grow-1">
                            <p class="mb-0">${com.contenu}</p>
                        </div>
                    </div>`;
                $listeCommentaires.append(bloc);
            });
        },
        error: (err) => console.error(err)
    });
}



function envoyerCommentaire(id: string) {
    // On cible spécifiquement le bouton "Submit" à l'intérieur de ta div
    $('#form-commentaire button').on('click', function(e) {
        e.preventDefault(); // Bonne pratique pour éviter un comportement inattendu

        // On récupère directement la valeur (le texte) du textarea
        const contenu = $('#form-commentaire textarea').val() as string;
        const today = new Date().toISOString().split('T')[0];

        // On vérifie que le champ n'est pas vide (trim() enlève les espaces vides)
        if (!contenu || contenu.trim() === "") {
            console.warn("Le commentaire est vide.");
            return; // On arrête l'exécution de la fonction ici
        }

        // On prépare les données à envoyer
        const nouveauCommentaire = {
            contenu: contenu.trim(),
            postId: id, // On s'assure que c'est bien un nombre
            date: today
        };

        // Requête POST vers ton serveur
        fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(nouveauCommentaire),
        })
        .then((response) => response.json())
        .then((json) => {
            console.log("Commentaire ajouté :", json);
            
            // 1. On vide manuellement le textarea
            $('#form-commentaire textarea').val('');
            
            // 2. On recharge la liste pour afficher le nouveau commentaire
            chargerCommentaires(id);
        })
        .catch((error) => console.error('Erreur:', error));
    });
}