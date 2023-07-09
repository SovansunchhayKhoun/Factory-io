import React, { useState } from 'react';
import SearchModal from './header/SearchModal';
import Notifications from './header/Notifications';
import Help from './header/Help';
import UserMenu from './header/UserMenu';

function Header({
  sidebarOpen,
  setSidebarOpen
}) {

  const [searchModalOpen, setSearchModalOpen] = useState(false)


  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-16 -mb-px">
          <div className="flex items-center">
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
