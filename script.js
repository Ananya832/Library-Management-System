document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/api/books')
        .then(response => response.json())
        .then(data => {
            let bookList = document.getElementById('bookList');
            data.forEach(book => {
                let bookItem = document.createElement('div');
                bookItem.innerHTML = `
                    <h3>${book.Title}</h3>
                    <p>Author: ${book.Author}</p>
                    <p>Publisher: ${book.Publisher}</p>
                    <p>Available Copies: ${book.AvailableCopies}</p>
                `;
                bookList.appendChild(bookItem);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});