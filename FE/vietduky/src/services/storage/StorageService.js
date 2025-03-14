export const StorageService = {
    getToken: () => localStorage.getItem("access_token"),
  
    setToken: (token) => localStorage.setItem("access_token", token),
  
    removeToken: () => localStorage.removeItem("access_token"),
  
    isExpired: () => {
      const token = StorageService.getToken();
      if (!token) return true;
  
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.exp < Math.floor(Date.now() / 1000);
      } catch (error) {
        return true;
      }
    },
  
    signout: (navigate) => { // ✅ Truyền `navigate` từ component vào đây
      StorageService.removeToken();
      navigate("/login"); // ✅ Dùng được vì navigate được truyền từ component
    },
  };
  