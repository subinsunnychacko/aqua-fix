"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";

/* ---------------- DATA ---------------- */

const stats = [
	{ value: 2015, label: "FOUNDED", suffix: "", isYear: true },
	{ value: 8, label: "TEAM MEMBERS", suffix: "", isYear: false },
	{ value: 500, label: "PROJECTS", suffix: "+", isYear: false },
	{ value: 100, label: "HAPPY CLIENTS", suffix: "%", isYear: false },
];

const services = [
	{
		id: "emergency",
		title: "emergency",
		description:
			"Burst pipes, leaks, or flooding? Our 24/7 emergency team responds fast to minimize damage and restore your plumbing system quickly.",
		image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
	},
	{
		id: "heating",
		title: "heating",
		description:
			"From water heater installation to radiant floor heating, we ensure your home stays warm and comfortable year-round with energy-efficient solutions.",
		image: "https://images.unsplash.com/photo-1585128792020-803d29415281?q=80&w=2070&auto=format&fit=crop",
	},
	{
		id: "drainage",
		title: "drainage",
		description:
			"Professional drain cleaning, hydro jetting, and sewer line repairs. We clear blockages and prevent future clogs with modern technology.",
		image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop",
	},
];

const references = [
	"https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1887&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2069&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=2076&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1887&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1604709177225-055f99402ea3?q=80&w=2070&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?q=80&w=2070&auto=format&fit=crop",
];

const team = [
	{
		name: "Michael Thompson",
		role: "CEO / MASTER PLUMBER",
		image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
	},
	{
		name: "David Chen",
		role: "MASTER PLUMBER",
		image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
	},
	{
		name: "Sarah Williams",
		role: "SERVICE MANAGER",
		image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
	},
	{
		name: "James Rodriguez",
		role: "SENIOR TECHNICIAN",
		image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
	},
	{
		name: "Emily Parker",
		role: "APPRENTICE PLUMBER",
		image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
	},
];

const testimonials = [
	{
		title: "Outstanding Service",
		text: "AquaFix responded to our emergency call within 30 minutes. Professional, efficient, and fair pricing. They fixed our burst pipe and even cleaned up afterward.",
		name: "Jennifer Walsh",
		role: "private customer",
		image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
	},
	{
		title: "Excellent Work",
		text: "We hired AquaFix for a complete bathroom renovation. The team was knowledgeable, punctual, and delivered exceptional quality work.",
		name: "Robert Martinez",
		role: "private customer",
		image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
	},
	{
		title: "Top Service",
		text: "As a property manager, I need reliable plumbers. AquaFix has become our go-to team for all maintenance and emergencies.",
		name: "Amanda Chen",
		role: "property manager",
		image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
	},
	{
		title: "Very Professional",
		text: "Had a complex drainage issue that other plumbers couldn't solve. AquaFix diagnosed and fixed it in one visit. Highly recommend!",
		name: "Thomas Anderson",
		role: "private customer",
		image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
	},
];

/* ---------------- COUNTER HOOK ---------------- */

function useCountUp(
	end: number,
	duration: number = 2000,
	startCounting: boolean = false,
	isYear: boolean = false,
) {
	const [count, setCount] = useState(isYear ? end : 0);

	useEffect(() => {
		if (!startCounting) {
			setCount(isYear ? end : 0);
			return;
		}

		if (isYear) {
			setCount(end);
			return;
		}

		let startTime: number | null = null;
		let animationFrame: number;

		const animate = (timestamp: number) => {
			if (!startTime) startTime = timestamp;
			const progress = Math.min((timestamp - startTime) / duration, 1);
			const easeOutQuart = 1 - Math.pow(1 - progress, 4);
			setCount(Math.floor(easeOutQuart * end));

			if (progress < 1) {
				animationFrame = requestAnimationFrame(animate);
			}
		};

		animationFrame = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(animationFrame);
	}, [end, duration, startCounting, isYear]);

	return count;
}

/* ---------------- STAT COUNTER COMPONENT ---------------- */

function StatCounter({
	value,
	label,
	suffix,
	isYear,
	startCounting,
}: {
	value: number;
	label: string;
	suffix: string;
	isYear: boolean;
	startCounting: boolean;
}) {
	const count = useCountUp(value, 2500, startCounting, isYear);

	return (
		<div className="stat-item text-center">
			<div className="font-['Playfair_Display'] text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 tabular-nums">
				{count}
				{suffix && <span className="text-white/50">{suffix}</span>}
			</div>
			<div className="text-white/40 text-xs uppercase tracking-[0.25em]">
				{label}
			</div>
		</div>
	);
}

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
		{ href: "/heating", label: "heating" },
		{ href: "/drainage", label: "drainage" },
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

/* ---------------- MAIN COMPONENT ---------------- */

export default function Home() {
	const [mounted, setMounted] = useState(false);
	const [statsInView, setStatsInView] = useState(false);
	const [hoveredTeamMember, setHoveredTeamMember] = useState<number>(0);
	const pageRef = useRef<HTMLDivElement>(null);
	const statsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Intersection Observer for stats counting
	useEffect(() => {
		if (!mounted || !statsRef.current) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !statsInView) {
						setStatsInView(true);
					}
				});
			},
			{ threshold: 0.3 },
		);

		observer.observe(statsRef.current);
		return () => observer.disconnect();
	}, [mounted, statsInView]);

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
					// Hero animations
					const heroTitle = document.querySelector(".hero-title");
					if (heroTitle) {
						const words = heroTitle.querySelectorAll(".word");
						gsap.fromTo(
							words,
							{ opacity: 0, y: 60 },
							{
								opacity: 1,
								y: 0,
								duration: 0.8,
								stagger: 0.08,
								ease: "power3.out",
								delay: 0.2,
							},
						);
					}

					gsap.fromTo(
						".hero-description",
						{ opacity: 0, y: 30 },
						{
							opacity: 1,
							y: 0,
							duration: 0.6,
							ease: "power3.out",
							delay: 0.6,
						},
					);

					gsap.fromTo(
						".hero-buttons",
						{ opacity: 0, y: 20 },
						{
							opacity: 1,
							y: 0,
							duration: 0.5,
							ease: "power3.out",
							delay: 0.8,
						},
					);

					gsap.fromTo(
						".hero-image-container",
						{ opacity: 0, x: 60 },
						{
							opacity: 1,
							x: 0,
							duration: 1,
							ease: "power3.out",
							delay: 0.3,
						},
					);

					// Stats animations
					gsap.fromTo(
						".stat-item",
						{ opacity: 0, y: 40 },
						{
							opacity: 1,
							y: 0,
							duration: 0.6,
							stagger: 0.1,
							ease: "power3.out",
							scrollTrigger: {
								trigger: ".stats-section",
								start: "top 80%",
							},
						},
					);

					// Decorative circles rotation
					gsap.to(".decorative-circles", {
						rotation: 360,
						duration: 80,
						repeat: -1,
						ease: "none",
					});

					// About section
					gsap.fromTo(
						".about-title",
						{ opacity: 0, x: -60 },
						{
							opacity: 1,
							x: 0,
							duration: 0.8,
							ease: "power3.out",
							scrollTrigger: {
								trigger: ".about-section",
								start: "top 75%",
							},
						},
					);

					gsap.fromTo(
						".about-text",
						{ opacity: 0, y: 30 },
						{
							opacity: 1,
							y: 0,
							duration: 0.6,
							ease: "power3.out",
							scrollTrigger: {
								trigger: ".about-section",
								start: "top 70%",
							},
						},
					);

					// Services
					gsap.fromTo(
						".services-title",
						{ opacity: 0, y: 40 },
						{
							opacity: 1,
							y: 0,
							duration: 0.6,
							ease: "power3.out",
							scrollTrigger: {
								trigger: ".services-section",
								start: "top 80%",
							},
						},
					);

					document
						.querySelectorAll(".service-item")
						.forEach((item, index) => {
							const direction = index % 2 === 0 ? -60 : 60;

							gsap.fromTo(
								item.querySelector(".service-image"),
								{ opacity: 0, x: direction },
								{
									opacity: 1,
									x: 0,
									duration: 0.8,
									ease: "power3.out",
									scrollTrigger: { trigger: item, start: "top 80%" },
								},
							);

							gsap.fromTo(
								item.querySelector(".service-content"),
								{ opacity: 0, x: -direction },
								{
									opacity: 1,
									x: 0,
									duration: 0.8,
									ease: "power3.out",
									scrollTrigger: { trigger: item, start: "top 80%" },
								},
							);
						});

					// References - Dual Column Parallax Effect
					gsap.fromTo(
						".references-title",
						{ opacity: 0, y: 40 },
						{
							opacity: 1,
							y: 0,
							duration: 0.8,
							ease: "power3.out",
							scrollTrigger: {
								trigger: ".references-section",
								start: "top 70%",
							},
						},
					);

					// Left column - scrolls faster (moves up more)
					gsap.to(".left-column", {
						yPercent: -15,
						ease: "none",
						scrollTrigger: {
							trigger: ".references-section",
							start: "top bottom",
							end: "bottom top",
							scrub: 1,
						},
					});

					// Right column - scrolls slower (moves up less)
					gsap.to(".right-column", {
						yPercent: -5,
						ease: "none",
						scrollTrigger: {
							trigger: ".references-section",
							start: "top bottom",
							end: "bottom top",
							scrub: 1,
						},
					});

					// Individual image animations on scroll
					document
						.querySelectorAll(".left-image, .right-image")
						.forEach((image) => {
							gsap.fromTo(
								image,
								{ opacity: 0, y: 60 },
								{
									opacity: 1,
									y: 0,
									duration: 0.8,
									ease: "power3.out",
									scrollTrigger: {
										trigger: image,
										start: "top 90%",
									},
								},
							);
						});

					// CTA - Premium animations
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

					// Team
					gsap.fromTo(
						".team-member",
						{ opacity: 0, x: -40 },
						{
							opacity: 1,
							x: 0,
							duration: 0.5,
							stagger: 0.08,
							ease: "power3.out",
							scrollTrigger: { trigger: ".team-list", start: "top 75%" },
						},
					);

					// Testimonials
					gsap.fromTo(
						".testimonial-card",
						{ opacity: 0, y: 50 },
						{
							opacity: 1,
							y: 0,
							duration: 0.6,
							stagger: 0.1,
							ease: "power3.out",
							scrollTrigger: {
								trigger: ".testimonials-grid",
								start: "top 80%",
							},
						},
					);

					// Scroll indicator
					gsap.to(".scroll-indicator", {
						y: 8,
						duration: 0.8,
						repeat: -1,
						yoyo: true,
						ease: "power1.inOut",
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
		<div ref={pageRef} className="bg-white overflow-hidden">
			{/* Hero + Stats Wrapper with Dark Background */}
			<div className="bg-[#1a2634]">
				{/* Hero Section - Rounded Card with Full Image */}
				<section className="hero-section px-4 lg:px-6 pt-4 lg:pt-6">
					{/* Hero Card Container */}
					<div className="relative rounded-[30px] lg:rounded-[40px] overflow-hidden min-h-[75vh] lg:min-h-[85vh]">
						{/* Full Background Image */}
						<div className="absolute inset-0">
							<img
								src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop"
								alt="Modern bathroom with stone basins"
								className="hero-image-container w-full h-full object-cover"
							/>
							{/* Gradient Overlay for text readability */}
							<div className="absolute inset-0 bg-gradient-to-r from-[#4a6670]/95 via-[#4a6670]/70 to-transparent" />
						</div>

						{/* Navbar inside hero - on top of image */}
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

						{/* Hero Content - overlaid on image */}
						<div className="relative z-10 h-full flex items-center">
							<div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 w-full">
								<div className="w-full lg:w-[80%]">
									<h1 className="hero-title font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-8">
										<span className="word inline-block">YOUR</span>{" "}
										<span className="word inline-block">
											PLUMBING
										</span>
										<br />
										<span className="word inline-block">
											SPECIALIST
										</span>
										<br />
										<span className="word inline-block">IN</span>{" "}
										<span className="word inline-block">
											VANCOUVER
										</span>
									</h1>
									<p className="hero-description text-white/80 text-base lg:text-lg mb-10 leading-relaxed max-w-md">
										we are a certified company & provide best plumbing
										services for you & your company.
									</p>
									<div className="hero-buttons flex flex-wrap items-center gap-6">
										<Link
											href="/contact"
											className="bg-[#000] text-white px-8 py-4 rounded-full font-medium hover:bg-[#2d4a5a] transition-colors">
											contact
										</Link>
										<a
											href="#learn-more"
											className="group flex items-center gap-2 text-white font-medium hover:text-white/80 transition-colors">
											Learn more
											<span className="scroll-indicator">
												<ArrowDown className="w-4 h-4" />
											</span>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Stats Section - Same Dark Background */}
				<section className="stats-section py-20 lg:py-28 relative overflow-hidden">
					{/* Decorative circles - Large and visible like BERB */}
					<div className="decorative-circles absolute right-[-300px] lg:right-[-150px] top-[60%] -translate-y-1/2 pointer-events-none">
						<svg
							width="1000"
							height="1000"
							viewBox="0 0 1000 1000"
							fill="none"
							className="w-[600px] h-[600px] lg:w-[1000px] lg:h-[1000px]">
							<circle
								cx="500"
								cy="500"
								r="480"
								stroke="white"
								strokeWidth="1"
								strokeOpacity="0.12"
							/>
							<circle
								cx="500"
								cy="500"
								r="380"
								stroke="white"
								strokeWidth="1"
								strokeOpacity="0.1"
							/>
							<circle
								cx="500"
								cy="500"
								r="280"
								stroke="white"
								strokeWidth="1"
								strokeOpacity="0.08"
							/>
							<circle
								cx="500"
								cy="500"
								r="180"
								stroke="white"
								strokeWidth="1"
								strokeOpacity="0.06"
							/>
						</svg>
					</div>

					<div ref={statsRef} className="max-w-7xl mx-auto px-6 lg:px-12">
						{/* Stats Grid */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-24">
							{stats.map((stat, i) => (
								<StatCounter
									key={i}
									value={stat.value}
									label={stat.label}
									suffix={stat.suffix}
									isYear={stat.isYear}
									startCounting={statsInView}
								/>
							))}
						</div>

						{/* About Content */}
						<div id="learn-more" className="about-section relative">
							<div className="max-w-2xl">
								<h2 className="about-title font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl text-white italic mb-8">
									emergency / heating / drainage
								</h2>
								<p className="about-text text-white/50 text-base lg:text-lg leading-relaxed mb-8">
									The company is a master plumbing business founded in
									2015 in Vancouver. Our team of certified
									professionals is specialized in all modern
									technologies around plumbing, heating, and drainage
									systems.
								</p>
								<Link
									href="/contact"
									className="about-button inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-[#1a2634] transition-all duration-300">
									<span>make appointment now</span>
								</Link>
							</div>
						</div>
					</div>
				</section>
			</div>

			{/* Services Section */}
			<section className="services-section bg-[#1a2634] py-24">
				<div className="max-w-7xl mx-auto px-6 lg:px-20">
					<h2 className="services-title font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl text-white mb-20">
						Our Services
					</h2>

					<div className="space-y-0">
						{services.map((service, index) => (
							<div key={service.id}>
								<div
									className={`service-item flex flex-col ${
										index % 2 === 0
											? "lg:flex-row"
											: "lg:flex-row-reverse"
									} gap-10 lg:gap-20 items-center py-16`}>
									{/* Image */}
									<div className="service-image w-full lg:w-2/5">
										<div className="rounded-3xl overflow-hidden">
											<img
												src={service.image}
												alt={service.title}
												className="w-full h-64 lg:h-80 object-cover hover:scale-105 transition-transform duration-700"
											/>
										</div>
									</div>

									{/* Content */}
									<div className="service-content w-full lg:w-3/5">
										<h3 className="font-['Playfair_Display'] text-3xl lg:text-4xl text-white mb-5">
											{service.title}
										</h3>
										<p className="text-white/50 text-base lg:text-lg leading-relaxed mb-6">
											{service.description}
										</p>
										<Link
											href={`/services#${service.id}`}
											className="group inline-flex items-center gap-2 text-white font-medium">
											<span className="border-b border-white/50 group-hover:border-white transition-colors">
												learn more
											</span>
											<ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
										</Link>
									</div>
								</div>

								{index < services.length - 1 && (
									<div className="h-px bg-white/10" />
								)}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* References Section - Dual Column Parallax */}
			<section className="references-section bg-white py-24 overflow-hidden">
				<div className="max-w-7xl mx-auto px-6 lg:px-12">
					{/* Title */}
					<h2 className="references-title font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-[#1a2634] mb-16">
						References
					</h2>

					{/* Two Column Parallax Grid */}
					<div className="flex gap-6 lg:gap-8">
						{/* Left Column - Scrolls Faster */}
						<div className="left-column w-1/2 space-y-6 lg:space-y-8">
							{references
								.filter((_, i) => i % 2 === 0)
								.map((image, i) => (
									<div
										key={i}
										className="left-image group cursor-pointer">
										<div className="relative rounded-[20px] lg:rounded-[30px] overflow-hidden">
											<img
												src={image}
												alt="Reference project"
												className="w-full h-[250px] sm:h-[350px] lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
											/>
											{/* Hover Overlay */}
											<div className="absolute inset-0 bg-[#1a2634]/0 group-hover:bg-[#1a2634]/20 transition-all duration-500 flex items-center justify-center">
												<div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
													<div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
														<ArrowUpRight className="w-5 h-5 text-[#1a2634]" />
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
						</div>

						{/* Right Column - Scrolls Slower (starts lower) */}
						<div className="right-column w-1/2 space-y-6 lg:space-y-8 pt-32 lg:pt-48">
							{references
								.filter((_, i) => i % 2 === 1)
								.map((image, i) => (
									<div
										key={i}
										className="right-image group cursor-pointer">
										<div className="relative rounded-[20px] lg:rounded-[30px] overflow-hidden">
											<img
												src={image}
												alt="Reference project"
												className="w-full h-[250px] sm:h-[350px] lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
											/>
											{/* Hover Overlay */}
											<div className="absolute inset-0 bg-[#1a2634]/0 group-hover:bg-[#1a2634]/20 transition-all duration-500 flex items-center justify-center">
												<div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
													<div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
														<ArrowUpRight className="w-5 h-5 text-[#1a2634]" />
													</div>
												</div>
											</div>
										</div>
									</div>
								))}

							{/* Show More Link - At bottom of right column */}
							<div className="pt-8">
								<Link
									href="/references"
									className="group inline-flex items-center gap-2 text-[#1a2634] font-medium text-lg">
									<span className="border-b border-[#1a2634]/50 group-hover:border-[#1a2634] transition-colors">
										show me more references
									</span>
									<ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section - Fixed Background Parallax */}
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
										How can we help you?
									</h2>
									<p className="text-[#1a2634]/70 text-base lg:text-lg leading-relaxed mb-8">
										Plumbing, Heating & Drainage from Vancouver. With
										us you get services from one source. Let us
										prepare your non-binding offer from us.
									</p>
									<Link
										href="/contact"
										className="group inline-flex items-center gap-3 bg-[#1a2634] text-white px-8 py-4 rounded-full font-medium hover:bg-[#2a3a4a] transition-all duration-300 hover:shadow-xl hover:shadow-[#1a2634]/20 hover:-translate-y-1">
										<span>request offer now</span>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Team Section - BERB Style */}
			<section id="team" className="team-section bg-[#1a2634] py-24">
				<div className="max-w-7xl mx-auto px-6 lg:px-20">
					<h2 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl text-white italic mb-16">
						Our Team
					</h2>

					<div className="flex flex-col lg:flex-row lg:gap-20">
						{/* Team List - Left Side */}
						<div className="team-list lg:w-[55%]">
							{team.map((member, i) => (
								<div
									key={i}
									className="team-member py-6 cursor-pointer group border-b border-white/10 last:border-b-0"
									onMouseEnter={() => setHoveredTeamMember(i)}>
									<h3 className="font-['Playfair_Display'] text-xl md:text-2xl lg:text-3xl text-white group-hover:text-white/60 transition-colors duration-300">
										{member.name}
									</h3>
									<p className="text-white/30 text-xs uppercase tracking-[0.2em] mt-2">
										{member.role}
									</p>
								</div>
							))}
						</div>

						{/* Team Image - Right Side */}
						<div className="hidden lg:block lg:w-[45%]">
							<div className="sticky top-32">
								<div className="relative w-full max-w-sm ml-auto">
									{/* Image container with rounded corners */}
									<div className="relative rounded-3xl overflow-hidden bg-white/5">
										{team.map((member, i) => (
											<img
												key={i}
												src={member.image}
												alt={member.name}
												className={`w-full h-[450px] object-cover transition-opacity duration-500 ${
													hoveredTeamMember === i
														? "opacity-100"
														: "opacity-0 absolute inset-0"
												}`}
											/>
										))}
										{/* Dark semi-circle overlay at top - BERB style */}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="testimonials-section bg-[#f5f5f5] py-24 rounded-t-[50px] -mt-8 relative z-10">
				<div className="max-w-7xl mx-auto px-6 lg:px-20">
					<div className="flex flex-col lg:flex-row lg:gap-16">
						{/* Title - Left Side */}
						<div className="lg:w-[30%] mb-12 lg:mb-0">
							<h2 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl text-[#1a2634] lg:sticky lg:top-32">
								What People&apos;s Say
							</h2>
						</div>

						{/* Testimonials Grid - Right Side */}
						<div className="testimonials-grid lg:w-[70%]">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{testimonials.map((testimonial, i) => (
									<div
										key={i}
										className={`testimonial-card bg-white rounded-3xl p-6 lg:p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 ${
											i % 2 === 1 ? "md:mt-8" : ""
										}`}>
										<h3 className="font-['Playfair_Display'] text-xl lg:text-2xl text-[#1a2634]/20 mb-4">
											„{testimonial.title}"
										</h3>
										<p className="text-[#1a2634]/60 text-sm leading-relaxed mb-6">
											{testimonial.text}
										</p>
										<div className="flex items-center gap-3">
											<img
												src={testimonial.image}
												alt={testimonial.name}
												className="w-10 h-10 rounded-full object-cover"
											/>
											<div>
												<div className="font-medium text-[#1a2634] text-sm">
													{testimonial.name}
												</div>
												<div className="text-[#1a2634]/40 text-xs">
													{testimonial.role}
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
