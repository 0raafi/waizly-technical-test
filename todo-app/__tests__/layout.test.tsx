// RootLayout.test.tsx
import React from 'react';
import { render } from '@testing-library/react';

import RootLayout from '../app/layout';

describe('RootLayout', () => {
  it('renders the children correctly', () => {
    const { getByText } = render(
      <RootLayout>
        <div>Children</div>
      </RootLayout>
    );

    expect(getByText('Children')).toBeInTheDocument();
  });

  it('has the correct lang attribute in html', () => {
    const { container } = render(
      <RootLayout>
        <div>Children</div>
      </RootLayout>
    );

    const htmlElement = container.querySelector('html');
    expect(htmlElement).toHaveAttribute('lang', 'en');
  });

  it('applies the correct classes to the body element', () => {
    const { container } = render(
      <RootLayout>
        <div>Children</div>
      </RootLayout>
    );

    // Check if the body has the correct classes
    const bodyElement = container.querySelector('body');
    expect(bodyElement).toHaveClass('min-h-screen');
    expect(bodyElement).toHaveClass('bg-background');
    expect(bodyElement).toHaveClass('font-sans');
    expect(bodyElement).toHaveClass('antialiased');
  });
});
