import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { createBook } from '../Services/books';

const AddBookForm = ({ onAddBook, books}) => {
  // יצירת state עבור כל שדה בטופס
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [img, setImg] = useState('');
  const [price, setPrice] = useState('');

  // פונקציה לטיפול בהוספת הספר
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
        const upc = (Math.max(...books.map(book => Number(book.upc))) + 1).toString();
        const book={
            "upc": upc,
            "name": name,
            "author": author,
            "price": price,
            "img": img
          }
        //const upc= 
        await createBook(book);    
        const newBook = { upc, name, author, img, price };
        onAddBook(newBook);    // קריאה לפונקציה מהקומפוננטה הראשית כדי להוסיף את הספר החדש
    }


catch(error){
console.log(error)
}
    
    // איפוס השדות לאחר ההוספה
    setName('');
    setAuthor('');
    setImg('');
    setPrice('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '400px', margin: 'auto', mt: 4 }}
    >
      <Typography variant="h6">Add a New Book</Typography>
      

      {/* שדה שם הספר */}
      <TextField
        label="Book Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      {/* שדה מחבר */}
      <TextField
        label="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />

      {/* שדה תמונה (URL) */}
      <TextField
        label="Cover Image Path"
        value={img}
        onChange={(e) => setImg(e.target.value)}
        required
      />

      {/* שדה מחיר */}
      <TextField
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      {/* כפתור הוספה */}
      <Button type="submit" variant="contained" color="primary">
        Add Book
      </Button>
    </Box>
  );
};

export default AddBookForm;
