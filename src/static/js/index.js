import Dashboard from "./views/Dashboard.js"
import DashJS from "./scripts/DashJS.js"
import ToDo from "./views/ToDo.js"
import ToDoJS from "./scripts/ToDoJS.js"
import NoteTaking from "./views/NoteTaking.js"
import NoteJS from "./scripts/NoteJS.js"

//  Use the history API to not load each route every time it is requested. Works in conjunction with Event listener on the links (l. 39)
const navigateTo = url => {
  history.pushState(null, null, url)
  router()
}

const router = async () => {
  const routes = [
    { path: "/", view: Dashboard, script: DashJS },
    { path: "/ToDo", view: ToDo, script: ToDoJS },
    { path: "/NoteTaker", view: NoteTaking, script: NoteJS}
  ]

  const potentialMatches = routes.map(route => { 
    return {
      route: route,
      isMatch: location.pathname === route.path
    }
  })

  //  Sets match to the route in use
  let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch)

  //  Gives a default fallback when a route doesn't match any
  if (!match) {
    match = {
      route: routes[0],
      isMatch: true
    }
  }

  const view = new match.route.view()
  const script = new match.route.script()

  //  Injects innerHTML from the class of the active route to the 'app' element
  document.querySelector("#app").innerHTML = await view.getHtml()
  await script.getJS()

}

//  Allows browser navigation to work as expected
window.addEventListener("popstate", router)

//  Listen to the content loaded and runs the router
document.addEventListener("DOMContentLoaded", () => {
  //  Delegated event listener so that, if new content gets added to the page, the links still work
  document.body.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault() // prevents the link to be followed 
      navigateTo(e.target.href)
    }
  })
  router();
})