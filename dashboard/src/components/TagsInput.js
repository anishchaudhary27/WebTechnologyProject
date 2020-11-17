import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import ChipInput from 'material-ui-chip-input';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  TextField: {
    marginLeft: '0px'
  }
}));

const TagsInput = ({ selectedTags, tags, setTags }) => {
  const classes = useStyles();

  const addTags = (tag) => {
    setTags([...tags, tag]);
    selectedTags([...tags, tag]);
  };

  const removeTags = (chip, index) => {
    setTags([...tags.filter((tag) => tags.indexOf(tag) !== index)]);
  };

  return (
    <ChipInput
      fullWidth
      value={tags}
      onAdd={(tag) => addTags(tag)}
      onDelete={(chip, index) => removeTags(chip, index)}
    />
  );
};
export default TagsInput;
