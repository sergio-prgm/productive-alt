export default class NoteJS {
  async getJS() {

    //  VARIABLES 

const $ = select => document.querySelector(select)
const $C = select => document.createElement(select)

const NOTE_TITLE = $("input#note-title");
const NOTE_CONTENT = $("textarea#note-content");
const BTN_OK = $("button.btn-note");
const NOTE_SECTION = $("section#note-section");
const FORM = $('form')

let span = document.getElementsByClassName("close")[0];


//  FUNCIONES
//  Genera la tarjeta donde va la nota y el modal. Este último empieza con display: none desde la clase de CSS. 
function creaNota() {
    let newArticle = $C('article')
    let title = $C('h5')
    let content = $C('p')
    let btnDel = $C('button')

    let modal = $C('div')
    let modalDialog = $C('div')
    let modalContent = $C('div')

    let modalHeader = $C('div')
    let btnClose = $C('button')
    let modalTitle = $C('h5')

    let modalText = $C('p')

    let btnEdit = $C('button')
    
    title.innerText = NOTE_TITLE.value;
    title.className = 'text-gray-900 text-xl leading-tight font-medium mb-2'

    content.innerText = NOTE_CONTENT.value;
    content.className = 'text-gray-700 text-base mb-4'
    newArticle.className = 'flex flex-col flex-wrap grid-article block p-6 rounded-lg shadow-lg bg-white max-w-sm hover:cursor-pointer';
    newArticle.id = title.innerText;
    btnDel.innerText = 'Borrar';
    btnDel.id = 'btnDel';
    btnDel.className = 'self-end px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out'

    modal.className = 'modal fixed flex jsutify-center top-0 left-0 hidden bg-gray-700 bg-opacity-50 w-full h-full outline-none overflow-x-hidden overflow-y-auto px-6 py-20'
    modalDialog.className = 'modal-dialog mx-auto max-w-xl pointer-events-none'
    modalContent.className = 'modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current'

    modalHeader.className = 'modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md'
    btnClose.className = 'btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus: opacity-100 hover:text-black hover:opacity-75 hover:no-underline';
    btnClose.innerHTML = '&times;';
    modalTitle.innerText = NOTE_TITLE.value;
    modalTitle.className = 'text-xl font-medium leading-normal text-gray-800'

    modalText.innerText = NOTE_CONTENT.value;
    modalText.className = 'modal-body relative p-4'
    btnEdit.innerText = 'Editar';
    btnEdit.id = 'btnEdit';

    newArticle.append(title, content, btnDel);
    NOTE_SECTION.append(newArticle);

    modalHeader.append(modalTitle, btnClose)
    modalContent.append(modalHeader, modalText, btnEdit);
    modalDialog.append(modalContent)
    modal.append(modalDialog);
    NOTE_SECTION.append(modal);

    NOTE_TITLE.value = '';
    NOTE_CONTENT.value = '';
}

//  EVENTOS
//  Crea la nota, alerta si el contenido de la nota es nulo y genera un título si no se le ha dado ninguno
FORM.addEventListener('submit', (e) => {
  e.preventDefault()

  if(NOTE_CONTENT.value !== '' && NOTE_TITLE.value !== ''){
    creaNota();
  }
  else if(NOTE_CONTENT.value == ''){
    alert('Debe rellenar la nota');
    NOTE_CONTENT.focus()
  }
  else if(NOTE_TITLE.value == ''){
    let sectionInt = document.querySelectorAll('article');
    let newTitle = sectionInt.length + 1;
    NOTE_TITLE.value = `Nota ${newTitle}`;
    creaNota();
  }
});

//  Muestra el modal cuando se clica en el article o en sus hijos (p y h3). También elimina la nota cuando se clica el btnDel
NOTE_SECTION.addEventListener('click', (event) => {
  if (event.target.tagName === 'ARTICLE'){
    let showModal = event.target.nextElementSibling;
    showModal.style.display = 'block';
  }
  if (event.target.parentNode.tagName === 'ARTICLE' && event.target.tagName === 'BUTTON') {
    // NOTE_SECTION.removeChild(event.target.parentNode);
    event.target.parentNode.style.display = 'none';
  }
  else  if (event.target.parentNode.tagName === 'ARTICLE') {
    let modalSibling = event.target.parentNode;
    let showModal = modalSibling.nextElementSibling;
    showModal.style.display = 'block';
  }
});

//  Oculta el modal cuando se clica en la X (span) o fuera del modal. También añade funcionalidad al botón editar.
//  ¡¡¡YA EDITA EL CONTENIDO DE DENTRO DEL MODAL Y AFECTA A LA NOTA ORIGINAL!!!
window.addEventListener('click', (event) => {
  if (event.target.matches('.modal')) {
    let modi = event.target;
    modi.style.display = 'none';
  }
  if (event.target.matches('.btn-close')) {
    let modiC = event.target.parentNode.parentNode;
    let modi = modiC.parentNode.parentNode;
    modi.style.display = 'none';
  }
  if (event.target.id === 'btnEdit') {
    let modalCont = event.target.parentNode;
    let btnEditar = event.target;
    let prevSib = btnEditar.previousSibling;

    if (btnEditar.innerText === 'Editar'){
      let editText = $C('textarea');
      
      btnEditar.innerText = 'Aceptar';
      editText.className = 'textEdit';
      editText.value = prevSib.innerText;
      prevSib.style.display = 'none';
      btnEditar.parentNode.insertBefore(editText, btnEditar);
      editText.focus()
    } 
    else {
      let editText = prevSib; // Textarea 👌
      let textGB = prevSib.previousSibling; // El p oculto 👌
      let modTit = modalCont.firstElementChild.firstElementChild.innerText; // Contenido del títlo del modal
      let ogNote = document.getElementById(modTit); // nota original
      let ogContent = ogNote.querySelector('p');

      btnEditar.innerText = 'Editar';
      textGB.innerText = editText.value;
      textGB.style.display = 'block';
      modalCont.removeChild(editText);
      ogContent.innerText = editText.value;
    }
  }
});
  }
}

//  ✅ Estado actual => hacer que funcione el editar texto (l. 129)
//  Estado actual => estilar la parte del input y el botón editar del modal y el textarea del modal
//  Falta => estilar las notas creadas, añadir espacio al modal, darle un poco de estilo en general a la página
