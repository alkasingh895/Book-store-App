import React from 'react';

function BooksTable({ books, onDelete, onEdit, onAddClick }) {
  return (
    <div className='mt-10'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4'>
        <h2 className='text-2xl font-bold'>📦 Manage Books</h2>
        <button className='btn btn-primary bg-blue-500 hover:bg-blue-600 border-none px-5 py-3' type='button' onClick={onAddClick}>
          ➕ Add new
        </button>
      </div>

      <div className='hidden md:block overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700'>
        <table className='min-w-full w-full text-sm'>
          <thead className='bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200'>
            <tr>
              <th className='px-4 py-3 text-left'>Book</th>
              <th className='px-4 py-3 text-left'>Title/Desc</th>
              <th className='px-4 py-3 text-left'>Price</th>
              <th className='px-4 py-3 text-left'>Category</th>
              <th className='px-4 py-3 text-left'>Rating</th>
              <th className='px-4 py-3 text-left'>Image</th>
              <th className='px-4 py-3 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-200 dark:divide-slate-700'>
            {books?.length ? (
              books.map((b) => {
                const rating = b.rating || 0;
                return (
                  <tr key={b._id || b.id} className='align-top'>
                    <td className='px-4 py-3 font-semibold'>{b.name}</td>
                    <td className='px-4 py-3 max-w-[300px]'>
                      <div className='line-clamp-3'>{b.title}</div>
                    </td>
                    <td className='px-4 py-3 font-semibold text-pink-500'>₹ {b.price}</td>
                    <td className='px-4 py-3'>{b.category}</td>
                    <td className='px-4 py-3'>
                      <div className='flex items-center gap-2'>
                        <div className='text-yellow-400 text-lg flex'>
                          {[...Array(5)].map((_, index) => {
                            if (rating >= index + 1) return <span key={index}>★</span>;
                            if (rating >= index + 0.5) return <span key={index}>⯨</span>;
                            return <span key={index}>☆</span>;
                          })}
                        </div>
                        <span className='font-semibold'>{rating}</span>
                      </div>
                    </td>
                    <td className='px-4 py-3'>
                      {b.image ? <img src={b.image} alt='book' className='h-14 w-14 rounded object-cover' /> : '—'}
                    </td>
                    <td className='px-4 py-3 whitespace-nowrap'>
                      <div className='flex flex-wrap gap-2'>
                        <button
                          type='button'
                          className='btn btn-sm bg-green-500 hover:bg-green-600 border-none text-white'
                          onClick={() => onEdit(b)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          type='button'
                          className='btn btn-sm bg-red-500 hover:bg-red-600 border-none text-white'
                          onClick={() => onDelete(b)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className='px-4 py-8 text-center text-slate-500'>No books found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className='grid gap-4 md:hidden'>
        {books?.length ? (
          books.map((b) => {
            const rating = b.rating || 0;
            return (
              <div key={b._id || b.id} className='rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900'>
                <div className='flex flex-col gap-3'>
                  <div className='flex items-start justify-between gap-3'>
                    <div>
                      <p className='text-lg font-semibold'>{b.name}</p>
                      <p className='text-sm text-slate-500 dark:text-slate-400 line-clamp-2'>{b.title}</p>
                    </div>
                    {b.image && <img src={b.image} alt='book' className='h-16 w-16 rounded object-cover' />}
                  </div>

                  <div className='grid gap-2 text-sm text-slate-600 dark:text-slate-300'>
                    <div className='flex items-center justify-between gap-2'>
                      <span className='font-semibold'>Price</span>
                      <span className='text-pink-500'>₹ {b.price}</span>
                    </div>
                    <div className='flex items-center justify-between gap-2'>
                      <span className='font-semibold'>Category</span>
                      <span>{b.category}</span>
                    </div>
                    <div className='flex items-center justify-between gap-2'>
                      <span className='font-semibold'>Rating</span>
                      <span className='flex items-center gap-1 text-yellow-400'>
                        {[...Array(5)].map((_, index) => {
                          if (rating >= index + 1) return <span key={index}>★</span>;
                          if (rating >= index + 0.5) return <span key={index}>⯨</span>;
                          return <span key={index}>☆</span>;
                        })}
                        <span className='text-white text-xs rounded-full bg-slate-700 px-2 py-0.5 dark:bg-slate-600'>{rating}</span>
                      </span>
                    </div>
                  </div>

                  <div className='flex flex-wrap gap-2'>
                    <button
                      type='button'
                      className='flex-1 rounded-xl bg-green-500 px-4 py-3 text-sm font-semibold text-white hover:bg-green-600'
                      onClick={() => onEdit(b)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      type='button'
                      className='flex-1 rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white hover:bg-red-600'
                      onClick={() => onDelete(b)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className='rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400'>No books found.</div>
        )}
      </div>
    </div>
  );
}

export default BooksTable;

