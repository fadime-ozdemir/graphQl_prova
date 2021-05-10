import React from 'react'
import { useQuery } from '@apollo/client';
import { getBooksQuery } from "../queries/queries"
import BookDetails from "./BookDetails";

export default function BookList() {
    const { loading, error, data } = useQuery(getBooksQuery);

    const [selected, setSelected] = React.useState("")

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <div>
            <ul id="book-list">
                {data.books.map((book) => 
                (<li
                style={{cursor: 'pointer'}}
                 key={book.id} 
                 onClick={(e) => { setSelected(book.id) }}>
                    {book.name}
                    </li>))}
            </ul>
            <BookDetails bookId={selected} />
        </div>
    )
}
