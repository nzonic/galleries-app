export function authGuard(to, from, next) {
    const isAuthenticated = !!localStorage.getItem('token');
  
    if (to.meta.authRequired && !isAuthenticated) {
      next('login');
    }
  
    if (to.meta.guestRequired && isAuthenticated) {
      next('/');
    }
    
    next();
  }