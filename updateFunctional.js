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

const formValue = (input) => {
  return input.value
}



const formEvent = (input, callback) => {
  input.addEventListener("keydown", (e) => {
      if(e.key === "Enter") {
          callback()
      }
  })
}


const formSubmit = () => {
  const input = getInput("inputData")
  formEvent(input, () => {
    const prevItem = Array.from(localStore('items'))
    const newItem = formValue(input)
    prevItem.unshift(newItem)
    localStore("items", prevItem )
    input.value = ""
    updateData()
  })
}
 
const displayContent = () => {
  // const lists = getInput("listed")
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

  return storedData.join('')
}


const displayData = () => {
  const lists = getInput("listed")
  const storedTodo = displayContent()
  lists.innerHTML = storedTodo 
  removeData()
  editTodo()
}


const remove = (i) => {
  const prevData = localStore("items")
  prevData.splice(i,1)
  localStore("items", prevData)
  updateData()
}

const removeData = () => {
  const dustbtn = getMultiple("#dust")
  Array.from(dustbtn).map((e,i) => {
      e.addEventListener("click", () => {
          remove(i)
      })
  })
}

const updateData = () => {
  const localData = localStore("items")
  displayData(localData)
}

const modalData = (index,newval) => {
  let todoData = localStore("items")
  todoData[index] = newval
  localStore("items", todoData)
  return todoData
}

const enterEvent = (text) => {
  let up = getInput("up")
  up.addEventListener("keydown", (e) => {
      if(e.key === "Enter") {
          const index = localStore("items").indexOf(text)
          const updateTodo = modalData(index, up.value)   
          localStore("items", updateTodo)
          modalClose(getInput("modal")) // Close the modal
          updateData()
      }
  })
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


displayData();
formSubmit();
removeData();
editTodo();
localStore("items");    



