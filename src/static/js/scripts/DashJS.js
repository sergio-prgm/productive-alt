export default class DashJS {
  async getJS() {
    // const p1 = document.querySelectorAll("p")[0]
    const BUTT = document.querySelector("button")

    BUTT.addEventListener("click", e => {
      alert("Estamos funionando")
    })
  }
}