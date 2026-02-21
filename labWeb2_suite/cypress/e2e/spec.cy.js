// Bloc principal qui regroupe les tests liés à la redirection
describe('Test de redirection vers la page détails', () => {

  // Cas de test individuel : vérifie que la redirection fonctionne
  it('Redirige correctement vers la page de détails', () => {

    // Ouvre la page principale dans le navigateur
    cy.visit('http://127.0.0.1:5501/web/principal.html')

    // Recherche un élément contenant le texte "Menu1"
    // puis simule un clic dessus
    cy.contains('Menu1').click()

    // Vérifie que l'URL actuelle correspond EXACTEMENT
    // à l'URL attendue après la redirection
    cy.url().should('eq', 'http://127.0.0.1:5501/web/blog.html')

  })

})
