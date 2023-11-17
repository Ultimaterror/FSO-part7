import React from 'react'

export default function AnecdoteInfo({anecdote}) {
    

    return (
        <div>
            <h2>{anecdote.title} by {anecdote.author}</h2>
            <p>Has {anecdote.votes} votes</p>
            <p>For more info see <a href="#">{anecdote.info}</a></p>
        </div>
    )
}
