import React from 'react'

function Card({item}) {
  return (
    <>
    <div className='mt-4 my-3 p-2'>
        <div className="Card bg-base-100 shadow-sm w-full h-full flex flex-col  hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border ">
        
  <figure>
    <img
      src={item.image}
      alt="" />
  </figure>
  <div className="Card-body pb-4 flex flex-col justify-between flex-grow ">
    <h2 className="Card-title font-bold text-sm mb-1 flex items-center gap-2 px-2">
     <span> {item.name} </span>
      <div className="badge badge-secondary">{item.category}</div>
    </h2>
    <p  className='text-sm mb-1 px-2'>{item.title}</p>
    <div className="Card-actions justify-between flex px-2">
      <div className="badge badge-outline">${item.price}</div>
      <div className="cursor-pointer px-2 py-1 rounded-full border-[1px] hover:bg-pink-500  hover:text-white duration-300">Buy Now</div>
    </div>
  </div>
</div>
</div>
</>
    
  );
}

export default Card


