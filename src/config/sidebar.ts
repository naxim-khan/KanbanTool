import type { LucideIcon } from "lucide-react"
import {
  // BarChart3,
  // Bell,
  ClipboardList,
  // CreditCard,
  LayoutDashboard,
  // Settings,
  Users,
} from "lucide-react"

/** Single navigable row (icon is a component reference, not JSX). */
export type SidebarNavLinkItem = {
  title: string
  href: string
  icon: LucideIcon
}

/**
 * Visual section in the sidebar. Add new groups as the app grows
 * (e.g. “Admin”, “Integrations”) without changing layout code.
 */
export type SidebarNavGroup = {
  id: string
  label: string
  items: SidebarNavLinkItem[]
}

/**
 * Data-driven navigation. Edit this file to add routes, icons, or groups.
 */
export const sidebarNavGroups: SidebarNavGroup[] = [
  {
    id: "overview",
    label: "Overview",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      // { title: "Analytics", href: "/analytics", icon: BarChart3 },
    ],
  },
  {
    id: "workspace",
    label: "Workspace",
    items: [
      { title: "Tasks", href: "/tasks", icon: ClipboardList },
      { title: "Users", href: "/users", icon: Users },
      // { title: "Notifications", href: "/notifications", icon: Bell },
    ],
  },
  // {
  //   id: "account",
  //   label: "Account",
  //   items: [
  //     { title: "Settings", href: "/settings", icon: Settings },
  //     { title: "Billing", href: "/billing", icon: CreditCard },
  //   ],
  // },
]
