"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

/* ---------------- NAV PILL COMPONENT ---------------- */

function NavPill() {
	const [hoveredLink, setHoveredLink] = useState<string | null>(null);

	const navLinks = [
		{ href: "/sanitary", label: "sanitary" },
		{ href: "/heating", label: "heating" },
		{ href: "/drainage", label: "drainage" },
		{ href: "/solar", label: "solar" },
		{ href: "/references", label: "references" },
		{ href: "/#team", label: "team" },
	];

	return (
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
							hoveredLink === link.href ? "opacity-100" : "opacity-0"
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
	);
}

/* ---------------- MOBILE MENU COMPONENT ---------------- */

function MobileMenuButton() {
	const [isOpen, setIsOpen] = useState(false);

	const navLinks = [
		{ href: "/sanitary", label: "sanitary" },
		{ href: "/services#heating", label: "heating" },
		{ href: "/services#drainage", label: "drainage" },
		{ href: "/solar", label: "solar" },
		{ href: "/references", label: "references" },
		{ href: "/#team", label: "team" },
	];

	return (
		<div className="lg:hidden">
			<button onClick={() => setIsOpen(!isOpen)} className="p-2 text-white">
				{isOpen ? (
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				) : (
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				)}
			</button>

			{isOpen && (
				<div className="absolute top-full left-4 right-4 mt-2 bg-white rounded-2xl p-6 shadow-xl z-50">
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
	);
}

/* ---------------- DATA ---------------- */

const heroImages = [
	//   "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1887&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2069&auto=format&fit=crop",
	//   "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
];

const features = [
	"Comprehensive & competent advice",
	"Complete bathroom renovations",
	"Professional execution of all installation work",
	"High-quality materials and fixtures",
	"Expert plumbing and drainage solutions",
];

/* ---------------- MAIN COMPONENT ---------------- */

export default function SanitaryPage() {
	const [mounted, setMounted] = useState(false);
	const pageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!mounted || typeof window === "undefined") return;

		let ctx: any;

		const initGSAP = async () => {
			try {
				const gsapModule = await import("gsap");
				const { ScrollTrigger } = await import("gsap/ScrollTrigger");
				const gsap = gsapModule.default;

				gsap.registerPlugin(ScrollTrigger);

				ctx = gsap.context(() => {
					// Hero title animation
					gsap.fromTo(
						".hero-title",
						{ opacity: 0, y: 40 },
						{
							opacity: 1,
							y: 0,
							duration: 0.8,
							ease: "power3.out",
							delay: 0.3,
						},
					);

					gsap.fromTo(
						".hero-description",
						{ opacity: 0, y: 30 },
						{
							opacity: 1,
							y: 0,
							duration: 0.6,
							ease: "power3.out",
							delay: 0.5,
						},
					);

					// Content section animations
					gsap.fromTo(
						".content-image",
						{ opacity: 0, x: -60 },
						{
							opacity: 1,
							x: 0,
							duration: 0.8,
							ease: "power3.out",
							scrollTrigger: {
								trigger: ".content-section",
								start: "top 70%",
							},
						},
					);

					gsap.fromTo(
						".content-text",
						{ opacity: 0, x: 60 },
						{
							opacity: 1,
							x: 0,
							duration: 0.8,
							ease: "power3.out",
							scrollTrigger: {
								trigger: ".content-section",
								start: "top 70%",
							},
						},
					);

					// Features animation
					gsap.fromTo(
						".feature-item",
						{ opacity: 0, y: 30 },
						{
							opacity: 1,
							y: 0,
							duration: 0.5,
							stagger: 0.1,
							ease: "power3.out",
							scrollTrigger: {
								trigger: ".features-section",
								start: "top 75%",
							},
						},
					);

					// CTA animation
					gsap.fromTo(
						".cta-content",
						{ opacity: 0, y: 60 },
						{
							opacity: 1,
							y: 0,
							duration: 0.8,
							ease: "power3.out",
							scrollTrigger: {
								trigger: ".cta-section",
								start: "top 70%",
							},
						},
					);

					// Decorative circle rotation
					gsap.to(".decorative-curve", {
						rotation: 360,
						duration: 80,
						repeat: -1,
						ease: "none",
					});
				}, pageRef);
			} catch (error) {
				console.warn("GSAP animation failed");
			}
		};

		initGSAP();
		return () => {
			if (ctx) ctx.revert();
		};
	}, [mounted]);

	return (
		<div ref={pageRef} className="bg-[#1a2634] min-h-screen">
			{/* Hero Section - Rounded Card like  Page */}
			<section className="hero-section px-4 lg:px-6 pt-4 lg:pt-6">
				{/* Hero Card Container */}
				<div className="relative rounded-[30px] lg:rounded-[40px] overflow-hidden min-h-[50vh] lg:min-h-[60vh]">
					{/* Image Grid Background */}
					<div className="absolute inset-0 flex">
						{heroImages.map((image, i) => (
							<div key={i} className="flex-1 relative overflow-hidden">
								<img
									src={image}
									alt={`Bathroom ${i + 1}`}
									className="w-full h-full object-cover"
								/>
							</div>
						))}
					</div>

					{/* Navbar inside hero - on top of images */}
					<div className="relative z-20 pt-6 lg:pt-8">
						<div className="max-w-7xl mx-auto px-6 lg:px-12">
							<div className="flex items-center justify-between h-16 lg:h-20">
								{/* Logo */}
								<Link
									href="/"
									className="font-['Playfair_Display'] text-xl lg:text-2xl font-bold text-white tracking-wide">
									AQUAFIX
								</Link>

								{/* Desktop Nav - White pill */}
								<div className="hidden lg:flex items-center">
									<NavPill />
								</div>

								{/* Contact Button */}
								<div className="hidden lg:block">
									<Link
										href="/contact"
										className="bg-[#1e2a36] text-white px-7 py-3 rounded-full text-sm font-medium hover:bg-[#2a3a4a] transition-colors">
										contact
									</Link>
								</div>

								{/* Mobile Menu Button */}
								<MobileMenuButton />
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Title Section - Below Hero Card */}
			<section className="title-section bg-[#1a2634] py-16 lg:py-24 relative overflow-hidden">
				{/* Decorative curved lines - BERB wave style */}
				<div className="decorative-curve absolute right-0 top-0 bottom-0 w-[500px] lg:w-[700px] pointer-events-none overflow-hidden">
					<svg
						viewBox="0 0 400 600"
						fill="none"
						className="absolute right-[-100px] top-1/2 -translate-y-1/2 w-[400px] h-[600px] lg:w-[500px] lg:h-[800px]"
						preserveAspectRatio="none">
						<path
							d="M 400 0 Q 100 300 400 600"
							stroke="white"
							strokeWidth="1"
							strokeOpacity="0.12"
							fill="none"
						/>
						<path
							d="M 450 0 Q 150 300 450 600"
							stroke="white"
							strokeWidth="1"
							strokeOpacity="0.08"
							fill="none"
						/>
						<path
							d="M 500 0 Q 200 300 500 600"
							stroke="white"
							strokeWidth="1"
							strokeOpacity="0.05"
							fill="none"
						/>
					</svg>
				</div>

				<div className="max-w-7xl mx-auto px-6 lg:px-12">
					<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-16">
						{/* Title */}
						<h1 className="hero-title font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white">
							SANITARY
						</h1>

						{/* Description */}
						<p className="hero-description text-white/70 text-base lg:text-lg max-w-md leading-relaxed">
							we are a certified company & provide best plumbing services
							for you & your company.
						</p>

						{/* Learn More Link */}
						<a
							href="#content"
							className="group inline-flex items-center gap-2 text-white font-medium">
							<span className="border-b border-white/50 group-hover:border-white transition-colors">
								learn more
							</span>
							<ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
						</a>
					</div>
				</div>
			</section>

			{/* Content Section - Image Left, Text Right */}
			<section
				id="content"
				className="content-section bg-[#1a2634] py-16 lg:py-24">
				<div className="max-w-7xl mx-auto px-6 lg:px-12">
					<div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
						{/* Image */}
						<div className="content-image lg:w-1/2">
							<div className="rounded-[30px] overflow-hidden">
								<img
									src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=2076&auto=format&fit=crop"
									alt="Modern bathroom interior"
									className="w-full h-[400px] lg:h-[600px] object-cover"
								/>
							</div>
						</div>

						{/* Text */}
						<div className="content-text lg:w-1/2">
							<p className="text-white text-lg lg:text-xl leading-relaxed font-medium">
								Would you like a new bathroom? Or would you like to
								carry out a long-overdue modernization? In us you will
								find a competent and reliable partner.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="features-section bg-[#1a2634] py-16 lg:py-24">
				<div className="max-w-7xl mx-auto px-6 lg:px-12">
					<div className="space-y-0">
						{features.map((feature, i) => (
							<div
								key={i}
								className="feature-item py-6 border-b border-white/10 first:border-t">
								<div className="flex items-center gap-4">
									<span className="w-2 h-2 bg-white rounded-full flex-shrink-0" />
									<p className="text-white text-lg lg:text-2xl font-medium">
										{feature}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section - Parallax "Your Plumbing Company" */}
			<section className="cta-section bg-[#1a2634] py-6 lg:py-8">
				<div className="px-4 lg:px-6">
					{/* CTA Card - clip-path creates rounded window for fixed background */}
					<div
						className="cta-parallax-container relative min-h-[500px] lg:min-h-[600px] flex items-center"
						style={{
							clipPath: "inset(0 round 30px)",
							backgroundImage: `url('https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1887&auto=format&fit=crop')`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							backgroundAttachment: "fixed",
						}}>
						{/* Content - overlaid on left side */}
						<div className="cta-content relative z-10 w-full">
							<div className="max-w-7xl mx-auto px-8 lg:px-16 py-16 lg:py-24 w-full">
								<div className="max-w-md">
									<h2 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl text-[#1a2634] mb-6 italic">
										Your Plumbing company
									</h2>
									<p className="text-[#1a2634]/70 text-base lg:text-lg leading-relaxed mb-8">
										As your plumbing company, we have all the
										important information for your remodeled bathroom.
										From planning to execution, we're with you every
										step.
									</p>
									<Link
										href="/contact"
										className="group inline-flex items-center gap-3 bg-[#1a2634] text-white px-8 py-4 rounded-full font-medium hover:bg-[#2a3a4a] transition-all duration-300 hover:shadow-xl hover:shadow-[#1a2634]/20 hover:-translate-y-1">
										<span>get in touch</span>
										<ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Additional Services Section */}
			<section className="services-section bg-[#1a2634] py-16 lg:py-24">
				<div className="max-w-7xl mx-auto px-6 lg:px-12">
					<h2 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl text-white italic mb-16">
						Our Sanitary Services
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[
							{
								title: "Bathroom Design",
								description:
									"Custom bathroom layouts tailored to your space and lifestyle needs.",
								image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2069&auto=format&fit=crop",
							},
							{
								title: "Fixture Installation",
								description:
									"Professional installation of sinks, toilets, showers, and bathtubs.",
								image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
							},
							{
								title: "Pipe & Drainage",
								description:
									"Complete plumbing solutions for new builds and renovations.",
								image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop",
							},
						].map((service, i) => (
							<div key={i} className="group cursor-pointer">
								<div className="rounded-[30px] overflow-hidden mb-6">
									<img
										src={service.image}
										alt={service.title}
										className="w-full h-[250px] object-cover group-hover:scale-105 transition-transform duration-700"
									/>
								</div>
								<h3 className="font-['Playfair_Display'] text-xl lg:text-2xl text-white mb-3">
									{service.title}
								</h3>
								<p className="text-white/50 text-sm lg:text-base leading-relaxed">
									{service.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
