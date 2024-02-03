import { jwtDecode } from 'jwt-decode';

class AuthService {
  // Store the token
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/main');
  }

  // Retrieve the user's profile from the token
  getProfile() {
    const token = this.getToken(); // Retrieve the token from local storage
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error("Token decoding error:", error);
      return null;
    }
  }

  getCurrentUser() {
    const profile = this.getProfile();
    return profile;
  }

  // Check if the user is logged in
  loggedIn() {
    const token = this.getToken();
    if (!token) return false;
    const decoded = jwtDecode(token);
    return decoded.exp > Date.now() / 1000;
  }

  // Get the token from local storage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Log out the user
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }

  // Check if the user is an admin
  isAdmin() {
    const profile = this.getProfile();
    return profile && profile.role === 'admin';
  }
}

const authService = new AuthService();
export default authService;
