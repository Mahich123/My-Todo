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
        this.todoArray = []
    }

    // create
    addTodo(todo) {
        this.todoArray.unshift(todo)
    }  

    // read
    read() {
        return this.todoArray
    }

    
    // update
    edit(oldValue, newValue) {
           const todoIndex = this.todoArray.indexOf(oldValue)
           if(todoIndex !== -1) {
                this.todoArray[todoIndex] = newValue    
           }
    }

    // delete
    deleteTodo(todo) {
        const todoIndex = this.todoArray.indexOf(todo)
        if(todoIndex !== -1) {
           this.todoArray.splice(todoIndex,1)
        }
    }

    // list
    list() {
        this.read()
    }
    
}





class TodoUI {
    constructor() {
        this.input = document.querySelector("#inputData")
        this.modal = document.querySelector("#modal")   
        this.lists = document.querySelector("#listed")
        this.localdata = new LocallyStored();
        this.todoData = new TodoData();
        this.todoData.todoArray = this.localdata.getData("items") || [];
        this.input.addEventListener("keydown", (e) => {
            this.AddingTodo(e)
        })
        this.oldValue = ""
        this.DisplayTodo();
    }

  

    AddingTodo(e) {
        if(e.key === "Enter") {
          const input = this.Input() 
          this.todoData.addTodo(input)
          const data = this.todoData.todoArray
          this.localdata.StoreData("items", data)
          this.clearInput()
          this.DisplayTodo()
        }
    }
    
     createTodoElement(todoText) {
        const todoElement = document.createElement("div")
        todoElement.className = "p-8  md:mt-0 py-6  border-r-4  shadow-lg border-l-4 border-[#4b8b6d] rounded w-2/3 md:w-1/4 flex  justify-between items-center"

        const popupDiv = document.createElement("div")
        popupDiv.className = "cursor-pointer popup-input break-anywhere"
        popupDiv.textContent = todoText
        todoElement.appendChild(popupDiv)

        const actionDiv = document.createElement("div")
        actionDiv.className = "flex items-center gap-2"

        const dustDiv = document.createElement("div")
        dustDiv.id = "dust"
        const trashIcon = document.createElement("i")
        trashIcon.className = "fa-solid fa-trash cursor-pointer"
        dustDiv.appendChild(trashIcon)
        actionDiv.appendChild(dustDiv)

        const editIcon = document.createElement("i")
        editIcon.className = "edit fa-solid fa-pen-to-square cursor-pointer"
        actionDiv.appendChild(editIcon)

        todoElement.appendChild(actionDiv)

        return todoElement
    }

    DisplayTodo() {
        let lists = this.lists

        if (Array.isArray(this.todoData.todoArray)) {
            while (lists.firstChild) {
                lists.removeChild(lists.firstChild)
            }

            this.todoData.todoArray.forEach((i) => {
                const todoElement = this.createTodoElement(i)
                lists.appendChild(todoElement)
            })

            this.EditListener()

            this.deleteTodo().forEach((d, i) => {
                d.addEventListener("click", () => {
                    this.DeleteTodo(i)
                })
            })
        }
    }

    EditTodo(i, todoArray) {
    //   console.log("todoArray:", todoArray)
        let itemText = this.todoData.todoArray[i]
        // console.log("itemText:", itemText)
        const content = `
             <p class="w-full text-xs text-left">This is your editspace</p>
                <div>
                    <input id="up" type="text" class="text-sm mt-2 outline-none bg-transparent" value="${itemText}">
                </div>
            <div id="back" class="absolute top-0 right-0 cursor-pointer"><i class="fa-solid fa-arrow-left"></i></div>            
        `

        this.SetModal(content)
        this.displayModal()

        this.back()

        let up = this.Editinput()
        up.addEventListener("keydown", (e) => {
            if(e.key === "Enter") {
                const editValue = this.EditText()
                // console.log("ediValue:",editValue)
                this.todoData.edit(itemText, editValue)
                this.CloseModal()
                this.DisplayTodo()
            }
        })

        
             
    }

    DeleteTodo(index) {
        this.todoData.deleteTodo(this.todoData.todoArray[index]);
        const data = this.todoData.todoArray;
        this.clearInput();
        this.DisplayTodo();
        this.localdata.StoreData("items", data);
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
            this.EditTodo(index, this.todoData.todoArray);
               
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
        while (this.modal.firstChild) {
            this.modal.removeChild(this.modal.firstChild)
        }
        this.modal.appendChild(document.createTextNode(todoText))
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


const todoUi = new TodoUI()

