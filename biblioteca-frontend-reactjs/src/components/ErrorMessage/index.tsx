import React from 'react';
import { Box, Alert, AlertTitle, Button } from '@mui/material';
import { Refresh } from '@mui/icons-material';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  title = 'Erro', 
  message, 
  onRetry 
}) => {
  return (
    <Box sx={{ p: 2 }}>
      <Alert 
        severity="error"
        action={
          onRetry && (
            <Button
              color="inherit"
              size="small"
              startIcon={<Refresh />}
              onClick={onRetry}
            >
              Tentar Novamente
            </Button>
          )
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;
