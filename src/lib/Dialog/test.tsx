import React from 'react';
import Dialog from './index';
import Button from '../Button';
import Heading from '../Heading';
import Box from '../Box';
import TextField from '../TextField';

const App = () => {
  return (
    <Dialog.Trigger>
      <Button>New workspace</Button>
      {(close) => (
        <Dialog.Modal>
          <Heading>Create new workspace</Heading>
          <Box py="$4" as="form">
            <TextField placeholder="Carefive" />
            <Box pb="$2" />
            <Button type="submit">Create</Button>
          </Box>
        </Dialog.Modal>
      )}
    </Dialog.Trigger>
  );
};

export default App;
