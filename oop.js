const TodoArr = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []
// console.log(TodoArr)

class TodoInput {
    constructor() {
        this.input = document.querySelector("#inputData")
        this.input.addEventListener("keydown", this.addTodo.bind(this))
    }
    addTodo(e) {
        if(e.key == "Enter") {
            TodoArr.unshift(this.input.value)
            localStorage.setItem("items", JSON.stringify(TodoArr))
            location.reload()
        }
    }    
}

class DsplayTodo {
    constructor() {
        this.lists = document.querySelector("#listed")
    }
    display() {
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

          this.lists.innerHTML = storedItem.join('')
    }
}

class DeleteTodo {
    constructor() {
        this.displayTodo = new DsplayTodo()
        this.lists = this.displayTodo.lists
        this.rmv =  document.querySelectorAll("#dust")
    }

    remove() {
        this.rmv.forEach((t,i) => {
            t.addEventListener("click", () => {
              TodoArr.splice(i,1)
              localStorage.setItem("items", JSON.stringify(TodoArr))
              this.displayTodo.display()
              location.reload()
            })
          })
    }
}

class EditTodo {
    constructor() {
        this.displayTodo = new DsplayTodo()
        this.lists = this.displayTodo.lists
        this.update = document.querySelectorAll("#edit")
        this.modal = document.querySelector("#modal")
    }

    change() {
        this.update.forEach((e,i) => {
            e.addEventListener("click", () => {
                let itemText = e.parentNode.parentNode.querySelector(".popup-input").textContent;
          
                this.modal.innerHTML = '';
          
                const content = `
                  <p class="w-full text-xs text-left">This is your editspace</p>
                  <div>
                  <input id="up" type="text" class="text-sm mt-2 outline-none bg-transparent" value="${itemText}">
                  </div>
                  <div id="back" class="absolute top-0 right-0 cursor-pointer"><i class="fa-solid fa-arrow-left"></i></div>
                `;
                this.modal.insertAdjacentHTML('beforeend', content);
          
                this.modal.style.display = "flex";
          
                let back = document.querySelector("#back");
          
                back.addEventListener("click", () => {
                  modal.style.display = "none";
                });
          
                let up = document.querySelector("#up");
                // console.log(up)
          
                up.addEventListener("keydown", (e) => {
                  if (e.key == "Enter") {
                    // Find the index of the item in TodoArr
                    const index = TodoArr.indexOf(itemText);
                    
                      // Update the value in TodoArr
                      TodoArr[index] = up.value;
                      // Update local storage
                      localStorage.setItem("items", JSON.stringify(TodoArr));
                      this.displayTodo.display()
                      location.reload()
                    
                  }
                });
              });
        })
    }
}

new TodoInput()

const displayList = new DsplayTodo()

displayList.display()

const deleteList = new DeleteTodo()
deleteList.remove()

const editList = new EditTodo()
editList.change()