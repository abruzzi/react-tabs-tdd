import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders a heading', () => {
  render(<App />);
  const element = screen.getByText(/React Tabs/i);
  expect(element).toBeInTheDocument();
});
