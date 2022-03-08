export default class ToDoJS {
  async getJS() {
    //  VARIABLES

    const $ = (select) => document.querySelector(select)
    const $C = (select) => document.createElement(select)

    const LIST_DO = $('ul#list-do')
    const LIST_X = $('ul#list-X')
    const NEW_ITEM = $('#item')
    // const SECTION_LIST = $('#section-list')
    const FORM = $('form')
    //  Botones de la sección input
    const BTN_OK = $('button#btn-OK')
    const BTN_X = $('i#btn-X')

    //  FUNCIONES
    //  Chequea si hay algo en localStorage
    if (!localStorage.getItem('localToDo')) {
      var localToDo = []
    } else {
      var localToDo = JSON.parse(localStorage.getItem('localToDo'))
      toDoRender(localToDo)
    }
    // window.onload = () => {
    //   toDoRender(localToDo)
    // }

    // 🏗 Constuctor de la notas
    function Note(text, isDone) {
      ;(this.text = text), (this.isDone = isDone)
    }

    // 🎮 Crean los botones de los elementos
    const btnItem = (li) => {
      let btnUp = $C('i')
      btnUp.className = 'fa-solid fa-angle-up'
      li.appendChild(btnUp)

      let btnDown = $C('i')
      btnDown.className = 'fa-solid fa-angle-down'
      li.append(btnDown)

      let btnDel = $C('i')
      btnDel.className = 'fa-solid fa-trash'
      li.append(btnDel)
    }

    // ♻ Resetea nodos de lista
    const removeChildren = (parent) => {
      while (parent.lastChild) {
        parent.removeChild(parent.lastChild)
      }
    }
    // 🖊 Renderiza el contenido de la lista
    function toDoRender(ToDo) {
      let isDone = ToDo.filter((elem) => elem.isDone)
      let toDo = ToDo.filter((elem) => !elem.isDone)
      console.log(isDone)
      console.log(toDo)

      isDone.forEach((elem) => {
        let nuevoItemValue = $C('li')
        nuevoItemValue.innerHTML = `
         <span class="text-xl">${elem.text}</span>
        `
        nuevoItemValue.className =
          'flex flex-grow justify-between bg-white mb-2 py-1 px-3 rounded shadow-md'
        LIST_X.append(nuevoItemValue)
      })

      toDo.forEach((elem) => {
        let nuevoItemValue = $C('li')
        nuevoItemValue.innerHTML = `
         <span class="text-xl">${elem.text}</span>
         <div class="btn-container">
          <i class="fa-solid fa-angle-up"></i>
          <i class="fa-solid fa-angle-down"></i>
          <i class="fa-solid fa-trash"></i>
         </div>
        `
        nuevoItemValue.className =
          'flex flex-grow justify-between bg-white mb-2 py-1 px-3 rounded shadow-md'
        LIST_DO.append(nuevoItemValue)
      })
    }

    //  ADDEVENT
    // ➕ crea un nuevo elemento en la lista
    FORM.addEventListener('submit', (e) => {
      if (NEW_ITEM.value === '') {
        alert('La nota debe tener contenido')
        NEW_ITEM.focus()
      } else {
        e.preventDefault()
        // let lis = document.querySelectorAll('li')

        removeChildren(LIST_DO)
        removeChildren(LIST_X)
        let note = new Note(NEW_ITEM.value, false)
        localToDo.push(note)
        localStorage.setItem('localToDo', JSON.stringify(localToDo))

        console.log(localToDo)
        toDoRender(localToDo)
        NEW_ITEM.value = ''
      }
    })

    /*
      0 -> ✅ Crear lista que luego se guardará en localStorage (con nombre 'localToDo' y en notas 'Notas')
      1 -> ✅ Comprobar que el localStorage está vacío (la lista correspondiente) y si no
      2 -> ✅ Función que renderice el contenido de la lista de localStorage
      4 -> ✅ Evento que guarde cada elemento en la lista
      5 -> ✅ Resetear cada lista
        5.1 -> Modal que al clicar en el botón pregunte si es eso lo que se quiere hacer
      6 -> Resetear solo los 'done'
      7 -> Volver a renderizar cuando se vuelva a la vista (buscar intersection observer en portfolio)
      **   ✅ Probar a crear elementos con `` en lugar de con create element etc.
    */

    BTN_OK.addEventListener('mouseover', () => {
      BTN_OK.title = 'Agrega el elemento a la lista'
    })

    //  resetea por completo la lista
    BTN_X.addEventListener('click', () => {
      localToDo = []
      localStorage.removeItem('localToDo')
      removeChildren(LIST_DO)
      removeChildren(LIST_X)
      toDoRender(localToDo)
    })
    BTN_X.addEventListener('mouseover', () => {
      BTN_X.title = 'Elimina TODOS los elementos'
    })

    //  acciones de los botones item
    LIST_DO.addEventListener('click', (event) => {
      let eT = event.target
      if (eT.tagName === 'I') {
        if (eT.className === 'fa-solid fa-angle-up') {
          let div = eT.parentNode
          let li = div.parentNode
          let prev = li.previousElementSibling
          let ul = li.parentNode
          if (prev) {
            ul.insertBefore(li, prev)
          }
        }
        if (eT.className === 'fa-solid fa-angle-down') {
          let div = eT.parentNode
          let li = div.parentNode
          let next = li.nextElementSibling
          let ul = li.parentNode
          if (next) {
            ul.insertBefore(next, li)
          }
        }
        if (eT.className === 'fa-solid fa-trash') {
          let li = eT.parentNode.parentNode
          let text = li.firstElementChild.innerText
          console.log(localToDo.filter((elem) => elem.text === text)[0])
          localToDo.splice(
            localToDo.indexOf(
              localToDo.filter((elem) => elem.text === text)[0]
            ),
            1
          )
          localStorage.setItem('localToDo', JSON.stringify(localToDo))
          console.log(localToDo)
          removeChildren(LIST_DO)
          removeChildren(LIST_X)
          toDoRender(localToDo)
        }
      }

      if (event.target.tagName === 'SPAN') {
        let text = eT.parentNode.firstElementChild.innerHTML
        console.log(localToDo.filter((elem) => elem.text === text)[0])
        console.log(`el${eT.parentNode.firstElementChild.innerHTML}`)
        console.log(localToDo)
        localToDo.filter((elem) => elem.text === text)[0].isDone = true
        removeChildren(LIST_DO)
        removeChildren(LIST_X)
        toDoRender(localToDo)
      }
    })

    //  evento para que al hacer hover se visualice la propiedad title
    LIST_DO.addEventListener('mouseover', (event) => {
      if (event.target.tagName == 'I') {
        if (event.target.className == 'fa-solid fa-angle-up') {
          let butt = event.target
          butt.title = 'sube el elemento'
        }
        if (event.target.className == 'fa-solid fa-angle-down') {
          let butt = event.target
          butt.title = 'baja el elemento'
        }
        if (event.target.className == 'fa-solid fa-trash') {
          let butt = event.target
          butt.title = '¡CUIDADO! Elimna el elemento'
        }
      }
      if (event.target.tagName == 'LI') {
        let butt = event.target
        butt.title = 'Marcar como realizado'
      }
    })
  }
}
