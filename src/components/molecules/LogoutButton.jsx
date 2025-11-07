import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '@/layouts/Root';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const LogoutButton = () => {
  const { user, isAuthenticated } = useSelector(state => state.user);
  const { logout } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Button
      variant="outline"
      onClick={logout}
      className="flex items-center space-x-2 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 transition-colors duration-200"
    >
      <ApperIcon name="LogOut" className="w-4 h-4" />
      <span>Logout</span>
    </Button>
  );
};

export default LogoutButton;