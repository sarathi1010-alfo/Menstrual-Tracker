import re

with open('src/components/Layout.tsx', 'r') as f:
    content = f.read()

# Add Settings to imports
content = content.replace(
    "import { Calendar, Home, HelpCircle, ChevronDown } from 'lucide-react';",
    "import { Calendar, Home, HelpCircle, ChevronDown, Settings } from 'lucide-react';"
)

# Add Settings gear to desktop nav
desktop_nav_old = """<Link href="/about" className="hover:text-[var(--foreground)] transition-colors">About</Link>
            </nav>"""
desktop_nav_new = """<Link href="/about" className="hover:text-[var(--foreground)] transition-colors">About</Link>
              <Link href="/settings" className="hover:text-[var(--foreground)] transition-colors flex items-center" aria-label="Settings">
                <Settings size={18} />
              </Link>
            </nav>"""

content = content.replace(desktop_nav_old, desktop_nav_new)

with open('src/components/Layout.tsx', 'w') as f:
    f.write(content)
