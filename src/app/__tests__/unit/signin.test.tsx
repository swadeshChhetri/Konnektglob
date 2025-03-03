import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../../pages/auth/signin/page';
import { useRouter } from "next/navigation";
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { waitFor } from '@testing-library/react';
// import SigninForm from '@/components/SigninForm';

// ✅ Mock `useAuth()` to provide a fake `login` function
jest.mock("../../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

// Mock next/navigation's useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// ✅ Mock axios
jest.mock('axios');


describe('Signin Form', () => {
  let mockLogin: jest.Mock;
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockLogin = jest.fn(); // Fake login function
    mockPush = jest.fn();

    (useAuth as jest.Mock).mockReturnValue({ login: mockLogin }); // Provide mock implementation
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush }); // Mock router navigation
  });

  it('renders the signin form correctly', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('shows error messages for invalid input', async () => {
    render(<Login />);

    fireEvent.submit(screen.getByRole('button', { name: /log in/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });



  it('submits the form successfully with valid credentials', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({}); // For the CSRF cookie call
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { user: { id: 1, email: 'test@example.com', name: 'Test User' } }
    });
    /* 
    CSRF (Cross-Site Request Forgery) is a type of security attack where a malicious website tricks a logged-in user
    into unknowingly performing unwanted actions on another website (e.g., transferring money, changing passwords).
    */

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password123!' } });

    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    // ✅ Ensure `login` was called
    await waitFor(() => { 
      expect(mockLogin).toHaveBeenCalledWith(
        expect.objectContaining({ 
          email: "test@example.com" 
        })
      );
  })
    // Check if redirection was attempted
    expect(mockPush).toHaveBeenCalledWith("/");
  });


});
