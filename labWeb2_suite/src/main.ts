// 1. Le "moule" pour une publication 
interface Publication {
    id: number;
    titre: string;
    auteur: string;
    date: string;
    contenu: string;
}

// 2. Attendre que la page soit prête
$(document).ready(() => {
    chargerPublications();
});

function chargerPublications() {
    $.ajax({
        url: 'http://localhost:3000/posts',
        method: 'GET',
        success: (publications: Publication[]) => {
            const $liste = $('#liste-publications');
            $liste.empty(); // On vide le contenu statique

            publications.forEach(pub => {
                const carte = `
                    <div class="col-12 col-lg-4">
                        <div class="card h-100 shadow-sm">
                            <img src="image/entrepreneur.png" class="card-img-top" alt="${pub.titre}">
                            <div class="card-body">
                                <h5 class="card-title">${pub.titre}</h5>
                                <p class="card-text">${pub.contenu.slice(0, 100)}...</p>
                                <a href="blog.html?id=${pub.id}" class="btn btn-primary">Lire l'article</a>
                            </div>
                        </div>
                    </div>`;
                $liste.append(carte);
            });
        },
        error: (err) => console.error("Erreur API :", err)
    });
}