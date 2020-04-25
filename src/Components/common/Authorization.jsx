//importing
import decode from "jwt-decode";

//class Auth
class Auth {
  constructor() {
    this.authenticated = false;
    this.role = "";
  }

  isSalonOnwer() {
    const token = localStorage.getItem("x-auth-token");
    try {
      if (token) {
        let decoded = decode(token);
        if (decoded.Salon_Owner_login) {
          this.authenticated = true;
          this.role = "Salon_Owner_login";
        }
      }
    } catch (error) {
      return (this.authenticated = false);
    }
    return { auth: this.authenticated, role: this.role };
  }

  isAdmin() {
    const token = localStorage.getItem("x-auth-token");
    try {
      if (token) {
        let decoded = decode(token);
        if (decoded.SuperAdmin) {
          this.authenticated = true;
          this.role = "SuperAdmin";
        }
      }
    } catch (error) {
      return (this.authenticated = false);
    }
    return { auth: this.authenticated, role: this.role };
  }
}

//exporting Auth
export default new Auth();
