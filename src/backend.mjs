// BAUDRY Léo MMI1 TP B1

import PocketBase from 'pocketbase' ;
const pb = new PocketBase('http://127.0.0.1:8090') ;

export async function allMaisons() {
    let records = await pb.collection('Maison').getFullList();
    records = records.map((maison) => {
        maison.imgUrl = pb.files.getURL(maison, maison.images[0]);
        return maison;
    });
    return records;
    }

// Q11 : Ecrire la fonction ”oneID” qui retourne une seule maison en passant l’id de cette maison en paramètre et testez-la.

export async function oneID(id) {
    const records = await pb.collection('Maison').getOne(id);
    return records;
}

// Q12 : Ecrire la fonction ”allMaisonsFavori” qui retourne toutes les maisons en favori et testez-la.

export async function allMaisonsFavori() {
    const records = await pb.collection('Maison').getFullList({
        filter: 'favori = true'
    });
    return records;
}

// Q13 : Ecrire la fonction ”allMaisonsSorted” qui retourne toutes les maisons ordonnées par ordre croissant de leur prix et testez-la.

export async function allMaisonsSorted() {
    const records = await pb.collection('Maison').getFullList({
        sort: 'prix'
    });
    return records;
}

// Q14 : Ecrire une fonction ”bySurface” qui prend en paramètre une surface et qui retourne la liste de toutes les maisons ayant une superficie supérieur à surface.

export async function bySurface(surface) {
    const records = await pb.collection('Maison').getFullList({
        filter: `surface > ${surface}`
    });
    return records;
}

// Q15 : Ecrire une fonction ”surfaceORprice” qui prend en paramètre une surface et un prix (p) et qui retourne la liste de toutes les maisons ayant une superficie 
// supérieur à surface ou un prix inférieur `a p.

export async function surfaceORprice(surface, p) {
    const records = await pb.collection('Maison').getFullList({
        filter: `surface > ${surface} || prix < ${p}`
    });
    return records;
}

// Q19 : Ajouter une fonction dans le fichier backend.mjs permettant de remonter les données d’un agent en passant son id en paramètre.

export async function getAgentById(id) {
        const records = await pb.collection('Agents').getOne(id);
        return records;
}
            //
            //
            //
            // Autres fonctions de tri
            //
            //
            //

// Trier les maisons par ordre alphabétique 

export async function sortByNomMaison() {
    const records = await pb.collection('Maison').getFullList({
        sort: 'nomMaison' 
    });
    return records;
}

// Trie les maisons par nombre de salles de bain (ordre croissant).

export async function sortByNbSdb() {
    const records = await pb.collection('Maison').getFullList({
        sort: 'nbSdb' 
    });
    return records;
}

////////////////////////// TP 4 //////////////////////////
export async function getOffre(id) {
    try {
        let data = await pb.collection('Maison').getOne(id);
        data.imageUrl = pb.files.getURL(data, data.images[0]);
        //console.log('Offre récupérée :', data);
        
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}