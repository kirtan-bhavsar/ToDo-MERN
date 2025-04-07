import React from 'react'

const App = () => {
  return (
    <>
    <div className='container-fluid bg-dark justify-content-center align-items-center d-flex flex-column'>
    <h1 className='text-custom-heading-color fw-bold'>My Todos</h1>
    <input type="text" for='title' name='title' placeholder='Add a new task...'className='bg-custom-secondary-color rounded-3 p-2 text-custom-secondary-color my-5'/>
    {/* <h1 className='text-custom-primary-color'>heading</h1> */}
    </div>
    </>
  )
}

export default App