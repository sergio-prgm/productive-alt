import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super()
    this.setTitle("Productive App")
  }

  async getHtml() {
    return `
      <h1>Welcome back, Dom</h1>
      <p>
        Esto es así y así es esto
      </p>
      <p>
        <a href="/posts" data-link>View recent posts</a>
      </p>
      <button>Click me!</button>
    `
  }
}
