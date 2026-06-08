import React, { useEffect, useState } from 'react';

function BookFormModal({ open, mode, initialValues, onClose, onSubmit, loading }) {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    price: 0,
    category: 'free',
    type: "",
    image: '',
     
  });

  useEffect(() => {
    if (!open) return;
    setFormData({
      name: initialValues?.name || '',
      title: initialValues?.title || '',
      price: typeof initialValues?.price === 'number' ? initialValues.price : Number(initialValues?.price || 0),
      category: initialValues?.category || 'free',
      type: initialValues?.type || '',
      image: initialValues?.image || '',
     


    });
  }, [open, initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:

name === 'price'


? Number(value)

: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'>
      <div className='w-full max-w-2xl max-h-[90vh] overflow-auto bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg shadow-xl'>
        <div className='flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700'>
          <h2 className='text-xl font-bold'>
            {mode === 'add' ? '➕ Add Book' : '✏️ Update Book'}
          </h2>
          <button
            className='btn btn-ghost'
            type='button'
            onClick={onClose}
            disabled={loading}
          >
            ✖
          </button>
        </div>

        <form onSubmit={handleSubmit} className='px-6 py-5'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-semibold mb-2'>📖 Book Name *</label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
                placeholder='e.g., React for Beginners'
                className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div>
              <label className='block text-sm font-semibold mb-2'>💰 Price *</label>
              <input
                type='number'
                name='price'
                value={formData.price}
                onChange={handleChange}
                required
                min='0'
                step='0.01'
                placeholder='0'
                className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>



        







            <div className='md:col-span-2'>
              <label className='block text-sm font-semibold mb-2'>📝 Description *</label>
              <textarea
                name='title'
                value={formData.title}
                onChange={handleChange}
                required
                placeholder='e.g., Learn React hooks and modern patterns'
                rows='4'
                className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div>
              <label className='block text-sm font-semibold mb-2'>📂 Category *</label>



              <select
                name='category'
                value={formData.category}
                onChange={handleChange}
                required
                className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option value='free'>Free</option>
                <option value='paid'>Paid</option>
              </select>
            </div>



<div>
  <label className='block text-sm font-semibold mb-2'>
    📚 Book Type
  </label>

  <select
    value=""
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        type: e.target.value,
      }))
    }
    className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 outline-none focus:ring-2 focus:ring-blue-500 mb-2'
  >
    <option value="">
      Select Book Type
    </option>

    <option value="Programming">
      Programming
    </option>

    <option value="Mathematics">
      Mathematics
    </option>

    <option value="Artificial Intelligence">
      Artificial Intelligence
    </option>

    <option value="Web Development">
      Web Development
    </option>

    <option value="UI/UX">
      UI/UX
    </option>

    <option value="Database">
      Database
    </option>

    <option value="Data Science">
      Data Science
    </option>

    <option value="Cyber Security">
      Cyber Security
    </option>
  </select>

  <input
    type='text'
    name='type'
    value={formData.type}
    onChange={handleChange}
    placeholder='Or enter custom type'
    className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 outline-none focus:ring-2 focus:ring-blue-500'
  />
</div>

            <div>
              <label className='block text-sm font-semibold mb-2'>🖼️ Image URL *</label>
              <input
                type='url'
                name='image'
                value={formData.image}
                onChange={handleChange}
                required
                placeholder='https://example.com/image.jpg'
                className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 outline-none focus:ring-2 focus:ring-blue-500'
              />
              {formData.image ? (
                <img src={formData.image} alt='preview' className='mt-3 h-20  rounded-md object-cover' />
              ) : null}
            </div>
          </div>

          <div className='flex gap-4 mt-6'>
            <button
              type='submit'
              disabled={loading}
              className='flex-1 bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 duration-300 disabled:bg-gray-400'
            >
              {loading ? (mode === 'add' ? 'Adding...' : 'Updating...') : mode === 'add' ? '✅ Add Book' : '💾 Update Book'}
            </button>
            <button
              type='button'
              onClick={onClose}
              disabled={loading}
              className='flex-1 bg-gray-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-600 duration-300'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookFormModal;

