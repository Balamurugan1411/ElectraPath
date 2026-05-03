import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

// Mocking framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    aside: ({ children, ...props }) => <aside {...props}>{children}</aside>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

describe('ElectraPath AI - App Navigation', () => {
  it('renders the dashboard by default', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Vanakkam, Chennai!/i })).toBeInTheDocument();
  });

  it('navigates to Candidates view', () => {
    render(<App />);
    const candidatesTab = screen.getByRole('button', { name: /Candidates/i });
    fireEvent.click(candidatesTab);
    expect(screen.getByRole('heading', { name: /Candidates & Parties/i })).toBeInTheDocument();
  });

  it('navigates to MCC Analyzer view', () => {
    render(<App />);
    const analyzerTab = screen.getByRole('button', { name: /MCC Analyzer/i });
    fireEvent.click(analyzerTab);
    expect(screen.getByRole('heading', { name: /AI MCC Analyzer/i })).toBeInTheDocument();
  });

  it('navigates to Resources view', () => {
    render(<App />);
    const resourcesTab = screen.getByRole('button', { name: /Resources/i });
    fireEvent.click(resourcesTab);
    expect(screen.getByRole('heading', { name: /Civic Resource Hub/i })).toBeInTheDocument();
  });
});
