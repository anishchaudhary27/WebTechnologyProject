import React, { useState } from 'react';
import './TaskInput.css';

function TaskInputCool() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [website, setWebsite] = useState('');

  const onFormSubmit = () => {
    console.log(title, description, date, website);
  };

  return (
    <div>
      <div className="container">
        <form className="input-form">
          <h1 className="container-head">Enter details</h1>
          <label>Title :</label>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <label>Description :</label>
          <input
            type="textbox"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <label>Date and Time :</label>
          <input type="datetime-local" onChange={(e) => setDate(e.target.value)} value={date} />
          <label>Website :</label>
          <input
            type="url"
            placeholder="website"
            onChange={(e) => setWebsite(e.target.value)}
            value={website}
          />
          <div className="clearfix">
            <button type="submit" className="submit-btn" onClick={onFormSubmit}>
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskInputCool;
