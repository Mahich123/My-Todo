const TodoArr = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []
// console.log(TodoArr)
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
          // Side effect here updating global variable
         TodoArr.unshift(todoInput.value) 
         localStorage.setItem("items", JSON.stringify(TodoArr))
        //  localStorage.clear()
          location.reload()
          e.preventDefault()
        }
      })
}


const displayData = () => {
    const lists = getInput("listed")
    let storedItem = TodoArr.map((i) => {
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
    lists.innerHTML = storedItem.join('')
}
const removeData = () => {
    const remove = getMultiple("#dust")
    console.log(remove)

    remove.forEach((t,i) => {
        t.addEventListener("click", () => {
            TodoArr.splice(i,1)
            localStorage.setItem("items", JSON.stringify(TodoArr))
            location.reload()
          })
    });
}

const enterEvent = (itemText) => {
    let up =  getInput("up")
    up.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {

          const index = TodoArr.indexOf(itemText);
          // Side effect here updating global varibale
            TodoArr[index] = up.value;

            localStorage.setItem("items", JSON.stringify(TodoArr));
            location.reload()
        }
      });
}

const clickEvent = () => {
    let back = getInput("back")
    back.addEventListener("click", () => {
        modal.style.display = "none";
      });
}


const editTodo = () => {
    const update = getMultiple("#edit")

    update.forEach((e,i) => {
        e.addEventListener("click", () => {
            let itemText = e.parentNode.parentNode.querySelector(".popup-input").textContent;
      
            modal.innerHTML = '';
      
            const content = `
              <p class="w-full text-xs text-left">This is your editspace</p>
              <div>
              <input id="up" type="text" class="text-sm mt-2 outline-none bg-transparent" value="${itemText}">
              </div>
              <div id="back" class="absolute top-0 right-0 cursor-pointer"><i class="fa-solid fa-arrow-left"></i></div>
            `;
            modal.insertAdjacentHTML('beforeend', content);
      
            modal.style.display = "flex";
      
           clickEvent()
          enterEvent(itemText)
          });
    })
}

formInput()
displayData()
removeData()
editTodo()