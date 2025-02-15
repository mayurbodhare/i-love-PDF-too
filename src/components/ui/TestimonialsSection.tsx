"use client";

import { useEffect, useRef, useState } from "react";

// types.ts
type Testimonial = {
	id: string;
	name: string;
	role: string;
	initials: string;
	comment: string;
	avatarBgColor: string;
};

// NavigationButton.tsx
type NavigationButtonProps = {
	direction: "prev" | "next";
	onClick: () => void;
};

const NavigationButton: React.FC<NavigationButtonProps> = ({
	direction,
	onClick,
}) => {
	const isNext = direction === "next";

	return (
		<button
			onClick={onClick}
			className={`absolute top-1/2 transform -translate-y-1/2 ${
				isNext ? "right-0 translate-x-4" : "left-0 -translate-x-4"
			} bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition duration-300`}
			aria-label={`${direction} slide`}
		>
			<svg
				className="w-6 h-6 text-gray-600"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d={isNext ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
				/>
			</svg>
		</button>
	);
};

// TestimonialCard.tsx
const TestimonialCard: React.FC<Testimonial> = ({
	name,
	role,
	initials,
	comment,
	avatarBgColor,
}) => (
	<div className="w-full md:w-1/2 lg:w-1/3 flex-none px-4">
		<div className="bg-neutral-50 p-8 rounded-xl shadow-lg">
			<div className="flex items-center mb-6">
				<div
					className={`w-14 h-14 rounded-full ${avatarBgColor} flex items-center justify-center`}
				>
					<span className="text-white text-xl font-bold">{initials}</span>
				</div>
				<div className="ml-4">
					<h4 className="text-lg font-semibold text-gray-900">{name}</h4>
					<p className="text-gray-600">{role}</p>
				</div>
			</div>
			<p className="text-gray-700">{comment}</p>
		</div>
	</div>
);

// useAutoSlide.ts
const useAutoSlide = (length: number, interval = 5000) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % length);
		}, interval);

		return () => clearInterval(timer);
	}, [length, interval]);

	return {
		currentIndex,
		setCurrentIndex,
		nextSlide: () => setCurrentIndex((prev) => (prev + 1) % length),
		prevSlide: () => setCurrentIndex((prev) => (prev - 1 + length) % length),
	};
};

// TestimonialsSlider.tsx
const TestimonialsSlider: React.FC = () => {
	const testimonials: Testimonial[] = [
		{
			id: "1",
			name: "John Doe",
			role: "Marketing Director",
			initials: "JD",
			comment:
				"This tool has revolutionized how we handle documents. The compression feature alone has saved us gigabytes of storage!",
			avatarBgColor: "bg-blue-600",
		},
		{
			id: "2",
			name: "Alice Smith",
			role: "Freelance Designer",
			initials: "AS",
			comment:
				"The OCR functionality is incredibly accurate. It's saved me countless hours of manual data entry.",
			avatarBgColor: "bg-green-600",
		},
		{
			id: "3",
			name: "Mike Johnson",
			role: "Business Analyst",
			initials: "MJ",
			comment:
				"The merge and split features are intuitive and perfect for handling large documents. Highly recommended!",
			avatarBgColor: "bg-purple-600",
		},
	];

	const { currentIndex, nextSlide, prevSlide } = useAutoSlide(
		testimonials.length,
	);
	const [trackWidth, setTrackWidth] = useState(0);
	const slideRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const updateWidth = () => {
			if (slideRef.current) {
				setTrackWidth(slideRef.current.getBoundingClientRect().width);
			}
		};

		updateWidth();
		window.addEventListener("resize", updateWidth);
		return () => window.removeEventListener("resize", updateWidth);
	}, []);

	return (
		<section id="testimonials" className="bg-white py-24">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16 animate__animated animate__fadeIn">
					<h2 className="text-4xl font-bold text-gray-900 mb-4">
						What Our Users Say
					</h2>
					<p className="text-xl text-gray-600">
						Trusted by professionals worldwide
					</p>
				</div>

				<div className="relative testimonial-slider">
					<div className="overflow-hidden">
						<div
							ref={slideRef}
							className="flex transition-transform duration-500"
							style={{
								transform: `translateX(-${currentIndex * trackWidth}px)`,
							}}
						>
							{testimonials.map((testimonial) => (
								<TestimonialCard key={testimonial.id} {...testimonial} />
							))}
						</div>
					</div>

					<NavigationButton direction="prev" onClick={prevSlide} />
					<NavigationButton direction="next" onClick={nextSlide} />
				</div>
			</div>
		</section>
	);
};

export default TestimonialsSlider;
