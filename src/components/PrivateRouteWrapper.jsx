const PrivateRouteWrapper = ({ element}) => {
    const { isAuthenticated } = useSelector((state) => state.auth); // Correctly access auth state
  
    const isAuthorized = isAuthenticated; // Ensure user is authenticated and has the correct role
  
    return isAuthorized ? element : <Navigate to="/login" replace />;
  };
  