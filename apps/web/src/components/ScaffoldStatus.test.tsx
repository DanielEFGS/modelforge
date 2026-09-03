import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ScaffoldStatus } from './ScaffoldStatus';

describe('ScaffoldStatus', () => {
  it('states that compiler work remains local', () => {
    render(<ScaffoldStatus />);

    expect(screen.getByText(/run locally in your browser/i)).toBeVisible();
  });
});
