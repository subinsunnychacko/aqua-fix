"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

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
			<div className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 tabular-nums">
				{count}
				{suffix && <span className="text-white/50">{suffix}</span>}
			</div>
			<div className="text-white/40 text-xs uppercase tracking-[0.25em]">
				{label}
			</div>
		</div>
	);
}

/* ---------------- DATA ---------------- */

const stats = [
	{ value: 2015, label: "FOUNDED", suffix: "", isYear: true },
	{ value: 8, label: "TEAM MEMBERS", suffix: "", isYear: false },
	{ value: 500, label: "PROJECTS", suffix: "+", isYear: false },
	{ value: 100, label: "HAPPY CLIENTS", suffix: "%", isYear: false },
];

const values = [
	{
		title: "Quality First",
		description:
			"We never compromise on quality. Every project receives the same level of attention and craftsmanship.",
	},
	{
		title: "Customer Focus",
		description:
			"Your satisfaction is our priority. We listen, understand, and deliver solutions tailored to your needs.",
	},
	{
		title: "Reliability",
		description:
			"When we make a commitment, we keep it. Punctual, professional, and dependable service every time.",
	},
	{
		title: "Innovation",
		description:
			"We stay current with the latest technologies and methods to provide the best solutions available.",
	},
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
];

const timeline = [
	{
		year: "2015",
		title: "Company Founded",
		description:
			"AquaFix was established in Vancouver with a mission to provide exceptional plumbing services.",
	},
	{
		year: "2017",
		title: "Expanded Services",
		description:
			"Added heating and drainage services to meet growing customer demand.",
	},
	{
		year: "2020",
		title: "Green Initiative",
		description:
			"Launched our solar and sustainable energy division for eco-conscious customers.",
	},
	{
		year: "2023",
		title: "500+ Projects",
		description:
			"Reached milestone of completing over 500 successful projects across Vancouver.",
	},
];

/* ---------------- MAIN COMPONENT ---------------- */

export default function AboutPage() {
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

					// Story section animation
					gsap.fromTo(
						".story-image",
						{ opacity: 0, x: -60 },
						{
							opacity: 1,
							x: 0,
							duration: 0.8,
							ease: "power3.out",
							scrollTrigger: {
								trigger: ".story-section",
								start: "top 70%",
							},
						},
					);

					gsap.fromTo(
						".story-content",
						{ opacity: 0, x: 60 },
						{
							opacity: 1,
							x: 0,
							duration: 0.8,
							ease: "power3.out",
							scrollTrigger: {
								trigger: ".story-section",
								start: "top 70%",
							},
						},
					);

					// Stats animation
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

					// Values animation
					gsap.fromTo(
						".value-card",
						{ opacity: 0, y: 40 },
						{
							opacity: 1,
							y: 0,
							duration: 0.6,
							stagger: 0.1,
							ease: "power3.out",
							scrollTrigger: {
								trigger: ".values-section",
								start: "top 75%",
							},
						},
					);

					// Timeline animation
					gsap.fromTo(
						".timeline-item",
						{ opacity: 0, x: -40 },
						{
							opacity: 1,
							x: 0,
							duration: 0.6,
							stagger: 0.15,
							ease: "power3.out",
							scrollTrigger: {
								trigger: ".timeline-section",
								start: "top 75%",
							},
						},
					);

					// Team animation
					gsap.fromTo(
						".team-member",
						{ opacity: 0, x: -40 },
						{
							opacity: 1,
							x: 0,
							duration: 0.5,
							stagger: 0.08,
							ease: "power3.out",
							scrollTrigger: {
								trigger: ".team-section",
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

					// Decorative curve rotation
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
			{/* Hero Section - Rounded Card */}
			<section className="hero-section px-4 lg:px-6 pt-4 lg:pt-6">
				{/* Hero Card Container */}
				<div className="relative rounded-[30px] lg:rounded-[40px] overflow-hidden min-h-[50vh] lg:min-h-[60vh]">
					{/* Background Image */}
					<div className="absolute inset-0">
						<img
							src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop"
							alt="Plumbing team at work"
							className="w-full h-full object-cover"
						/>
						{/* Overlay */}
						<div className="absolute inset-0 bg-gradient-to-r from-[#1a2634]/70 via-[#1a2634]/40 to-transparent" />
					</div>

					{/* Navbar inside hero */}
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

			{/* Title Section */}
			<section className="title-section bg-[#1a2634] py-16 lg:py-24 relative overflow-hidden">
				{/* Decorative curved lines */}
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
							ABOUT US
						</h1>

						{/* Description */}
						<p className="hero-description text-white/70 text-base lg:text-lg max-w-md leading-relaxed">
							since 2015, we've been Vancouver's trusted partner for
							plumbing, heating, drainage, and solar solutions.
						</p>
					</div>
				</div>
			</section>

			{/* Story Section */}
			<section className="story-section bg-[#1a2634] py-16 lg:py-24">
				<div className="max-w-7xl mx-auto px-6 lg:px-12">
					<div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
						{/* Image */}
						<div className="story-image lg:w-1/2">
							<div className="rounded-[30px] overflow-hidden">
								<img
									src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop"
									alt="Our team at work"
									className="w-full h-[400px] lg:h-[550px] object-cover"
								/>
							</div>
						</div>

						{/* Content */}
						<div className="story-content lg:w-1/2">
							<h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-white italic mb-6">
								Our Story
							</h2>
							<p className="text-white/70 text-base lg:text-lg leading-relaxed mb-6">
								AquaFix was founded in 2015 with a simple mission: to
								provide Vancouver homeowners and businesses with
								reliable, high-quality plumbing services they can trust.
							</p>
							<p className="text-white/70 text-base lg:text-lg leading-relaxed mb-6">
								What started as a small team of dedicated plumbers has
								grown into a full-service company offering sanitary,
								heating, drainage, and solar solutions. Our growth is
								built on a foundation of exceptional workmanship and
								customer satisfaction.
							</p>
							<p className="text-white/70 text-base lg:text-lg leading-relaxed">
								Today, we're proud to serve hundreds of clients across
								Vancouver, maintaining the same commitment to quality
								and service that defined us from day one.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section
				ref={statsRef}
				className="stats-section bg-[#1a2634] py-16 lg:py-24 border-y border-white/10">
				<div className="max-w-7xl mx-auto px-6 lg:px-12">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
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
				</div>
			</section>

			{/* Values Section */}
			<section className="values-section bg-[#1a2634] py-16 lg:py-24">
				<div className="max-w-7xl mx-auto px-6 lg:px-12">
					<div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
						{/* Left - Title */}
						<div className="lg:w-1/3">
							<h2 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl text-white italic lg:sticky lg:top-32">
								Our Values
							</h2>
						</div>

						{/* Right - Values Grid */}
						<div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
							{values.map((value, i) => (
								<div
									key={i}
									className="value-card p-8 border border-white/10 rounded-[20px] hover:border-white/20 transition-colors">
									<h3 className="font-['Playfair_Display'] text-xl lg:text-2xl text-white mb-4">
										{value.title}
									</h3>
									<p className="text-white/50 text-sm lg:text-base leading-relaxed">
										{value.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Timeline Section */}
			<section className="timeline-section bg-[#1a2634] py-16 lg:py-24">
				<div className="max-w-7xl mx-auto px-6 lg:px-12">
					<h2 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl text-white italic mb-16">
						Our Journey
					</h2>

					<div className="space-y-0">
						{timeline.map((item, i) => (
							<div
								key={i}
								className="timeline-item flex gap-8 lg:gap-16 py-8 border-b border-white/10 first:border-t">
								<div className="flex-shrink-0 w-20 lg:w-32">
									<span className="font-['Playfair_Display'] text-3xl lg:text-4xl text-white/30">
										{item.year}
									</span>
								</div>
								<div>
									<h3 className="font-['Playfair_Display'] text-xl lg:text-2xl text-white mb-2">
										{item.title}
									</h3>
									<p className="text-white/50 text-sm lg:text-base leading-relaxed">
										{item.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className="team-section bg-[#1a2634] py-16 lg:py-24">
				<div className="max-w-7xl mx-auto px-6 lg:px-12">
					<h2 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl text-white italic mb-16">
						Meet Our Team
					</h2>

					<div className="flex flex-col lg:flex-row lg:gap-20">
						{/* Team List - Left Side */}
						<div className="lg:w-[55%]">
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
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section - Parallax */}
			<section className="cta-section bg-[#1a2634] py-6 lg:py-8">
				<div className="px-4 lg:px-6">
					<div
						className="cta-parallax-container relative min-h-[500px] lg:min-h-[600px] flex items-center"
						style={{
							clipPath: "inset(0 round 30px)",
							backgroundImage: `url('https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1887&auto=format&fit=crop')`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							backgroundAttachment: "fixed",
						}}>
						<div className="cta-content relative z-10 w-full">
							<div className="max-w-7xl mx-auto px-8 lg:px-16 py-16 lg:py-24 w-full">
								<div className="max-w-md">
									<h2 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl text-[#1a2634] mb-6 italic">
										Ready to work with us?
									</h2>
									<p className="text-[#1a2634]/70 text-base lg:text-lg leading-relaxed mb-8">
										Join hundreds of satisfied customers who trust
										AquaFix for all their plumbing, heating, drainage,
										and solar needs. Contact us today for a free
										consultation.
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

			{/* Bottom Spacer */}
			<section className="bg-[#1a2634] py-8" />
		</div>
	);
}
