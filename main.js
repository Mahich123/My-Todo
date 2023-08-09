const TodoArr = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []

// console.log(TodoArr)

const input = document.querySelector("#inputData")

input.addEventListener("keydown", (e) => {
  if(e.key == "Enter") {
   TodoArr.unshift(input.value)
   localStorage.setItem("items", JSON.stringify(TodoArr))
  //  localStorage.clear()
    location.reload()
    e.preventDefault()
  }
})

const lists = document.querySelector("#listed")
console.log(lists)

const display = () => {
  let storedItem = TodoArr.map((i) => {
    return(
      `
      <div class="p-8  md:mt-0 py-6  border-r-4  shadow-lg border-l-4 border-[#4b8b6d] rounded w-2/3 md:w-1/4 flex  justify-between items-center">
      <div class="break-anywhere ">${i}</div>
      <div id="dust">
        <i class="fa-solid fa-trash cursor-pointer "></i>
      </div>
    </div>
      `
    )
  })
  lists.innerHTML = storedItem.join('')


}

display()

let rmv = document.querySelectorAll("#dust")
console.log(rmv)


const remove = () => {
  rmv.forEach((t,i) => {
    t.addEventListener("click", () => {
      TodoArr.splice(i,1)
      localStorage.setItem("items", JSON.stringify(TodoArr))
      location.reload()
    })
  })
  
}

remove()

let modal = document.querySelector("#modal")
// console.log(modal)

lists.addEventListener("click", () => {
  modal.style.display = "flex"
})