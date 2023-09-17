// LOCAL STORAGE

const localStore = (key,data) => {
    if(data !== undefined) {
        localStorage.setItem(key, JSON.stringify(data))
    }
    let storedData = localStorage.getItem(key);
    return storedData ?  JSON.parse((storedData)) : [];
}

// DOM PART

const getInput = (inputId) => {
  return document.getElementById(inputId)
}

const getMultiple = (inputId) => {
  return document.querySelectorAll(inputId)
}

const formEvent = (input, newvalue) => {
  input.addEventListener("keydown", (e) => {
      if(e.key === "Enter") {
          newvalue(input.value)
      }
  })
}

const modalEvent = (data, update) => {
  data.addEventListener("keydown", (e) => {
      if(e.key === "Enter") {
          update(data.value)
          modal.style.display = "none"
      }
  })
}

const modalClose = (back, modal) => {
  back.addEventListener("click", () => {
      modal.style.display = "none"
  })
}


// SIDE EFFECTS

const formInput = () => {
    const todoInput = getInput("inputData")
    formEvent(todoInput, (t) => {
        const prevItem = Array.from(localStore("items"))
        prevItem.unshift(t)
        localStore("items", prevItem)
        
        displayData()

        todoInput.value = ""
    })
}

const displayData = () => {
    const lists = getInput("listed")
    let storedData = localStore("items").map((i) => { 
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



const updateValue = (text) => {
  let up = getInput("up")
  modalEvent(up, () => {
    let todoData = localStore("items")
    const index = localStore("items").indexOf(text)
    todoData[index] = up.value
    localStore("items", todoData)
    displayData()
    modalOff()
  })
}

const modalOff = () => {
    const modal = getInput("modal")
    let back = getInput("back")
    modalClose(back, modal)
}

const modalOpen = (modal, content) => {
    modal.innerHTML = ``;
    modal.insertAdjacentHTML('beforeend', content);
    modal.style.display = "flex"
    modalOff()
}

const editHandler = (edit) => {
     const todotText = edit.parentNode.parentNode.querySelector(".popup-input").textContent;
     const modal = getInput("modal")

     const content = `
     <p class="w-full text-xs text-left">This is your editspace</p>
      <div>
         <input id="up" type="text" class="text-sm mt-2 outline-none bg-transparent" value="${todotText}">
     </div>
     <div id="back" class="absolute top-0 right-0 cursor-pointer"><i class="fa-solid fa-arrow-left"></i></div>
  `;

     modalOpen(modal, content)
   
     updateValue(todotText)
     
}


const editTodo = () => {
    const editBtns = getMultiple("#edit");
    Array.from(editBtns).map((edit) => {
        edit.addEventListener("click", () => {
            editHandler(edit);      
        });
    });
};




formInput()
displayData()
removeData()
localStore("items")


