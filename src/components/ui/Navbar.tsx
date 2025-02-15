import React from "react";
import { Menu } from "lucide-react";

interface NavLinkProps {
	href: string;
	children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => (
	<a
		href={href}
		className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
	>
		{children}
	</a>
);

const Navbar = () => {
	return (
		<nav className="bg-neutral-900 fixed w-full z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center">
						<div className="flex-shrink-0">
							<span className="text-white text-xl font-bold">
								i-Love-PDF-too
							</span>
						</div>
					</div>

					{/* Desktop Menu */}
					<div className="hidden md:block">
						<div className="ml-10 flex items-baseline space-x-4">
							<NavLink href="#hero">Home</NavLink>
							<NavLink href="#features">Features</NavLink>
							<NavLink href="#pricing">Pricing</NavLink>
							<NavLink href="#testimonials">About Us</NavLink>
							<NavLink href="#contact">Contact</NavLink>
							<a
								href="/get-started"
								className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300"
							>
								Get Started for Free
							</a>
						</div>
					</div>

					{/* Mobile Menu Button */}
					<div className="md:hidden">
						<details className="group">
							<summary className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white list-none">
								<span className="sr-only">Open main menu</span>
								<Menu className="h-6 w-6" />
							</summary>

							{/* Fixed position Mobile Menu */}
							<div className="absolute inset-x-0 top-16 bg-neutral-900">
								<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
									<a
										href="#hero"
										className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
									>
										Home
									</a>
									<a
										href="#features"
										className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
									>
										Features
									</a>
									<a
										href="#pricing"
										className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
									>
										Pricing
									</a>
									<a
										href="#testimonials"
										className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
									>
										About Us
									</a>
									<a
										href="#contact"
										className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
									>
										Contact
									</a>
									<a
										href="/get-started"
										className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300 block text-center"
									>
										Get Started for Free
									</a>
								</div>
							</div>
						</details>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
