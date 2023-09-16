class LocallyStored {
    StoreData(key, data) {
        localStorage.setItem(key, JSON.stringify(data))
    }

    getData(key) {
        let storeData = localStorage.getItem(key);
        return storeData ? JSON.parse(storeData) : [];
    }
}


class DomElements {
    constructor() {
        this.input = document.querySelector("#inputData")
        this.modal = document.querySelector("#modal")
        this.todoData = new TodoData()
        this.input.addEventListener("keydown", (e) => {
            todoUi.AddingTodo(e)
        })
        this.oldValue = ""
        
    }

    Input() {
     return this.input.value 
    }
    EditTodo(){
        return document.querySelectorAll(".edit");
    }

    EditListener() {
        const pens = this.EditTodo();

        pens.forEach((pen, index) => {
            pen.addEventListener("click", () => {
            const todoArr = this.todoData.todoArray
            this.oldValue = todoArr[index]
            todoUi.EditTodo(index, todoArr)
               
            });
        });
    }

    displayModal() {
        
        this.modal.style.display = "flex";
         
    }

    Editinput() {
        return document.querySelector("#up")
    }

    SetModal(todoText) {
        this.modal.innerHTML = todoText;
    }

    CloseModal() {
        this.modal.style.display = "none";
    }
    popup(elem) {
        return elem.parentNode.parentNode.querySelector(".popup-input").textContent;
    }

    deleteTodo() {
        return  document.querySelectorAll("#dust")
    }

    todoLists() {
        return  document.querySelector("#listed");
    }
    clearInput() {
        return this.input.value = ""
    }
    back() {
        let back = document.querySelector("#back")
        back.addEventListener("click", () => {
            return this.CloseModal()
        })
    }

    EditText() {
        return this.Editinput().value
    }

    
}



class TodoData {
    constructor() {
        // this.todoData = new DomElements()
        this.localdata = new LocallyStored()
        this.todoArray = []
    }

    addTodo(todo) {
        this.todoArray.unshift(todo)
    }  
    



    editTodo(oldValue, newValue) {
           const todoIndex = this.todoArray.indexOf(oldValue)
           if(todoIndex !== -1) {
                this.todoArray[todoIndex] = newValue    
           }
       }

    deleteTodo(todo) {
        const todoIndex = this.todoArray.indexOf(todo)
        if(todoIndex !== -1) {
           this.todoArray.splice(todoIndex,1)
        }
    }

    
}





class TodoUI {
    constructor() {
        this.inputDom = new DomElements();
        this.localdata = new LocallyStored();
        this.todoData = new TodoData();
        this.todoData.todoArray = this.localdata.getData("items") || [];
        this.DisplayTodo();
    }

  

    AddingTodo(e) {
        if(e.key === "Enter") {
          const input = this.inputDom.Input() 
          this.todoData.addTodo(input)
          const data = this.todoData.todoArray
          this.localdata.StoreData("items", data)
          this.inputDom.clearInput()
          this.DisplayTodo()
        }
    }

    DisplayTodo() {
         let lists = this.inputDom.todoLists()

         if(Array.isArray(this.todoData.todoArray)) {
            let storedItem = this.todoData.todoArray.map((i) => {
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

            lists.innerHTML = storedItem.join('');
           
            this.inputDom.EditListener();

            this.inputDom.deleteTodo().forEach((d,i) => {
                d.addEventListener("click", () => {
                    this.DeleteTodo(i)
                })
            }) 
        }
    }

    EditTodo(i, todoArray) {
      console.log("todoArray:", todoArray)
        let itemText = todoArray[i]
        console.log("itemText:", itemText)
        const content = `
             <p class="w-full text-xs text-left">This is your editspace</p>
                <div>
                    <input id="up" type="text" class="text-sm mt-2 outline-none bg-transparent" value="${itemText}">
                </div>
            <div id="back" class="absolute top-0 right-0 cursor-pointer"><i class="fa-solid fa-arrow-left"></i></div>            
        `

        this.inputDom.SetModal(content)
        this.inputDom.displayModal()

        this.inputDom.back()

        let up = this.inputDom.Editinput()
        up.addEventListener("keydown", (e) => {
            if(e.key === "Enter") {
                const editValue = this.inputDom.EditText()
                console.log("ediValue:",editValue)
                this.todoData.editTodo(itemText, editValue)
                this.inputDom.CloseModal()
                this.DisplayTodo()
            }
        })

        
             
    }

    DeleteTodo(index) {
        this.todoData.deleteTodo(this.todoData.todoArray[index]);
        const data = this.todoData.todoArray;
        this.inputDom.clearInput();
        this.DisplayTodo();
        this.localdata.StoreData("items", data);
    }


 
}


const todoUi = new TodoUI()

