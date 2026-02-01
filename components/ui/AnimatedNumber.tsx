import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

export default function AnimatedNumber({ value }: { value: string }) {
	const ref = useRef<HTMLSpanElement>(null);
	const motionValue = useMotionValue(0);

	const numericValue = parseInt(value);
	const suffix = value.replace(numericValue.toString(), "");

	const rounded = useTransform(motionValue, (latest) => Math.floor(latest));

	useEffect(() => {
		if (!ref.current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					animate(motionValue, numericValue, {
						duration: 1.8,
						ease: "easeOut",
					});
					observer.disconnect();
				}
			},
			{ threshold: 0.6 }
		);

		observer.observe(ref.current);

		return () => observer.disconnect();
	}, [motionValue, numericValue]);

	return (
		<span ref={ref}>
			<motion.span>{rounded}</motion.span>
			{suffix}
		</span>
	);
}
