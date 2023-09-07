// Separate Function for localStorage

const localStore = (key,data) => {
    if(data !== undefined) {
        localStorage.setItem(key, JSON.stringify(data))
    }
    let storedData = localStorage.getItem(key);
    return storedData ?  JSON.parse((storedData)) : [];
}

const getInput = (inputId) => {
    return document.getElementById(inputId)
}

const getMultiple = (inputId) => {
    return document.querySelectorAll(inputId)
}

const formInput = () => {
    const todoInput = getInput("inputData")
    todoInput.addEventListener("keydown", (e) => {
      if(e.key == "Enter") {
        const prevItem = Array.from(localStore('items'))
        const newItem = todoInput.value
        prevItem.unshift(newItem)
        
        localStore("items", prevItem )
        location.reload()
      } 
    })
}

const displayData = () => {
    const lists = getInput("listed")
    let storedData = localStore("items").map((i) => { 
        // console.log(i)

        return(
            `
            <div class="p-8  md:mt-0 py-6  border-r-4  shadow-lg border-l-4 border-[#4b8b6d] rounded w-2/3 md:w-1/4 flex  justify-between items-center">
            <div class="cursor-pointer popup-input break-anywhere ">${i}</div>
           <div class="flex items-center gap-2">
           <div id="dust">
             <i class="fa-solid fa-trash cursor-pointer "></i>
           </div>
             <i id="edit" class="fa-solid fa-pen-to-square cursor-pointer"></i>
           </div>
          </div>
            `
        )
    })

    lists.innerHTML = storedData.join('')
    removeData()
    editTodo()
}

const removeData = () => {
    const remove = getMultiple("#dust")
    
    Array.from(remove).map((e,i) => {
        e.addEventListener("click", () => {
          const presentData = localStore("items")
          presentData.splice(i,1)
          localStore("items", presentData)
          location.reload()
        })
    }) 
}

const enterEvent = (text) => {
  let up = getInput("up")
  up.addEventListener("keydown", (e) => {
    if(e.key == "Enter") {
      let todoData = localStore("items");
      const index = localStore("items").indexOf(text);
      todoData[index] = up.value;
      localStore("items", todoData)
      location.reload()
    }
  })
}





const clickEvent = () => {
  const modal = getInput('modal')
  let back = getInput("back")
  back.addEventListener("click" , () => {
    modal.style.display = "none";
  })

}



const editTodo = () => {
   const modal = getInput("modal")

    const update = getMultiple("#edit")
    // console.log(update)
    Array.from(update).map((e) => {
      e.addEventListener("click", () => {
        let todotText = e.parentNode.parentNode.querySelector(".popup-input").textContent;

        modal.innerHTML = ``;

        const content = `
          <p class="w-full text-xs text-left">This is your editspace</p>
              <div>
              <input id="up" type="text" class="text-sm mt-2 outline-none bg-transparent" value="${todotText}">
              </div>
              <div id="back" class="absolute top-0 right-0 cursor-pointer"><i class="fa-solid fa-arrow-left"></i></div>
        `;

        modal.insertAdjacentHTML('beforeend', content);
        modal.style.display = "flex"

        clickEvent()

        enterEvent(todotText)
      })
    })
}

editTodo()
// console.log(removeData())
removeData()
displayData()
formInput()
localStore("items")













