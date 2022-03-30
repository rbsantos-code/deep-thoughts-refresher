import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_THOUGHT } from '../../utils/mutations';

const ThoughtForm = () => {
    const [addThought, { error }] = useMutation(ADD_THOUGHT);

    const [thoughtText, setText] = useState('');

    const [characterCount, setCharacterCount] = useState(0);

    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handFormSubmit = async event => {
        event.preventDefault();
        

        try {
            // add thought to database
            await addThought({
                variables: { thoughtText }
            });

            // clear form value
            setText('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
                Character Count: {characterCount}/128
                {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form className="flex-row justify-center justify-space-between-md align-stretch" onSubmit={handFormSubmit}>
                <textarea
                    placeholder="Here's a new thought..."
                    value={thoughtText}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></textarea>
                <button className="btn col-12 col-md-3" type="submit">
                    submit
                </button>
            </form>
        </div>
    );
};

export default ThoughtForm;