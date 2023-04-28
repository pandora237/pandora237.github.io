const form=document.querySelector('form');
const tbody=document.querySelector('tbody');
const tacheKey='Ma liste de taches';
let list_tache = JSON.parse(localStorage.getItem(tacheKey))!=null? JSON.parse(localStorage.getItem(tacheKey)) : [];


const creationLigne=(tache)=>{
 
    const tr=document.createElement('tr');
    tr.innerHTML=`
                <td>${tache.numero}</td>
                <td>${tache.nom}</td>
                <td>${tache.urgence}</td>
                    `
    const mod=document.createElement('button');
    mod.innerText='modifier'
    mod.addEventListener('click', (Event)=>{
        
    })
    const delB=document.createElement('button');
    delB.innerText="supprimer";
    tr.appendChild(delB);
    delB.addEventListener('click', (event)=>{
        tr.remove();
        suppLocal(tache);
    });
    tbody.appendChild(tr);
};
const suppLocal=(tache)=>{
    let taches=list_tache.filter(t=>t.numero!=tache.numero);
    localStorage.setItem(tacheKey, JSON.stringify(taches));
}

const refreshTache=()=>{
    tbody.innerHTML="";
    list_tache.forEach(tache=>creationLigne(tache));
}



/**
 * @
 */
const persistance=(tache)=>{
    const existT=list_tache.find(t=>t.numero==tache.numero);
    if(existT){
        list_tache=list_tache.map((t)=>{
            if (existT.numero==t.numero){return tache}else{return t}
        })
    }else{list_tache.push(tache);}
    localStorage.setItem(tacheKey, JSON.stringify(list_tache));
    refreshTache();
}


refreshTache();

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    const formdata= new FormData(form);

    const tache={   numero:formdata.get('numero'),
                    nom:formdata.get('nom'),
                    urgence:formdata.get('urgence')==0 ? "NON": "OUI"
                }
    persistance(tache);

    form.reset();
})