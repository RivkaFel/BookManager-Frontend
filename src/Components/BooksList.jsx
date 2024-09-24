import React, { useEffect, useState } from 'react';
import { getAllBooks } from '../Services/books';
import { Container, Grid, Paper, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import "../style/bookList.css";

const BooksList = () => {
  const [books, setBooks] = useState([]); // רשימת הספרים
  const [errorMessage, setErrorMessage] = useState(''); // הודעת שגיאה
  const [filteredbyCategories, setFilteredbyCategories] = useState([]); // סינון לפי קטגוריות
  const [booksNumbers, setBooksNumbers] = useState(10); // מספר הספרים שיוצגו (אם רלוונטי)

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
        <Grid container spacing={5}>
          {/* אם מצאנו ספרים שמתאימים לחיפוש נציג אותם, אחרת נכתוב "לא נמצאו תוצאות" */}
          {filteredbyCategories.length > 0 ? (
            filteredbyCategories.map((book) => (
              <Grid item xs={12} sm={12} md={2} key={book?.upc}>
                <Link to={book?.name} style={{ textDecoration: "none" }}>
                  <Paper style={{ height: "100%" }} sx={{ paddingBottom: "5px" }}>
                    <Typography variant="h5" component="h4">
                      {book?.name}
                    </Typography>
                    <Typography variant="body1" component="p">
                      סופר.ת: {book?.author}
                    </Typography>
                    <img
                      src={book?.img}
                      alt="Book Cover"
                      className="book-img"
                    />
                     <Button>Edit</Button>
                    <Button>Delete</Button>
                  </Paper>
                </Link>
              </Grid>
            ))
          ) : (
            <Box>
              <Typography variant="h4" component="h4" style={{ paddingTop: "100px", paddingLeft: "500px" }}>
                לא נמצאו תוצאות
              </Typography>
            </Box>
          )}
        </Grid>
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
