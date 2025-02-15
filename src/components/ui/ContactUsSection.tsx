"use client";
import React, { useState } from "react";
import { Mail, Book } from "lucide-react";
import { JSX } from "react/jsx-runtime";

// Types
interface ContactInfo {
	icon: JSX.Element;
	title: string;
	details: string;
}

interface FormData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

// Form field configuration for DRY implementation
const formFields = [
	{ id: "name", type: "text", label: "Name", required: true },
	{ id: "email", type: "email", label: "Email", required: true },
	{
		id: "subject",
		type: "select",
		label: "Subject",
		options: [
			{ value: "general", label: "General Inquiry" },
			{ value: "support", label: "Technical Support" },
			{ value: "billing", label: "Billing Question" },
			{ value: "feature", label: "Feature Request" },
		],
	},
	{ id: "message", type: "textarea", label: "Message", required: true },
] as const;

// Contact information items
const contactInfoItems: ContactInfo[] = [
	{
		icon: <Mail className="w-6 h-6 text-white" />,
		title: "Email Us",
		details: "support@ilovepdf.too",
	},
	{
		icon: <Book className="w-6 h-6 text-white" />,
		title: "Documentation",
		details: "Visit our help center",
	},
];

// Reusable Input Component
const FormField = ({
	type,
	id,
	label,
	required,
	options,
	value,
	onChange,
}: {
	type: string;
	id: string;
	label: string;
	required?: boolean;
	options?: Array<{ value: string; label: string }>;
	value: string;
	onChange: (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => void;
}) => {
	const baseClasses =
		"w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white focus:outline-none focus:border-blue-500 transition duration-300";

	return (
		<div>
			<label htmlFor={id} className="block text-gray-300 mb-2">
				{label}
			</label>
			{type === "textarea" ? (
				<textarea
					id={id}
					name={id}
					rows={4}
					className={baseClasses}
					required={required}
					value={value}
					onChange={onChange}
				/>
			) : type === "select" ? (
				<select
					id={id}
					name={id}
					className={baseClasses}
					value={value}
					onChange={onChange}
				>
					{options?.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			) : (
				<input
					type={type}
					id={id}
					name={id}
					className={baseClasses}
					required={required}
					value={value}
					onChange={onChange}
				/>
			)}
		</div>
	);
};

// Contact Info Item Component
const ContactInfoItem = ({ icon, title, details }: ContactInfo) => (
	<div className="flex items-center">
		<div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
			{icon}
		</div>
		<div>
			<h3 className="text-white font-semibold">{title}</h3>
			<p className="text-gray-300">{details}</p>
		</div>
	</div>
);

// Main Contact Section Component
const ContactSection: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		subject: "general",
		message: "",
	});

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Here you would typically send the data to your backend
		console.log("Form submitted:", formData);

		// Simulating API call
		try {
			// Add your API call here
			alert("Thanks for your message! We'll get back to you soon.");
			setFormData({
				name: "",
				email: "",
				subject: "general",
				message: "",
			});
		} catch (error) {
			console.error("Error submitting form:", error);
			alert("There was an error submitting your message. Please try again.");
		}
	};

	return (
		<section id="contact" className="bg-neutral-900 py-24">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
					{/* Contact Information */}
					<div className="animate__animated animate__fadeInLeft">
						<h2 className="text-4xl font-bold text-white mb-8">Get in Touch</h2>
						<p className="text-gray-300 mb-8 text-lg">
							Have questions? We're here to help! Reach out to us using the form
							or through our support channels.
						</p>

						<div className="space-y-6">
							{contactInfoItems.map((item, index) => (
								<ContactInfoItem key={index} {...item} />
							))}
						</div>
					</div>

					{/* Contact Form */}
					<div className="bg-neutral-800 p-8 rounded-2xl shadow-xl animate__animated animate__fadeInRight">
						<form onSubmit={handleSubmit} className="space-y-6">
							{formFields.map((field) => (
								<FormField
									key={field.id}
									{...field}
									value={formData[field.id as keyof FormData]}
									onChange={handleInputChange}
									options={"options" in field ? [...field.options] : undefined}
								/>
							))}

							<button
								type="submit"
								className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
							>
								Send Message
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactSection;
