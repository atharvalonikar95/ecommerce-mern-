import React from 'react'

export const CategoryForm = (props) => {
  return (
    <div>
        <form onSubmit={props.handleSubmit}>
            <div className='mt-2 flex flex-col gap-2 ' >
                <input className='p-2 rounded-sm outline-gray-400' style={{border:"1px solid gainsboro"}} type="text" placeholder='enter new category' value={props.value} onChange={(e)=>props.setValue(e.target.value)} />
                <button className='bg-sky-600 px-4 py-1 rounded-lg text-white w-[20%] '>Add</button>
            </div>
        </form>
    </div>
  )
}
 