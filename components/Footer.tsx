"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function Footer() {
	const footerRef = useRef<HTMLElement>(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!mounted || typeof window === "undefined") return;

		const initGSAP = async () => {
			try {
				const gsapModule = await import("gsap");
				const { ScrollTrigger } = await import("gsap/ScrollTrigger");
				const gsap = gsapModule.default;

				gsap.registerPlugin(ScrollTrigger);

				gsap.fromTo(
					".footer-cta-content",
					{ opacity: 0, y: 50 },
					{
						opacity: 1,
						y: 0,
						duration: 0.8,
						ease: "power3.out",
						scrollTrigger: {
							trigger: ".footer-cta",
							start: "top 80%",
						},
					},
				);
			} catch (error) {
				console.warn("GSAP animation failed in Footer");
			}
		};

		initGSAP();
	}, [mounted]);

	return (
		<footer ref={footerRef}>
			{/* Dark CTA Section */}
			<div className="footer-cta bg-[#1e2a36] py-20 relative overflow-hidden">
				{/* Decorative Circles */}
				<div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10">
					<svg width="400" height="400" viewBox="0 0 400 400" fill="none">
						<circle
							cx="200"
							cy="200"
							r="180"
							stroke="white"
							strokeWidth="1"
						/>
						<circle
							cx="200"
							cy="200"
							r="140"
							stroke="white"
							strokeWidth="1"
						/>
						<circle
							cx="200"
							cy="200"
							r="100"
							stroke="white"
							strokeWidth="1"
						/>
					</svg>
				</div>

				<div className="footer-cta-content max-w-4xl mx-auto px-4 text-center relative z-10">
					<h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-white italic mb-6">
						we help you further
					</h2>
					<p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
						broken pipe, defective heating or installation of a new
						washbasin - we come and help you out. Our 24h emergency
						service will be happy to assist you!
					</p>
					<a
						href="tel:+16041234567"
						className="inline-block bg-white text-[#1e2a36] px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-colors">
						Call 24 hours emergency number
					</a>
				</div>
			</div>

			{/* White Footer Section */}
			<div className="bg-white py-16 rounded-t-[40px] -mt-8 relative z-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Logo */}
					<div className="text-center mb-8">
						<Link
							href="/home"
							className="font-['Playfair_Display'] text-4xl font-bold text-[#1e2a36] tracking-wide">
							AQUAFIX
						</Link>
					</div>

					{/* Divider */}
					<div className="w-full h-px bg-[#1e2a36]/10 mb-12" />

					{/* Footer Content */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
						{/* About */}
						<div>
							<p className="text-[#1e2a36]/60 leading-relaxed">
								AquaFix is a master plumbing business, providing premium
								services since 2015 in Vancouver. Our team specializes
								in all modern plumbing technologies.
							</p>
							<div className="mt-6 space-y-2">
								<a
									href="mailto:info@aquafix.com"
									className="block text-[#1e2a36]/60 hover:text-[#1e2a36] transition-colors">
									info@aquafix.com
								</a>
								<a
									href="tel:+16041234567"
									className="block text-[#1e2a36]/60 hover:text-[#1e2a36] transition-colors">
									+1 604 123 4567
								</a>
							</div>
						</div>

						{/* Navigation */}
						<div>
							<ul className="space-y-3">
								<li>
									<Link
										href="/"
										className="text-[#1e2a36]/60 hover:text-[#1e2a36] transition-colors">
										Home
									</Link>
								</li>
								<li>
									<Link
										href="/sanitary"
										className="text-[#1e2a36]/60 hover:text-[#1e2a36] transition-colors">
										Sanitary
									</Link>
								</li>
								<li>
									<Link
										href="/heating"
										className="text-[#1e2a36]/60 hover:text-[#1e2a36] transition-colors">
										Heating
									</Link>
								</li>
								<li>
									<Link
										href="/drainage"
										className="text-[#1e2a36]/60 hover:text-[#1e2a36] transition-colors">
										Drainage
									</Link>
								</li>
							</ul>
						</div>

						{/* More Links */}
						<div>
							<ul className="space-y-3">
								<li>
									<Link
										href="/portfolio"
										className="text-[#1e2a36]/60 hover:text-[#1e2a36] transition-colors">
										References
									</Link>
								</li>
								<li>
									<Link
										href="/about"
										className="text-[#1e2a36]/60 hover:text-[#1e2a36] transition-colors">
										About Us
									</Link>
								</li>
								<li>
									<Link
										href="/contact"
										className="text-[#1e2a36]/60 hover:text-[#1e2a36] transition-colors">
										Contact
									</Link>
								</li>
							</ul>
						</div>
					</div>

					{/* Copyright */}
					<div className="mt-12 pt-8 border-t border-[#1e2a36]/10 text-center">
						<p className="text-[#1e2a36]/40 text-sm">
							© {new Date().getFullYear()} AquaFix Plumbing. All rights
							reserved.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
