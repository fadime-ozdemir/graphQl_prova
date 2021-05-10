import React from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { getAuthorsQuery,getBooksQuery, addBookMutation } from "../queries/queries"

export default function AddBook() {
    const { loading, error, data } = useQuery(getAuthorsQuery);

    const displayAuthors = () => {
        if (loading) {
            return (<option disabled>Loading authors</option>);
        } else if (error) {
            return (<option disabled>Error: {error}</option>)
        } else {
            return data.authors.map(author => {
                return (<option key={author.id} value={author.id}>{author.name}</option>);
            });
        }
    }

    const [addBook, { data : addedData }] = useMutation(addBookMutation);
    const [input, setInput] = React.useState({ name: "", genre: "", authorId: "" })
    const submitForm = (e) => {
        e.preventDefault();
        addBook({
            variables: {
                name: input.name,
                genre: input.genre,
                authorId: input.authorId
            },
            refetchQueries:[{query: getBooksQuery}]
        })
    }
    
    return (
        <form id="add-book" onSubmit={(e) => submitForm(e)}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" onChange={(e) => setInput(state => ({ ...state, "name": e.target.value }))} />
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={(e) => setInput(state => ({ ...state, "genre": e.target.value }))} />
            </div>
            <div className="field">
                <label>Author:</label>
                <select onChange={(e) => setInput(state => ({ ...state, "authorId": e.target.value }))}>
                    <option>Select author</option>
                    {displayAuthors()}
                </select>
            </div>
            <button>+</button>

        </form>
    )
}
