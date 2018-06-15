function handleInput({ target: { name, value } }) {
  this.setState({
    [name]: value
  });
}

export default handleInput;
