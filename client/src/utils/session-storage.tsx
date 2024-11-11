export const getUsernameFromSession = (): string => {
    return sessionStorage.getItem('username') as string;
  };