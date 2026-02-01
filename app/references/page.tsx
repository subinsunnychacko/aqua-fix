"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

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

/* ---------------- CAROUSEL COMPONENT ---------------- */

interface CarouselProps {
	images: string[];
	category: string;
}

function CategoryCarousel({ images, category }: CarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);

	const nextSlide = () => {
		if (isAnimating) return;
		setIsAnimating(true);
		setCurrentIndex((prev) => (prev + 1) % Math.max(1, images.length - 2));
		setTimeout(() => setIsAnimating(false), 500);
	};

	const prevSlide = () => {
		if (isAnimating) return;
		setIsAnimating(true);
		setCurrentIndex(
			(prev) =>
				(prev - 1 + Math.max(1, images.length - 2)) %
				Math.max(1, images.length - 2),
		);
		setTimeout(() => setIsAnimating(false), 500);
	};

	// Get visible images (3 at a time)
	const getVisibleImages = () => {
		const visible = [];
		for (let i = 0; i < 3; i++) {
			const index = (currentIndex + i) % images.length;
			visible.push(images[index]);
		}
		return visible;
	};

	const visibleImages = getVisibleImages();

	return (
		<div className="category-carousel">
			<div className="flex gap-4 lg:gap-6">
				{/* Vertical Category Label */}
				<div className="flex-shrink-0 w-16 lg:w-24 flex items-center justify-center">
					<span
						className="font-['Playfair_Display'] text-white text-xl lg:text-2xl font-bold tracking-wider whitespace-nowrap"
						style={{
							writingMode: "vertical-rl",
							transform: "rotate(180deg)",
						}}>
						{category}
					</span>
				</div>

				{/* Images Container */}
				<div className="flex-1 overflow-hidden">
					<div className="flex gap-4 lg:gap-6 transition-transform duration-500 ease-out">
						{visibleImages.map((image, i) => (
							<div
								key={`${currentIndex}-${i}`}
								className="flex-shrink-0 w-[calc(33.333%-1rem)] lg:w-[calc(33.333%-1.5rem)]">
								<div className="relative rounded-[20px] lg:rounded-[30px] overflow-hidden group cursor-pointer">
									<img
										src={image}
										alt={`${category} project ${i + 1}`}
										className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
									/>
									{/* Hover overlay */}
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
				</div>
			</div>

			{/* Navigation Arrows */}
			<div className="flex items-center gap-4 mt-8 ml-16 lg:ml-24">
				<button
					onClick={prevSlide}
					className="text-white/50 hover:text-white transition-colors p-2"
					aria-label="Previous slide">
					<ArrowLeft className="w-6 h-6" />
				</button>
				<button
					onClick={nextSlide}
					className="text-white/50 hover:text-white transition-colors p-2"
					aria-label="Next slide">
					<ArrowRight className="w-6 h-6" />
				</button>
			</div>
		</div>
	);
}

/* ---------------- DATA ---------------- */

const heroImages = [
	"https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1887&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2069&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
];

const sanitaryImages = [
	"https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1887&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2069&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=2076&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1887&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
];

const heatingImages = [
	"https://images.unsplash.com/photo-1585128792020-803d29415281?q=80&w=2070&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2032&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1613323593608-abc90fec84ff?q=80&w=2070&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?q=80&w=2070&auto=format&fit=crop",
];

const drainageImages = [
	"https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2070&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1887&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
];

/* ---------------- MAIN COMPONENT ---------------- */

export default function PortfolioPage() {
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
					// Hero image animation
					gsap.fromTo(
						".hero-image",
						{ opacity: 0, scale: 1.05 },
						{
							opacity: 1,
							scale: 1,
							duration: 1,
							ease: "power3.out",
							stagger: 0.1,
						},
					);

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

					// Category carousels animation
					gsap.fromTo(
						".category-carousel",
						{ opacity: 0, y: 60 },
						{
							opacity: 1,
							y: 0,
							duration: 0.8,
							stagger: 0.2,
							ease: "power3.out",
							scrollTrigger: {
								trigger: ".categories-section",
								start: "top 80%",
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

					// Decorative curve movement
					gsap.to(".decorative-curve svg", {
						rotation: 5,
						duration: 10,
						repeat: -1,
						yoyo: true,
						ease: "sine.inOut",
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
			{/* Hero Section - Rounded Card with 3 Images */}
			<section className="hero-section px-4 lg:px-6 pt-4 lg:pt-6">
				{/* Hero Card Container */}
				<div className="relative rounded-[30px] lg:rounded-[40px] overflow-hidden min-h-[50vh] lg:min-h-[55vh]">
					{/* Image Grid Background */}
					<div className="absolute inset-0 flex">
						{heroImages.map((image, i) => (
							<div key={i} className="flex-1 relative overflow-hidden">
								<img
									src={image}
									alt={`Reference ${i + 1}`}
									className="hero-image w-full h-full object-cover"
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
					<h1 className="hero-title font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white">
						REFERENCES
					</h1>
				</div>
			</section>

			{/* Category Carousels Section */}
			<section className="categories-section bg-[#1a2634] py-8 lg:py-16">
				<div className="max-w-[1600px] mx-auto px-4 lg:px-8">
					{/* Sanitary Carousel */}
					<div className="mb-16 lg:mb-24">
						<CategoryCarousel
							images={sanitaryImages}
							category="SANITARY"
						/>
					</div>

					{/* Heating Carousel */}
					<div className="mb-16 lg:mb-24">
						<CategoryCarousel images={heatingImages} category="HEATING" />
					</div>

					{/* Drainage Carousel */}
					<div className="mb-8">
						<CategoryCarousel
							images={drainageImages}
							category="DRAINAGE"
						/>
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
								<div className="max-w-lg">
									<h2 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl text-[#1a2634] mb-6 italic">
										Your Plumbing company
									</h2>
									<p className="text-[#1a2634]/70 text-base lg:text-lg leading-relaxed mb-8">
										We are the professionals when it comes to plumbing
										systems. Our competent employees install complete
										systems quickly and reliably. With us you can
										trust in brand quality. Our services for you in
										the field of plumbing technology:
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
		</div>
	);
}
