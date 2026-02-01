"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MapPin, Mail, Phone, Clock, ArrowUpRight } from "lucide-react";

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

/* ---------------- CONTACT INFO DATA ---------------- */

const contactInfo = [
	{
		icon: MapPin,
		label: "Address",
		value: "123 Waterfront Drive",
		subValue: "Vancouver, BC V6B 1A1",
	},
	{
		icon: Mail,
		label: "Email",
		value: "info@aquafix.ca",
		subValue: "support@aquafix.ca",
	},
	{
		icon: Phone,
		label: "Phone",
		value: "+1 604 123 4567",
		subValue: "+1 604 123 4568",
	},
	{
		icon: Clock,
		label: "Hours",
		value: "Mon - Fri: 8:00 - 18:00",
		subValue: "24/7 Emergency Service",
	},
];

/* ---------------- MAIN COMPONENT ---------------- */

export default function ContactPage() {
	const [mounted, setMounted] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		service: "",
		message: "",
	});
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

					// Contact info animation
					gsap.fromTo(
						".contact-info-item",
						{ opacity: 0, x: -40 },
						{
							opacity: 1,
							x: 0,
							duration: 0.6,
							stagger: 0.1,
							ease: "power3.out",
							scrollTrigger: {
								trigger: ".contact-info-section",
								start: "top 80%",
							},
						},
					);

					// Form animation
					gsap.fromTo(
						".contact-form",
						{ opacity: 0, y: 40 },
						{
							opacity: 1,
							y: 0,
							duration: 0.8,
							ease: "power3.out",
							scrollTrigger: {
								trigger: ".contact-form",
								start: "top 80%",
							},
						},
					);

					// Map animation
					gsap.fromTo(
						".map-section",
						{ opacity: 0, y: 60 },
						{
							opacity: 1,
							y: 0,
							duration: 0.8,
							ease: "power3.out",
							scrollTrigger: {
								trigger: ".map-section",
								start: "top 80%",
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

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission
		console.log("Form submitted:", formData);
		alert("Thank you for your message! We will get back to you soon.");
	};

	return (
		<div ref={pageRef} className="bg-[#1a2634] min-h-screen">
			{/* Hero Section - Rounded Card */}
			<section className="hero-section px-4 lg:px-6 pt-4 lg:pt-6">
				{/* Hero Card Container */}
				<div className="relative rounded-[30px] lg:rounded-[40px] overflow-hidden min-h-[40vh] lg:min-h-[50vh]">
					{/* Background Image */}
					<div className="absolute inset-0">
						<img
							src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
							alt="Modern bathroom interior"
							className="w-full h-full object-cover"
						/>
						{/* Overlay */}
						<div className="absolute inset-0 bg-gradient-to-r from-[#1a2634]/80 via-[#1a2634]/50 to-transparent" />
					</div>

					{/* Navbar inside hero */}
					<div className="relative z-20 pt-6 lg:pt-8">
						<div className="max-w-7xl mx-auto px-6 lg:px-12">
							<div className="flex items-center justify-between h-16 lg:h-20">
								{/* Logo */}
								<Link
									href="/home"
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
							CONTACT
						</h1>

						{/* Description */}
						<p className="hero-description text-white/70 text-base lg:text-lg max-w-md leading-relaxed">
							get in touch with our team for all your plumbing, heating,
							drainage, and solar needs. We're here to help.
						</p>
					</div>
				</div>
			</section>

			{/* Contact Info & Form Section */}
			<section className="contact-info-section bg-[#1a2634] py-16 lg:py-24">
				<div className="max-w-7xl mx-auto px-6 lg:px-12">
					<div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
						{/* Left - Contact Info */}
						<div className="lg:w-2/5">
							<h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-white italic mb-12">
								Get in Touch
							</h2>

							<div className="space-y-8">
								{contactInfo.map((info, i) => (
									<div
										key={i}
										className="contact-info-item flex items-start gap-5">
										<div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
											<info.icon className="w-5 h-5 text-white" />
										</div>
										<div>
											<p className="text-white/40 text-xs uppercase tracking-wider mb-1">
												{info.label}
											</p>
											<p className="text-white text-lg font-medium">
												{info.value}
											</p>
											<p className="text-white/60 text-sm">
												{info.subValue}
											</p>
										</div>
									</div>
								))}
							</div>

							{/* Social Links */}
							<div className="mt-12 pt-8 border-t border-white/10">
								<p className="text-white/40 text-xs uppercase tracking-wider mb-4">
									Follow Us
								</p>
								<div className="flex gap-4">
									{["facebook", "instagram", "linkedin"].map(
										(social) => (
											<a
												key={social}
												href={`https://${social}.com`}
												target="_blank"
												rel="noopener noreferrer"
												className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
												<span className="text-white text-xs uppercase">
													{social[0]}
												</span>
											</a>
										),
									)}
								</div>
							</div>
						</div>

						{/* Right - Contact Form */}
						<div className="lg:w-3/5">
							<div className="contact-form bg-white rounded-[30px] p-8 lg:p-12">
								<h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#1a2634] mb-8">
									Send us a Message
								</h2>

								<form onSubmit={handleSubmit} className="space-y-6">
									{/* Name & Email Row */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label
												htmlFor="name"
												className="block text-[#1a2634]/60 text-sm mb-2">
												Your Name *
											</label>
											<input
												type="text"
												id="name"
												name="name"
												value={formData.name}
												onChange={handleInputChange}
												required
												className="w-full px-5 py-4 bg-[#f5f5f5] rounded-full text-[#1a2634] placeholder-[#1a2634]/40 focus:outline-none focus:ring-2 focus:ring-[#1a2634]/20 transition-all"
												placeholder="John Doe"
											/>
										</div>
										<div>
											<label
												htmlFor="email"
												className="block text-[#1a2634]/60 text-sm mb-2">
												Your Email *
											</label>
											<input
												type="email"
												id="email"
												name="email"
												value={formData.email}
												onChange={handleInputChange}
												required
												className="w-full px-5 py-4 bg-[#f5f5f5] rounded-full text-[#1a2634] placeholder-[#1a2634]/40 focus:outline-none focus:ring-2 focus:ring-[#1a2634]/20 transition-all"
												placeholder="john@example.com"
											/>
										</div>
									</div>

									{/* Phone & Service Row */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label
												htmlFor="phone"
												className="block text-[#1a2634]/60 text-sm mb-2">
												Phone Number
											</label>
											<input
												type="tel"
												id="phone"
												name="phone"
												value={formData.phone}
												onChange={handleInputChange}
												className="w-full px-5 py-4 bg-[#f5f5f5] rounded-full text-[#1a2634] placeholder-[#1a2634]/40 focus:outline-none focus:ring-2 focus:ring-[#1a2634]/20 transition-all"
												placeholder="+1 604 123 4567"
											/>
										</div>
										<div>
											<label
												htmlFor="service"
												className="block text-[#1a2634]/60 text-sm mb-2">
												Service Required
											</label>
											<select
												id="service"
												name="service"
												value={formData.service}
												onChange={handleInputChange}
												className="w-full px-5 py-4 bg-[#f5f5f5] rounded-full text-[#1a2634] focus:outline-none focus:ring-2 focus:ring-[#1a2634]/20 transition-all appearance-none cursor-pointer">
												<option value="">Select a service</option>
												<option value="sanitary">Sanitary</option>
												<option value="heating">Heating</option>
												<option value="drainage">Drainage</option>
												<option value="solar">Solar</option>
												<option value="emergency">Emergency</option>
												<option value="other">Other</option>
											</select>
										</div>
									</div>

									{/* Message */}
									<div>
										<label
											htmlFor="message"
											className="block text-[#1a2634]/60 text-sm mb-2">
											Your Message *
										</label>
										<textarea
											id="message"
											name="message"
											value={formData.message}
											onChange={handleInputChange}
											required
											rows={5}
											className="w-full px-5 py-4 bg-[#f5f5f5] rounded-[20px] text-[#1a2634] placeholder-[#1a2634]/40 focus:outline-none focus:ring-2 focus:ring-[#1a2634]/20 transition-all resize-none"
											placeholder="Tell us about your project or issue..."
										/>
									</div>

									{/* Submit Button */}
									<button
										type="submit"
										className="group inline-flex items-center gap-3 bg-[#1a2634] text-white px-8 py-4 rounded-full font-medium hover:bg-[#2a3a4a] transition-all duration-300 hover:shadow-xl hover:shadow-[#1a2634]/20 hover:-translate-y-1">
										<span>send message</span>
										<ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Map Section */}
			<section className="map-section bg-[#1a2634] py-6 lg:py-8">
				<div className="px-4 lg:px-6">
					<div className="rounded-[30px] lg:rounded-[40px] overflow-hidden h-[400px] lg:h-[500px] relative">
						{/* Map placeholder with gradient overlay */}
						<div className="absolute inset-0 bg-[#2a3a4a]">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83327.95083029087!2d-123.19394079310091!3d49.257735818502895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548673f143a94fb3%3A0xbb9196ea9b81f38b!2sVancouver%2C%20BC%2C%20Canada!5e0!3m2!1sen!2s!4v1704067200000!5m2!1sen!2s"
								width="100%"
								height="100%"
								style={{
									border: 0,
									filter: "grayscale(100%) invert(92%) contrast(90%)",
								}}
								allowFullScreen
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								className="opacity-80"
							/>
						</div>

						{/* Location Card Overlay */}
						<div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 bg-white rounded-[20px] p-6 lg:p-8 shadow-xl max-w-sm">
							<h3 className="font-['Playfair_Display'] text-xl text-[#1a2634] mb-3">
								Visit Our Office
							</h3>
							<p className="text-[#1a2634]/60 text-sm leading-relaxed mb-4">
								123 Waterfront Drive
								<br />
								Vancouver, BC V6B 1A1
								<br />
								Canada
							</p>
							<a
								href="https://maps.google.com"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 text-[#1a2634] font-medium text-sm hover:text-[#1a2634]/70 transition-colors">
								<span className="border-b border-[#1a2634]/50 hover:border-[#1a2634]">
									Get Directions
								</span>
								<ArrowUpRight className="w-4 h-4" />
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* Emergency CTA */}
			<section className="bg-[#3d5a6a] py-12 lg:py-16">
				<div className="max-w-7xl mx-auto px-6 lg:px-12">
					<div className="flex flex-col lg:flex-row items-center justify-between gap-8">
						<div>
							<h3 className="font-['Playfair_Display'] text-2xl lg:text-3xl text-white mb-2">
								24/7 Emergency Service Available
							</h3>
							<p className="text-white/70">
								Plumbing emergency? Don't wait. Call us now for
								immediate assistance.
							</p>
						</div>
						<a
							href="tel:+16041234567"
							className="inline-flex items-center gap-3 bg-white text-[#1a2634] px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-all duration-300 flex-shrink-0">
							<Phone className="w-5 h-5" />
							<span>+1 604 123 4567</span>
						</a>
					</div>
				</div>
			</section>

			{/* Bottom Spacer */}
			<section className="bg-[#1a2634] py-8" />
		</div>
	);
}
