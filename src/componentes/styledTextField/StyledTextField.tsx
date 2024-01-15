import TextField from '@mui/material/TextField';
import styled from 'styled-components';

const StyledTextField = styled(TextField)`
margin: auto;
width: 75%;

.MuiInputBase-root {  // targets the input base
    background-color: #ffff;
    border-radius: 4px;
}

  .MuiInputBase-input {  // targets the input element
    color: #333;
  }

  .MuiInputLabel-root {  // targets the label
    color: #666;
  }

  .Mui-focused {  // styles when the component is focused
    .MuiInputLabel-root {
      color: #0056b3;
    }
    .MuiInputBase-root {
      border-color: #0056b3;
    }
  }

  .Mui-error {  // styles for error state
    .MuiInputBase-root {
      background-color: #ffdddd;
    }
    .MuiInputLabel-root {
      color: #d32f2f;
    }
  }
  `
;

export default StyledTextField