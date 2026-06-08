// simple helpers to keep API/state logic out of the Admin component

export const formatBookForForm = (book = {}) => ({
  id: book._id || book.id || "",
  name: book.name || "",
  title: book.title || "",
  price: typeof book.price === "number" ? book.price : Number(book.price || 0),
  category: book.category || "free",
  image: book.image || "",
});

