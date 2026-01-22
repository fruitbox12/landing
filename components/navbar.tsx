"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu"

export function Navbar() {
  return (
    <header className="relative z-50 bg-black/90 backdrop-blur-xl border-b border-gray-800/50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo - links to home */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="https://shadw.cloud/icow.png" 
            alt="Shadw Logo" 
            width={80}
            height={40}
          />
        </Link>

        {/* Navigation Menu */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <Link href="/overview" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                Product
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/solutions/enterprise" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                Solutions
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/features/security" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                Features
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/docs" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                Docs
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/pricing" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                Pricing
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/blog" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                Blog
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/case-studies" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                Case Studies
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side buttons */}
        <div className="flex items-center gap-3">
          <Link href="/demo">
            <Button 
              variant="ghost" 
              className="hidden sm:inline-flex rounded-full text-gray-300 hover:text-white hover:bg-white/5 bg-transparent"
            >
              Demo
            </Button>
          </Link>
          <Link href="/platform">
            <Button 
              variant="outline" 
              className="rounded-full border-gray-600 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
