import AbstractView from './AbstractView.js'

export default class extends AbstractView {
  constructor() {
    super()
    this.setTitle('Note Taking')
  }

  async getHtml() {
    return `
    <h1 class="text-3xl my-4 font-semibold text-center">Note App</h1>
    <section id="input-section">
      <form id="form">
        <label for="note-title">Título de la nota:</label>
        <input type="text" name="note-title" id="note-title" placeholder="Nota 1" autofocus class="form-control px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-500 focus:outline-none flex-grow">

        <textarea name="note-content" id="note-content" rows="4" placeholder="Escribe tu nueva nota..." class="block mt-4 w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-500 focus:outline-none"></textarea>

        <button type="submit" class="btn-note mt-4 self-end px-6 py-2.5 bg-indigo-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">Agregar</button>
      </form>
    </section>
    <section id="note-section" class="note-section mt-6 grid grid-cols-2 gap-4">
  
    </section>
    <script src="jS/app.js"></script>
    `
  }
}
