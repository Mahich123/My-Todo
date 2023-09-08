class LocallyStored {
    StoreData(key, data) {
        localStorage.setItem(key, JSON.stringify(data))
    }

    getData(key) {
        let storeData = localStorage.getItem(key);
        return storeData ? JSON.parse(storeData) : [];
    }
}

class TodoData {
    constructor() {
        this.input = document.querySelector("#inputData")
        this.input.addEventListener("keydown", this.addTodo.bind(this))
        this.modal = document.querySelector("#modal")
        
    }

    addTodo(e) {
        if(e.key == "Enter") {
            const localData = new LocallyStored()
            const inputData = this.input.value
            const TodoArr = localData.getData("items")
            TodoArr.unshift(inputData)
            localData.StoreData("items", TodoArr)
            location.reload()
        }
    }   



    editTodo(TodoArr) {
            
            this.update = document.querySelectorAll(".edit");

            this.update.forEach((e,i) => {
                // Add event listener to each todo
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
                        this.modal.style.display = "none";
                    });
              
                    let up = document.querySelector("#up");
          
                    up.addEventListener("keydown", (e) => {
                      if (e.key == "Enter") {
                        const index = TodoArr.indexOf(itemText);

                        
                          TodoArr[index] = up.value;
                          const localData = new LocallyStored();
                          localData.StoreData("items", TodoArr);
                          todoUi.loadTodos();
                          this.modal.style.display = "none";
                        
                      }
                    });
                });
            });
        }

    deleteTodo(TodoArr) {
         this.rmv =  document.querySelectorAll("#dust")
           this.rmv.forEach((t,i) => {
            t.addEventListener("click", () => {
              TodoArr.splice(i,1)
                const localData = new LocallyStored();
                localData.StoreData("items", TodoArr);
             
              todoUi.loadTodos()
            
            })
          })
    }


}


class TodoUI {
    constructor() {
        this.lists = document.querySelector("#listed");
        this.loadTodos();
    }

    displayTodo (TodoArr) {
        if(Array.isArray(TodoArr)) {
            let storedItem = TodoArr.map((i) => {
                return(
                    `
                    <div class="p-8  md:mt-0 py-6  border-r-4  shadow-lg border-l-4 border-[#4b8b6d] rounded w-2/3 md:w-1/4 flex  justify-between items-center">
                    <div class="cursor-pointer popup-input break-anywhere ">${i}</div>
                    <div class="flex items-center gap-2">
                    <div id="dust">
                        <i class="fa-solid fa-trash cursor-pointer "></i>
                    </div>
                        <i class="edit fa-solid fa-pen-to-square cursor-pointer"></i>
                    </div>
                    </div>
                    `
                )
            });

            this.lists.innerHTML = storedItem.join('');
            todoData.editTodo(TodoArr);
            todoData.deleteTodo(TodoArr)
        }
    }

    loadTodos() {
        const local = new LocallyStored();    
        const TodoArr = local.getData("items");
        this.displayTodo(TodoArr);
    }        
}



const LocallyStore = new LocallyStored()
const todoData = new TodoData()
const todoUi = new TodoUI()

todoUi.loadTodos()

