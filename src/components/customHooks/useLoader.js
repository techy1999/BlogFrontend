import React, { createContext, useState, useContext } from "react";
const LoadingContext = createContext();
// export const useLoading = () => useContext(LoadingContext);

export const useLoading = () =>{
    const context = useContext(LoadingContext);
    if(!context) throw Error('useLoading must be use with a loadingProvider')
    return context;
}

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ loading, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

