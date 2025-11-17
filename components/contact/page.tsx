"use client";

import { motion } from "motion/react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Contact = () => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("../api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
  });

  if (response.ok) {
    toast({
      description: "Email sent successfully",
      variant: "default",
    });
    setFormData({ name: "", email: "", message: "" });
  } else {
    toast({
      description: "Failed to send email",
      variant: "destructive",
    });
  }
}

  return (
    <div
      id="contact"
      className="page-container p-10 border-b border-stone-400/40"
    >
      <div className="mt-20">
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "circIn" }}
          className="!text-5xl !font-normal"
        >
          Let&apos;s Connect
        </motion.h2>
        <motion.p
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5, ease: "linear" }}
          className="mt-5"
        >
          Feel free to reach out for collaborations, freelance work, or just to
          say hello!
        </motion.p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-10 mt-10">
        <input type="text" placeholder="Enter your name" name="name" onChange={handleChange} value={formData.name} required />
        <input type="email" placeholder="Enter your email" name="email" onChange={handleChange} value={formData.email} required />
        <textarea placeholder="Message" name="message" onChange={handleChange} value={formData.message} required></textarea>
        <button type="submit">Connect</button>
      </form>
    </div>
  );
};

export default Contact;
