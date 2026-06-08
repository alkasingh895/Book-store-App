import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { bookApi } from './bookManagement.api';
import { formatBookForForm } from './bookManagement.model';
import BookFormModal from './bookManagement.modal';
import BooksTable from './bookManagement.ui';

const initialForm = {
  name: '',
  title: '',
  price: 0,
  category: 'free',
  image: '',
};

function Admin() {

  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [categories, setCategories] =
useState([]);


const [type, setType] =
  useState("");

const [customType, setCustomType] =
  useState("");



const [selectedCategory,
setSelectedCategory] =
useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

const booksPerPage = 5;
  const [loadingList, setLoadingList] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');

  const [editingBook, setEditingBook] = useState(null);

  const [modalLoading, setModalLoading] = useState(false);

  const modalInitialValues = useMemo(() => {

    if (modalMode === 'add') {
      return initialForm;
    }

    return formatBookForForm(editingBook);

  }, [modalMode, editingBook]);

  const refreshBooks = async () => {

    try {

      setLoadingList(true);

      const data = await bookApi.listBooks();

      setBooks(Array.isArray(data) ? data : []);

    } catch (e) {

      console.error(e);

      toast.error('Failed to load books');

    } finally {

      setLoadingList(false);
    }
  };

  useEffect(() => {
    refreshBooks();
  }, []);



useEffect(() => {

  const fetchCategories =
  async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/book/categories"
      );

      const data =
        await res.json();

      setCategories(
        data.categories || []
      );

    } catch (error) {

      console.log(error);
    }
  };

  fetchCategories();

}, []);






const filteredBooks =
books.filter((book) => {

  const name =
    book.name?.toLowerCase() || "";

  const title =
    book.title?.toLowerCase() || "";

  const matchesSearch =

    name.includes(
      searchTerm.toLowerCase()
    )

    ||

    title.includes(
      searchTerm.toLowerCase()
    );

  const matchesCategory =

    selectedCategory === "All"

    ||

    book.category ===
    selectedCategory;

  return (
    matchesSearch &&
    matchesCategory
  );
});


const indexOfLastBook =
  currentPage * booksPerPage;

const indexOfFirstBook =
  indexOfLastBook - booksPerPage;

const currentBooks = filteredBooks.slice(
  indexOfFirstBook,
  indexOfLastBook
);

const totalPages = Math.ceil(
  filteredBooks.length / booksPerPage
);






  const openAddModal = () => {

    setEditingBook(null);

    setModalMode('add');

    setModalOpen(true);
  };

  const openUpdateModal = (book) => {

    setEditingBook(book);

    setModalMode('update');

    setModalOpen(true);
  };

  const handleDelete = async (book) => {

    const id = book?._id || book?.id;

    if (!id) return;

    if (!window.confirm(`Delete book "${book?.name || ''}"?`)) {
      return;
    }

    try {

      setModalLoading(true);

      const token = localStorage.getItem("token");

await bookApi.deleteBook(id, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

      toast.success('Book deleted successfully ✅');

      await refreshBooks();

    } catch (e) {

      console.error(e);

      toast.error(
        e.response?.data?.message || 'Failed to delete book'
      );

    } finally {

      setModalLoading(false);
    }
  };

  const handleModalClose = () => {

    setModalOpen(false);
  };

  const handleModalSubmit = async (payload) => {

    try {

      setModalLoading(true);

      if (modalMode === 'add') {

        await bookApi.addBook(payload);

        toast.success('Book added successfully ✅');

      } else {

        const id = editingBook?._id || editingBook?.id;

        await bookApi.updateBook(id, payload);

        toast.success('Book updated successfully ✅');
      }

      setModalOpen(false);

      await refreshBooks();

    } catch (e) {

      console.error(e);

      toast.error(
        e.response?.data?.message || 'Operation failed'
      );

    } finally {

      setModalLoading(false);
    }
  };

  return (
    <div className='bg-white text-slate-900 dark:bg-slate-950 dark:text-white min-h-screen'>

      <div className='max-w-7xl mx-auto px-4 md:px-10 py-8'>

        <div className='flex items-center justify-between mb-8'>

          <div>

            <h1 className='text-4xl font-bold'>
              📚 Manage Books
            </h1>

            <p className='text-gray-600 dark:text-gray-400 mt-2'>
              Add, update and manage all books
            </p>

          </div>

          
        </div>


<div className="
  flex
  flex-col
  md:flex-row
  gap-4
  mb-8
  items-center
  justify-between
">

  {/* Search Input */}

  <input
    type="text"
    placeholder="🔍 Search books..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
    className="
      w-full
      md:flex-1
      px-4
      py-3
      rounded-xl
      bg-gray-200
      dark:bg-slate-800
      text-black
      dark:text-white
      border
      border-slate-700
      focus:outline-none
      focus:border-pink-500
    "
  />

  {/* Category Filter */}

  <select
    value={selectedCategory}
    onChange={(e) =>
      setSelectedCategory(
        e.target.value
      )
    }
    className="
      w-full
      md:w-60
      px-4
      py-3
      rounded-xl
      bg-gray-200
      dark:bg-slate-800
      text-black
      dark:text-white
      border
      border-slate-700
      focus:outline-none
      focus:border-pink-500
    "
  >

    <option value="All">
      📚 All Categories
    </option>

    {categories.map((category) => (

      <option
        key={category}
        value={category}
      >
        {category}
      </option>

    ))}

  </select>

</div>








        {loadingList ? (

          <div className='text-center py-20 text-slate-500 text-xl'>
            Loading books...
          </div>

        ) : (

  <>

    <BooksTable
      books={currentBooks}
      onDelete={handleDelete}
      onEdit={openUpdateModal}
      onAddClick={openAddModal}
    />

    <div className="flex justify-center items-center gap-4 mt-8">

      <button
        onClick={() =>
          setCurrentPage((prev) => prev - 1)
        }
        disabled={currentPage === 1}
        className="bg-gray-200 dark:bg-slate-800 text-black dark:text-white px-4 py-2 rounded-lg hover:bg-pink-300 dark:hover:bg-slate-700 disabled:opacity-50"
      >
        ← Previous
      </button>

      <span className="text-lg font-semibold text-black dark:text-white">
        Page {currentPage}
      </span>

      <button
        onClick={() =>
          setCurrentPage((prev) => prev + 1)
        }
        disabled={currentPage === totalPages}
        className="bg-gray-200 dark:bg-slate-800 text-black dark:text-white px-4 py-2 rounded-lg hover:bg-pink-300 dark:hover:bg-slate-700 disabled:opacity-50"
      >
        Next →
      </button>

    </div>

  </>

)}
        

      </div>

      <BookFormModal
        open={modalOpen}
        mode={modalMode}
        initialValues={modalInitialValues}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        loading={modalLoading}
      />

    </div>
  );
}

export default Admin;