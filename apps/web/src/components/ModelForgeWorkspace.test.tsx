import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./JsonEditor', () => ({
  JsonEditor: ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (value: string) => void;
  }) => (
    <textarea
      aria-label="JSON source editor"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  ),
}));

import { ModelForgeWorkspace } from './ModelForgeWorkspace';

describe('ModelForge workspace', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = 'en';
  });

  it('shows source, inspectable evidence, and local privacy state', async () => {
    render(<ModelForgeWorkspace />);
    expect(screen.getByRole('heading', { name: 'Source' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Model inspection' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Output')).toBeInTheDocument();
    expect(
      screen.getByText(/Your JSON stays in this browser/),
    ).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByDisplayValue('emailAddress')).toBeInTheDocument(),
    );
    expect(screen.getByText('email')).toBeInTheDocument();
  });

  it('surfaces an actionable syntax error', async () => {
    render(<ModelForgeWorkspace />);
    fireEvent.change(screen.getByLabelText('JSON source editor'), {
      target: { value: '{ nope' },
    });
    await waitFor(() =>
      expect(screen.getByText('SYNTAX ERROR')).toBeInTheDocument(),
    );
    expect(screen.getAllByText(/Invalid JSON/).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: 'Generate' })).toBeDisabled();
  });

  it('generates files and blocks incompatible Spring Java versions', async () => {
    render(<ModelForgeWorkspace />);
    fireEvent.click(screen.getByRole('button', { name: 'Generate' }));
    await waitFor(() =>
      expect(screen.getByText('models.ts')).toBeInTheDocument(),
    );
    expect(screen.getByLabelText('Generated output')).toHaveTextContent(
      'export interface User',
    );

    fireEvent.change(screen.getByLabelText('Target'), {
      target: { value: 'spring' },
    });
    fireEvent.change(screen.getByLabelText('Java version'), {
      target: { value: '11' },
    });
    expect(screen.getByText('INCOMPATIBLE')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Generate' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Use Java 21' }));
    expect(screen.getByRole('button', { name: 'Generate' })).toBeEnabled();
  });

  it('generates C# records and Python Pydantic models from the same IR', async () => {
    render(<ModelForgeWorkspace />);

    fireEvent.change(screen.getByLabelText('Target'), {
      target: { value: 'csharp' },
    });
    fireEvent.change(screen.getByLabelText('C# style'), {
      target: { value: 'record' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Generate' }));
    await waitFor(() =>
      expect(screen.getByText('User.cs')).toBeInTheDocument(),
    );
    expect(screen.getByLabelText('Generated output')).toHaveTextContent(
      'public sealed record User',
    );
    expect(screen.getByLabelText('Generated output')).toHaveTextContent(
      'JsonPropertyName',
    );

    fireEvent.change(screen.getByLabelText('Target'), {
      target: { value: 'python' },
    });
    fireEvent.change(screen.getByLabelText('Python style'), {
      target: { value: 'pydantic' },
    });
    await waitFor(() =>
      expect(screen.getByText('models.py')).toBeInTheDocument(),
    );
    expect(screen.getByLabelText('Generated output')).toHaveTextContent(
      'class User(BaseModel)',
    );
    expect(screen.getByLabelText('Generated output')).toHaveTextContent(
      'Field(..., alias="email_address")',
    );
  });

  it('preserves source names while allowing target-name edits', async () => {
    render(<ModelForgeWorkspace />);
    const input = await screen.findByLabelText(
      'Generated name for email_address',
    );
    fireEvent.change(input, { target: { value: 'contactEmail' } });
    expect(screen.getByText('email_address')).toBeInTheDocument();
    expect(screen.getByDisplayValue('contactEmail')).toBeInTheDocument();
  });

  it('shows, hides, and pins deterministic field references', async () => {
    render(<ModelForgeWorkspace />);
    const referenceSwitch = screen.getByRole('switch', {
      name: /references/i,
    });
    expect(referenceSwitch).toHaveAttribute('aria-checked', 'true');
    fireEvent.click(referenceSwitch);
    expect(referenceSwitch).toHaveAttribute('aria-checked', 'false');

    const pin = await screen.findByRole('button', {
      name: 'Pin reference User.emailAddress',
    });
    fireEvent.click(pin);
    expect(pin).toHaveAttribute('aria-pressed', 'true');
    expect(pin).toHaveAccessibleName('Unpin reference User.emailAddress');
    expect(pin).toHaveAttribute('title', 'Unpin reference User.emailAddress');
    expect(screen.getAllByText(/email_address/).length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole('button', { name: 'Generate' }));
    const outputReference = await screen.findAllByRole('button', {
      name: 'Trace generated property User.emailAddress',
    });
    expect(outputReference.length).toBeGreaterThan(0);
  });

  it('expands the complete inference diagnostic list', async () => {
    render(<ModelForgeWorkspace />);
    const summary = await screen.findByText(/diagnostics$/);
    fireEvent.click(summary);
    const list = screen.getByRole('list', { name: 'Inference diagnostics' });
    expect(list).toBeVisible();
    expect(screen.getAllByRole('listitem').length).toBeGreaterThan(1);
    expect(
      within(list).getByText(/email_address.*emailAddress/),
    ).toBeInTheDocument();
    expect(within(list).getByText(/created_at.*createdAt/)).toBeInTheDocument();
  });

  it('localizes only interface copy and persists the selected locale', async () => {
    const { unmount } = render(<ModelForgeWorkspace />);
    fireEvent.change(await screen.findByLabelText('Interface language'), {
      target: { value: 'es' },
    });

    expect(screen.getByRole('heading', { name: 'Origen' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Generar' })).toBeEnabled();
    expect(screen.getByDisplayValue('emailAddress')).toBeInTheDocument();
    expect(localStorage.getItem('modelforge-locale')).toBe('es');
    expect(document.documentElement).toHaveAttribute('lang', 'es');

    unmount();
    render(<ModelForgeWorkspace />);
    expect(
      await screen.findByRole('heading', { name: 'Origen' }),
    ).toBeInTheDocument();
  });
});
