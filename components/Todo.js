class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._completed = data.completed;
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._handleDelete(this._completed);
    });
    this._todoCheckboxEl.addEventListener("change", () => {
      this._toggleCompletion();
      this._handleCheck(this._completed);
    });
  }

  _setDeleteButtonListener() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
    });
  }

  _dueDate() {
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

  _toggleCompletion() {
    this._completed = !this._completed;
  }

  _handleDelete() {
    this._todoElement.remove();
    this._todoElement = null;
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    this._todoNameEl.textContent = this._data.name;

    this._generateCheckboxEl();
    this._setEventListeners();
    this._setDeleteButtonListener();
    this._dueDate();
    return this._todoElement;
  }
}

export default Todo;
