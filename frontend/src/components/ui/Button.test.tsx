import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Button, ButtonRouterLink } from './Button';

describe('Button', () => {
  it('renders a primary button by default', () => {
    render(<Button>Book</Button>);
    const button = screen.getByRole('button', { name: 'Book' });
    expect(button).toBeInTheDocument();
    expect(button.className).toMatch(/bg-primary\b/);
  });

  it('supports disabled prop', () => {
    render(<Button disabled>Unavailable</Button>);
    expect(screen.getByRole('button', { name: 'Unavailable' })).toBeDisabled();
  });

  it('renders a router link variant', () => {
    render(
      <BrowserRouter>
        <ButtonRouterLink to="/about">About</ButtonRouterLink>
      </BrowserRouter>,
    );
    const link = screen.getByRole('link', { name: 'About' });
    expect(link).toHaveAttribute('href', '/about');
  });
});
