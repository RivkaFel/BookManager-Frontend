import React, { useEffect, useState } from 'react';
import { deleteBook, getAllBooks } from '../Services/books';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button } from '@mui/material';
import AddBookForm from './AddBookForm'; // ייבוא הקומפוננטה של טופס הוספת ספר
import "../style/bookList.css";

const BooksList = () => {
  const [books, setBooks] = useState([]); // רשימת הספרים
  const [errorMessage, setErrorMessage] = useState(''); // הודעת שגיאה
  const [filteredbyUPC, setFilteredbyUPC] = useState([]); // סינון לפי קטגוריות
  const [showAddBookForm, setShowAddBookForm] = useState(false); // שליטה בהצגת הטופס להוספת ספר

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allBooks = await getAllBooks();
        
        // מיון הספרים לפי UPC בסדר עולה
        const sortedBooks = allBooks.sort((a, b) => a.upc - b.upc);
        
        setBooks(sortedBooks);
        setFilteredbyUPC(sortedBooks); // הגדרת הספרים המסוננים לתחילה כל הספרים
        setErrorMessage(''); // איפוס הודעת השגיאה
      } catch (error) {
        setErrorMessage('Error occurred while fetching the books');
        console.log("Error occurred while fetching the books:", error);
      }
    };
    fetchData();
  }, []);
  

  // פונקציה שמוסיפה ספר חדש לרשימה
  const handleAddBook = (newBook) => {
    setBooks([...books, newBook]); // הוספת הספר החדש לרשימת הספרים
    setFilteredbyUPC([...filteredbyUPC, newBook]); // עדכון הרשימה המסוננת עם הספר החדש
    setShowAddBookForm(false); // סגירת הטופס לאחר ההוספה
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await deleteBook(bookId);
      setBooks(books.filter(book => book.upc!== bookId));
      //setFilteredbyUPC(...filteredbyUPC); // עדכון הרשימה המסוננת עם הספר החדש
      console.log(bookId);  

    } catch (error) {
      alert("eror: " + error.message);
    }
   
  };
  
 /*
  const BookList = ({ books, setBooks }) => {
    const handleDeleteBook = (bookId) => {
      setBooks(books.filter(book => book.id !== bookId));
    };
  
   return (
      <div>
        {books.map(book => (
          <div key={book.id}>
            <p>{book.title} by {book.author}</p>
            <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
          </div>
        ))}
      </div>
    );
  };*/

  return (
    <>
      <h1>Books Manager: </h1>

      {/* כפתור להצגת/הסתרת טופס הוספת ספר */}
      <Button onClick={() => setShowAddBookForm(!showAddBookForm)}>
        {showAddBookForm ? "Cancel" : "Add new book"}
      </Button>

      {/* הצגת טופס הוספת ספר במידה והמשתמש לחץ על הכפתור */}
      {showAddBookForm && <AddBookForm onAddBook={handleAddBook} books={books}/>}

      <Container className="container">
        {/* רנדור הספרים רק במצב שטעינת הספרים הצליחה, אחרת נציג את הודעת השגיאה */}
        {errorMessage === '' ? (
          filteredbyUPC.length > 0 ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="books table">
                <TableHead>
                  <TableRow>
                    <TableCell>UPC</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell>Cover</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredbyUPC.map((book) => (
                    <TableRow key={book?.upc}>
                      <TableCell>{book?.upc}</TableCell>
                      <TableCell component="th" scope="row">
                          {book?.name}
                      </TableCell>
                      <TableCell>{book?.author}</TableCell>
                      <TableCell>
                        <img
                          src={book?.img}
                          alt="Book Cover"
                          className="book-img"
                          style={{ width: "50px", height: "75px" }}
                        />
                      </TableCell>
                      <TableCell>{book?.price}</TableCell>
                      <TableCell>
                        <Button>Edit</Button>
                        <Button onClick={handleDeleteBook}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box>
              <Typography variant="h4" component="h4" style={{ paddingTop: "100px", paddingLeft: "500px" }}>
                לא נמצאו תוצאות
              </Typography>
            </Box>
          )
        ) : (
          <Box>
            <Typography variant="h4" component="h4">
              {errorMessage}
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
};

export default BooksList;
