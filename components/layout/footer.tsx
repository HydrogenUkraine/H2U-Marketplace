import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="#" className="text-muted-foreground hover:text-primary">
            Terms
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            Privacy
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            Contact
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-muted-foreground">
            &copy; {new Date().getFullYear()} H2 Marketplace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
