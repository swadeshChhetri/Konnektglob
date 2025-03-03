import '@testing-library/jest-dom';

// Override window.alert to prevent jsdom errors
window.alert = jest.fn();

// ✅ Mock `lucide-react` icons to prevent Jest errors
jest.mock('lucide-react', () => ({
  Mail: () => "MailIcon",
  Lock: () => "LockIcon",
}));
