import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../../pages/auth/signup/page';
// import SignupForm from '@/components/SignupForm';


describe('Signup Form', () => {
  it('renders the signup form fields correctly', () => {
    render(<Register />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('shows error messages for invalid input', async () => {
    render(<Register />);
    
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  it('submits the form successfully with valid inputs', async () => {
    render(<Register />);

    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.input(screen.getByLabelText(/password/i), { target: { value: 'Password123!' } });
    fireEvent.input(screen.getByLabelText(/confirm password/i), { target: { value: 'Password123!' } });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(await screen.findByText(/account created successfully/i)).toBeInTheDocument();
  });
});
