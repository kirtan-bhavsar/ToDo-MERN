import React from 'react'

const AddTodo = ({addTask,addInputRef,setData,data}) => {
  return (
    <>
    <form className="add-todo d-flex my-5" onSubmit={addTask}>
          <input
            ref={addInputRef}
            type="text"
            name="title"
            placeholder="Add a new task..."
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="bg-custom-secondary-color addtask-input rounded-3 p-2 text-custom-secondary-color"
            autoFocus
          />
          <button className="" type="submit">
            Add
          </button>
        </form>
    </>
  )
}

export default AddTodo;