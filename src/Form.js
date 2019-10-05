import { useState } from 'react';

/**
 * Adapted from: https://medium.com/@geeky_writer_/using-react-hooks-to-create-awesome-forms-6f846a4ce57
 */
function useForm(defaults, callback) {
  const [inputs, setInputs] = useState(defaults);

  function handleSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    callback && callback();
  }

  const handleInputChange = (event) => {
    event.persist();
    console.log(event.target.value);
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }

  return {
    handleSubmit,
    handleInputChange,
    inputs,
    setInputs,
  };
}

export default useForm;