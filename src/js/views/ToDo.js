import AbstractView from './AbstractView.js'

export default class extends AbstractView {
  constructor() {
    super()
    this.setTitle('To-Do')
  }

  async getHtml() {
    return `
    <h1 class="text-3xl my-4 font-semibold text-center">Lista de quehaceres</h1>

    <section id="section-input" class="flex justify-center content-center mb-4">

      <form id="form">
      <input type="text" name="item" id="item" placeholder="Añade una nueva tarea" class="form-control px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-500 focus:outline-none flex-grow" >

      <button id="btn-OK" type="submit"><i class="fa-solid fa-plus text-xl cursor-pointer mx-1 ml-2 p-1 self-center"></i></button>

      <i id="btn-X" class="fa-solid fa-xmark text-xl cursor-pointer mx-1 p-1 self-center"></i>
      
      </form>
    </section>

    <section id="section-list" class="flex justify-center items-center flex-nowrap flex-col">
      <ul id="list-X" class="line-through flex flex-col justify-center flex-auto w-5/6 text-gray-400 italic">
      </ul>
      <ul id="list-do" class="flex flex-col justify-center flex-auto w-5/6"> 
      </ul>
    </section>
    `
  }
}
