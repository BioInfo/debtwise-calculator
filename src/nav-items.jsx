import React from 'react';
import { HomeIcon } from "lucide-react";
import Index from "./pages/Index";

/**
 * @typedef {Object} NavItem
 * @property {string} title
 * @property {string} to
 * @property {React.ReactNode} icon
 * @property {React.ReactNode} page
 */

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 * @type {NavItem[]}
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
];
