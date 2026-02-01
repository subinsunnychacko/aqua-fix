"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MapPin, Mail, Phone, Menu, X } from "lucide-react";

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [hoveredLink, setHoveredLink] = useState<string | null>(null);
	const [scrolled, setScrolled] = useState(false);

	const navLinks = [
		{ href: "/sanitary", label: "sanitary" },
		{ href: "/heating", label: "heating" },
		{ href: "/drainage", label: "drainage" },
		{ href: "/solar", label: "solar" },
		{ href: "/references", label: "references" },
		{ href: "/home#team", label: "team" },
	];

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 400);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<>
			{/* Top Contact Bar - Full Width Dark */}
			<div className="w-full bg-[#1a2634] text-white/60 pt-5 text-sm">
				<div className="max-w-7xl mx-auto px-6 lg:px-12">
					<div className="flex flex-wrap items-center gap-6 md:gap-10">
						<a
							href="#"
							className="flex items-center gap-2 hover:text-white transition-colors">
							<MapPin className="w-4 h-4" />
							<span>456 Water St, Vancouver, BC</span>
						</a>
						<a
							href="mailto:info@aquafix.com"
							className="flex items-center gap-2 hover:text-white transition-colors">
							<Mail className="w-4 h-4" />
							<span>info@aquafix.com</span>
						</a>
						<a
							href="tel:+16041234567"
							className="flex items-center gap-2 hover:text-white transition-colors">
							<Phone className="w-4 h-4" />
							<span>604-123-4567</span>
						</a>
					</div>
				</div>
			</div>

			{/* Sticky Navbar - Appears on scroll */}
			<nav
				className={`fixed top-0 left-0 right-0 z-50 bg-[#1a2634] transition-transform duration-300 ${
					scrolled ? "translate-y-0" : "-translate-y-full"
				}`}>
				<div className="max-w-7xl mx-auto px-6 lg:px-12">
					<div className="flex items-center justify-between h-20">
						{/* Logo */}
						<Link
							href="/"
							className="font-['Playfair_Display'] text-2xl font-bold text-white tracking-wide">
							AQUAFIX
						</Link>

						{/* Desktop Nav - White pill with dark hover */}
						<div className="hidden lg:flex items-center">
							<div className="flex items-center bg-white rounded-full px-1 py-1">
								{navLinks.map((link) => (
									<Link
										key={link.href}
										href={link.href}
										onMouseEnter={() => setHoveredLink(link.href)}
										onMouseLeave={() => setHoveredLink(null)}
										className="relative px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200">
										<span
											className={`absolute inset-0 bg-[#1e2a36] rounded-full transition-all duration-200 ${
												hoveredLink === link.href
													? "opacity-100"
													: "opacity-0"
											}`}
										/>
										<span
											className={`relative z-10 transition-colors duration-200 ${
												hoveredLink === link.href
													? "text-white"
													: "text-[#1e2a36]/70"
											}`}>
											{link.label}
										</span>
									</Link>
								))}
							</div>
						</div>

						{/* Contact Button */}
						<div className="hidden lg:block">
							<Link
								href="/contact"
								className="bg-white/10 text-white px-7 py-3 rounded-full text-sm font-medium border border-white/20 hover:bg-white hover:text-[#1e2a36] transition-all">
								contact
							</Link>
						</div>

						{/* Mobile Menu Button */}
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="lg:hidden p-2 text-white">
							{isOpen ? (
								<X className="h-6 w-6" />
							) : (
								<Menu className="h-6 w-6" />
							)}
						</button>
					</div>

					{/* Mobile Menu */}
					{isOpen && (
						<div className="lg:hidden bg-white rounded-2xl mb-4 p-6 shadow-xl">
							<div className="space-y-2">
								{navLinks.map((link) => (
									<Link
										key={link.href}
										href={link.href}
										onClick={() => setIsOpen(false)}
										className="block px-4 py-3 rounded-full text-[#1e2a36]/70 hover:bg-[#1e2a36] hover:text-white transition-colors">
										{link.label}
									</Link>
								))}
								<Link
									href="/contact"
									onClick={() => setIsOpen(false)}
									className="block w-full text-center bg-[#1e2a36] text-white px-6 py-3 rounded-full font-medium mt-4">
									contact
								</Link>
							</div>
						</div>
					)}
				</div>
			</nav>
		</>
	);
}
