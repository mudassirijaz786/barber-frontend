import decode from "jwt-decode";
class Auth {
  constructor() {
    this.authenticated = false;
  }

  isSalonOnwer() {
    const token = localStorage.getItem("x-auth-token");
    try {
      if (token) {
        let decoded = decode(token);
        if (decoded.Salon_Owner_login) {
          this.authenticated = true;
          console.log("token valid");
        }
      }
    } catch (error) {
      return (this.authenticated = false);
    }
    return this.authenticated;
  }

  isAdmin() {
    const token = localStorage.getItem("x-auth-token");
    try {
      if (token) {
        let decoded = decode(token);
        // console.log(decoded);
        if (decoded.SuperAdmin) {
          this.authenticated = true;
          console.log("token valid");
        }
      }
    } catch (error) {
      return (this.authenticated = false);
    }
    return this.authenticated;
  }
}

export default new Auth();
