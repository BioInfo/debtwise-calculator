import React from 'react';
import { HomeIcon } from "lucide-react";
import Index from "./pages/Index";

interface NavItem {
  title: string;
  to: string;
  icon: React.ReactNode;
  page: React.ReactNode;
}

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems: NavItem[] = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
];
