class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
    this._completed = data.completed || false;
  }

  _setEventListener() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._completed = !this._completed;
      this._handleCheck(this._completed);
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      this._todoElement = null;
      this._handleDelete(this._completed);
    });
  }

  _generateDueDate() {
    this._dueDate = new Date(this._data.date);
    if (!isNaN(this._dueDate)) {
      this._todoDate.textContent = `Due: ${this._dueDate.toLocaleString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )}`;
    }
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _getTodoElements() {
    return {
      nameEl: this._todoElement.querySelector(".todo__name"),
      dateEl: this._todoElement.querySelector(".todo__date"),
      deleteBtn: this._todoElement.querySelector(".todo__delete-btn"),
    };
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const { nameEl, dateEl, deleteBtn } = this._getTodoElements();
    this._todoNameEl = nameEl;
    this._todoDate = dateEl;
    this._todoDeleteBtn = deleteBtn;

    this._todoNameEl.textContent = this._data.name;
    this._generateDueDate();
    this._generateCheckboxEl();
    this._setEventListener();

    return this._todoElement;
  }
}

export default Todo;
