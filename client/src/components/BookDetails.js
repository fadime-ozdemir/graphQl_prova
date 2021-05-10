import React from 'react'
import { useQuery } from '@apollo/client';
import { getBookQuery } from "../queries/queries"

export default function BookDetails({bookId}) {
    const { loading, error, data } = useQuery(getBookQuery, {
        variables: { id: bookId },
      });
      const displayBookDetails= ()=>{
          if (loading) return <p>Loading...</p>;
          if(data){
            const book = data.book;
            return(
                <div>
                    <h2>{ book.name }</h2>
                    <p>{ book.genre }</p>
                    <p>{ book.author.name }</p>
                    <p>All books by this author:</p>
                    <ul className="other-books">
                        { book.author.books.map(item => {
                            return <li key={item.id}>{ item.name }</li>
                        })}
                    </ul>
                </div>
            );
        } else {
            if (error) return <p>Error :(</p>;
            return( <div>No book selected...</div> );
        }
    }

console.log("got book",data)
    return (
        <div id="book-details">
           {displayBookDetails()}
        </div>
    )
}
