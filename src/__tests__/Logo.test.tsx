import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Logo from '../components/Logo';

describe('Logo component', () => {
  it('should render an SVG element', () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should have aria-label for accessibility', () => {
    render(<Logo />);
    const svg = screen.getByLabelText('KidLearn logo');
    expect(svg).toBeInTheDocument();
  });

  it('should use default size of 36', () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '36');
    expect(svg).toHaveAttribute('height', '36');
  });

  it('should accept custom size prop', () => {
    const { container } = render(<Logo size={48} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '48');
    expect(svg).toHaveAttribute('height', '48');
  });

  it('should have viewBox set to 0 0 100 100', () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 100 100');
  });

  it('should contain graduation cap polygon', () => {
    const { container } = render(<Logo />);
    const polygons = container.querySelectorAll('polygon');
    expect(polygons.length).toBeGreaterThanOrEqual(1);
  });
});
