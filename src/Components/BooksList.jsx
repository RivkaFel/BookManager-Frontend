import React, { useEffect, useState } from 'react';
import { getAllBooks } from '../Services/books';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import "../style/bookList.css";

const BooksList = () => {
  const [books, setBooks] = useState([]); // רשימת הספרים
  const [errorMessage, setErrorMessage] = useState(''); // הודעת שגיאה
  const [filteredbyCategories, setFilteredbyCategories] = useState([]); // סינון לפי קטגוריות

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allBooks = await getAllBooks();
        setBooks(allBooks);
        setFilteredbyCategories(allBooks); // הגדרת הספרים המסוננים לתחילה כל הספרים
        setErrorMessage(''); // איפוס הודעת השגיאה
      } catch (error) {
        setErrorMessage('Error occurred while fetching the books'); // שמירת השגיאה כדי שנוכל לשלוח אותה לקומפוננטה של הודעת השגיאה
        console.log("Error occurred while fetching the books:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Books Manager: </h1>
      <Button>Add new book</Button>
      <Container className="container">
        {/* רנדור הספרים רק במצב שטעינת הספרים הצליחה, אחרת נציג את הודעת השגיאה */}
        {errorMessage === '' ? (
          filteredbyCategories.length > 0 ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="books table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell>Cover</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredbyCategories.map((book) => (
                    <TableRow key={book?.upc}>
                      <TableCell component="th" scope="row">
                        <Link to={book?.name} style={{ textDecoration: "none", color: "inherit" }}>
                          {book?.name}
                        </Link>
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
                      <TableCell>
                        <Button>Edit</Button>
                        <Button>Delete</Button>
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
