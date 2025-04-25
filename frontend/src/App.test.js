/**
 * App Component Test Suite
 * 
 * This file contains tests for the App component using React Testing Library.
 * It verifies that key elements are correctly rendered in the application.
 */
import { render, screen } from '@testing-library/react';
import App from './App';

/**
 * Test case: Verify the "learn react" text is present
 * 
 * This test checks if the App component renders and contains text matching "learn react"
 * Note: This is a default test created by Create React App that should be updated
 * to match the actual content of the sign language application.
 */
test('renders learn react link', () => {
  // Render the App component into a virtual DOM
  render(<App />);
  
  // Query the DOM for an element containing the text "learn react" (case insensitive)
  const linkElement = screen.getByText(/learn react/i);
  
  // Assert that the element is present in the document
  expect(linkElement).toBeInTheDocument();
});