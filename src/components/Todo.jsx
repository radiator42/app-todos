import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import './images/style.scss';

const styles = {
  itemList: {
    width: '100%',
  },
  button: {
    width: '50%',
  },
  input: {
    display: 'none',
  },
};

class Todo extends React.Component {
  render() {
    const {
      setToggleTodo, completed, text, classes, id, setImage,
    } = this.props;

    return (
      <ListItem className={classes.itemList}>
        <Button
          className={classes.button}
          variant="raised"
          color="secondary"
          value={text}
          onClick={() => setToggleTodo(id)}
          style={{ textDecoration: completed ? 'line-through' : 'none' }}
        >
          {text}
        </Button>
        <form>
          <label htmlFor={id} className="label">
          Загрузить img
            <input
              id={id}
              accept="image/*"
              className={classes.input}
              onChange={() => setImage(this.file)}
              type="file"
              ref={(node) => {
                this.file = node;
              }
            }
            />

          </label>
        </form>

      </ListItem>
    );
  }
}

Todo.propTypes = {
  setImage: PropTypes.func.isRequired,
  setToggleTodo: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Todo);
