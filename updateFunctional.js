
// LOCAL STORAGE

const localStore = (key, data) => {
  if(data !== undefined) {
      localStorage.setItem(key, JSON.stringify(data))
  }
  let storedData = localStorage.getItem(key)
  return storedData ? JSON.parse(storedData) : []
}

const getMultiple = (inputId) => {
    return document.querySelectorAll(inputId)
  }
  
  const getInput = (inputId) => {
    return document.getElementById(inputId)
  }

// CREATE 
const create = (items, newItem) => {
    const updateTodo = [...items, newItem]
    return updateTodo
}

// READ
const read = () => {
    return localStore("items")
}

// UPDATE
const update = (items, index, newVal) => {
    const todo = [...items]
    todo[index] = newVal 
    return todo
}

// DELETE
const remove = (items, i) => {
    const todos = [...items]
    todos.splice(i,1)
    return todos
}

// LIST
const list = () => {
    let storedData = read().map((i) => { return i});
    return storedData
}


// side effects

// const displayContent = () => {
  
//     return(
//             `
//         <div class="p-8  md:mt-0 py-6  border-r-4  shadow-lg border-l-4 border-[#4b8b6d] rounded w-2/3 md:w-1/4 flex  justify-between items-center">
//         <div class="cursor-pointer popup-input break-anywhere ">${i}</div>
//         <div class="flex items-center gap-2">
//         <div id="dust">
//             <i class="fa-solid fa-trash cursor-pointer "></i>
//         </div>
//             <i id="edit" class="fa-solid fa-pen-to-square cursor-pointer"></i>
//         </div>
//         </div>
//             `
//     )
    
// }

const displayContent = () => {
    return list().map(i => {
        return `
        <div class="p-8  md:mt-0 py-6  border-r-4  shadow-lg border-l-4 border-[#4b8b6d] rounded w-2/3 md:w-1/4 flex  justify-between items-center">
        <div class="cursor-pointer popup-input break-anywhere ">${i}</div>
        <div class="flex items-center gap-2">
        <div id="dust">
            <i class="fa-solid fa-trash cursor-pointer "></i>
        </div>
            <i id="edit" class="fa-solid fa-pen-to-square cursor-pointer"></i>
        </div>
        </div>
        `;
    }).join("");
}

const displayData = () => {
    const lists = getInput("listed")
    const storedTodo = displayContent()
    lists.innerHTML = storedTodo
    removeData()
    editTodo()
}

const enterEvent = (text) => {
    let up = getInput("up")
    up.addEventListener("keydown", (e) => {
      if(e.key === "Enter") {
        const data = read() 
        const index = data.indexOf(text)
        const newTodo = up.value
        const updtedData = update(data,index,newTodo)
        localStore("items", updtedData)
        modalClose(getInput("modal"))
        updateData()
      }
    })
}

const updateData = () => {
    const localData = read()
    displayData(localData)
  }
  
  const modalData = (index,newval) => {
    let todoData = read()
    todoData[index] = newval
    localStore("items", todoData)
    return todoData
  }


  const clickEvent = () => {
    const modal = getInput('modal')
    let back = getInput("back")
    back.addEventListener("click" , () => {
        modalClose(modal)
    })
  }

  
  const modalContent = (text) => {
    return `
        <p class="w-full text-xs text-left">This is your editspace</p>
            <div>
            <input id="up" type="text" class="text-sm mt-2 outline-none bg-transparent" value="${text}">
            </div>
            <div id="back" class="absolute top-0 right-0 cursor-pointer"><i class="fa-solid fa-arrow-left"></i></div>
    `;
  }
  

  const modalOpen = (modal, content) => {
    modal.innerHTML = content
    modal.style.display = "flex"
    clickEvent()
}


const modalClose = (modal) => {
  if (modal) {
      modal.style.display = "none";
  }
}
  const editTodo = () => {
   const modal = getInput("modal")
   const edit = getMultiple("#edit")
    Array.from(edit).map((e) => {
        e.addEventListener("click", () => {
            let todotText = e.parentNode.parentNode.querySelector(".popup-input").textContent;
            const modalText = modalContent(todotText)
            modalOpen(modal,modalText)
            enterEvent(todotText)
        })
    })
  }

const removeData = () => {
    const dustbtn = getMultiple("#dust")
    Array.from(dustbtn).map((e,i) => {
        e.addEventListener("click", () => {
           const updatedTodos = remove(localStore("items"), i)
            localStore("items", updatedTodos)
            updateData()
        })
    })
  }

const formValue = (input) => {
    return input.value
  }
  
  const formSubmit = () => {
      const input = getInput("inputData")
      
      formEvent(input, () => {
        const newItem = formValue(input)
        const updateTodo = create(read(), newItem)
        updateTodo.unshift(newItem)
        localStore("items", updateTodo)
        input.value = ""
        updateData()
  })
    }

    const formEvent = (input, callback) => {
    input.addEventListener("keydown", (e) => {
        if(e.key === "Enter") {
            callback()
        }
    })
  }

displayData();
formSubmit();
removeData();
editTodo();
localStore("items");    