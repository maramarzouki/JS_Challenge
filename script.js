document.addEventListener("DOMContentLoaded", function () {


    const bAdd = document.getElementById('addbookBtn');
    bAdd.addEventListener("click", function () { showAddForm() });

    var bookList=[]

    var savedBookList = localStorage.getItem('booklist');
    if (savedBookList) {
        bookList = JSON.parse(savedBookList);
        var table = document.getElementById('table_livre');
        table.innerHTML = ``;
    
        for (const l of bookList) {
            var list = document.createElement('tr');
            list.innerHTML = `
                <td>${l.id}</td>
                <td>${l.titre}</td>
                <td>${l.auteur}</td>
                <td>${l.prix}</td>
                <td><button type="button" class="btn btn-primary" id="edit_${l.id}">Editer</button></td>
                <td><button type="button" class="btn btn-danger" id="delete_${l.id}">Supprimer</button></td>
            `;
            
            table.appendChild(list);
        }

    }
    

    var add_zone = document.getElementById('add_form'); 
    function showAddForm () {
        add_zone.innerHTML = 
        `<div>
            <h2>Ajouter un nouveau livre</h2>
            <h6>Titre</h6>
            <input type="text" id="l_titre" class="form-control" placeholder="Titre" aria-label="Titre" aria-describedby="basic-addon1"/>
            <h6>Auteur</h6>
            <input type="text" id="l_auteur" class="form-control" placeholder="Auteur" aria-label="auteur" aria-describedby="basic-addon1"/>
            <h6>Prix</h6>
            <input type="text" id="l_prix" class="form-control" placeholder="Prix" aria-label="Prix" aria-describedby="basic-addon1"/>
            <button type="button" class="btn btn-primary" id="valider">Valider</button>
            <button type="button" class="btn btn-danger" id="reinit">Réinitialiser</button>
        </div>`;
    

        var valider_btn = document.getElementById('valider');
        valider_btn.addEventListener('click', function () {valider_livre()})

        var reinit_btn = document.getElementById('reinit');
        reinit_btn.addEventListener('click', function (){reinit_form()} )


        function valider_livre() {
            var i_titre = document.getElementById('l_titre').value;
            var i_auteur = document.getElementById('l_auteur').value;
            var i_prix = document.getElementById('l_prix').value;

            var livre = {
                id: bookList.length + 1,
                titre: i_titre,
                auteur: i_auteur,
                prix: i_prix
            }
            bookList.push(livre)

            add_zone.innerHTML=``

            showBooksList();

            localStorage.setItem('booklist', JSON.stringify(bookList));
        }

        function reinit_form() {
            document.getElementById('l_titre').value="";
            document.getElementById('l_auteur').value="";
            document.getElementById('l_prix').value="";
        }

        function showBooksList () {
            var table = document.getElementById('table_livre');
            table.innerHTML = ``;

            for (const l of bookList) {
                var list = document.createElement('tr');
                list.innerHTML = `
                    <td>${l.id}</td>
                    <td>${l.titre}</td>
                    <td>${l.auteur}</td>
                    <td>${l.prix}</td>
                    <td><button type="button" class="btn btn-primary" id="edit_${l.id}">Editer</button></td>
                    <td><button type="button" class="btn btn-danger" id="delete_${l.id}">Supprimer</button></td>
                `;
                
                table.appendChild(list)

                
                var editBtn = document.getElementById(`edit_${l.id}`);
                editBtn.addEventListener('click', function(){
                    add_zone.innerHTML=``;
                    add_zone.innerHTML=
                    `<div>
                        <h2>Modifier un livre</h2>
                        <h6>Titre</h6>
                        <input type="text" id="e_titre" class="form-control" placeholder="Titre" aria-label="Titre" aria-describedby="basic-addon1"/>
                        <h6>Auteur</h6>
                        <input type="text" id="e_auteur" class="form-control" placeholder="Auteur" aria-label="auteur" aria-describedby="basic-addon1"/>
                        <h6>Prix</h6>
                        <input type="text" id="e_prix" class="form-control" placeholder="Prix" aria-label="Prix" aria-describedby="basic-addon1"/>
                        <button type="button" class="btn btn-primary" id="valider_edit" style="margin:10px">Valider</button>
                    </div>`;



                    document.getElementById("valider_edit")
                    .addEventListener("click", function(){
                        const b = bookList.findIndex(livre=> livre.id ===l.id);
                        if (b !== -1) {
                            var nv_titre = document.getElementById('e_titre').value;
                            var nv_auteur = document.getElementById('e_auteur').value;
                            var nv_prix = document.getElementById('e_prix').value;
                            var nv_info = {
                                titre:nv_titre, 
                                auteur:nv_auteur, 
                                prix:nv_prix
                            }
                            bookList[b] = { ...bookList[b], ...nv_info };
                        }
                        add_zone.innerHTML=``
                        showBooksList();
                    })
                    console.log(l);
                })

                var deleteBtn = document.getElementById(`delete_${l.id}`);
                deleteBtn.addEventListener('click', function(){
                    const b = bookList.findIndex(livre=> livre.id ===l.id);
                    if(b!==-1){
                        bookList.splice(b, 1);
                        localStorage.setItem('booklist', JSON.stringify(bookList));
                        showBooksList();
                    } 
                })
            }
        }
    }


    var savedBookList = localStorage.getItem('booklist');
    if (savedBookList) {
        var bookList = JSON.parse(savedBookList);
        var table = document.getElementById('table_livre');
        table.innerHTML = ``;
    
        for (const l of bookList) {
            var list = document.createElement('tr');
            list.innerHTML = `
                <td>${l.id}</td>
                <td>${l.titre}</td>
                <td>${l.auteur}</td>
                <td>${l.prix}</td>
                <td><button type="button" class="btn btn-primary" id="edit_${l.id}">Editer</button></td>
                <td><button type="button" class="btn btn-danger" id="delete_${l.id}">Supprimer</button></td>
            `;
            
            table.appendChild(list);
        }
        showBooksList();
        var editBtn = document.getElementById(`edit_${l.id}`);
        editBtn.addEventListener('click', function(){
            add_zone.innerHTML=``;
            add_zone.innerHTML=
            `<div>
                <h2>Modifier un livre</h2>
                <h6>Titre</h6>
                <input type="text" id="e_titre" class="form-control" placeholder="Titre" aria-label="Titre" aria-describedby="basic-addon1"/>
                <h6>Auteur</h6>
                <input type="text" id="e_auteur" class="form-control" placeholder="Auteur" aria-label="auteur" aria-describedby="basic-addon1"/>
                <h6>Prix</h6>
                <input type="text" id="e_prix" class="form-control" placeholder="Prix" aria-label="Prix" aria-describedby="basic-addon1"/>
                <button type="button" class="btn btn-primary" id="valider_edit" style="margin:10px">Valider</button>
            </div>`;



            document.getElementById("valider_edit")
            .addEventListener("click", function(){
                const b = bookList.findIndex(livre=> livre.id ===l.id);
                if (b !== -1) {
                    var nv_titre = document.getElementById('e_titre').value;
                    var nv_auteur = document.getElementById('e_auteur').value;
                    var nv_prix = document.getElementById('e_prix').value;
                    var nv_info = {
                        titre:nv_titre, 
                        auteur:nv_auteur, 
                        prix:nv_prix
                    }
                    bookList[b] = { ...bookList[b], ...nv_info };
                }
                add_zone.innerHTML=``
                showBooksList();
            })
            console.log(l);
        })

        var deleteBtn = document.getElementById(`delete_${l.id}`);
        deleteBtn.addEventListener('click', function(){
            const b = bookList.findIndex(livre=> livre.id ===l.id);
            if(b!==-1){
                bookList.splice(b, 1);
                showBooksList();
            } 
        })
        
    }


});
