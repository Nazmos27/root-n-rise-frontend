import Link from "next/link";
import { FaFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import ContactForm from "@/src/components/form/ContactForm";

export interface IContactProps {}
export default function Contact({}: IContactProps) {
  return (
    <section>
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <ContactForm />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 mb-12 w-full">
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-2">Get in Touch</h3>
          <p className="text-md text-gray-600">
            Email:{" "}
            <a
              href="mailto:info@rootnrise.com"
              className="text-blue-500 hover:underline transition ease-in-out duration-200"
            >
              info@rootnrise.com
            </a>
          </p>
          <p className="text-md text-gray-600">
            Phone:{" "}
            <a
              href="tel:+1234567890"
              className="text-blue-500 hover:underline transition ease-in-out duration-200"
            >
              +1 (234) 567-890
            </a>
          </p>
          <p className="text-md text-gray-600">
            Address: 5678 Root Street, Green City, Eco Country
          </p>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-2">Business Hours</h3>
          <ul className="text-md text-gray-600">
            <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
            <li>Saturday: 10:00 AM - 4:00 PM</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-2 text-center">Follow Us</h3>
          <div className="flex justify-center space-x-4">
            <Link
              href="https://www.facebook.com/rootnriseco"
              className="text-blue-500 hover:text-blue-700 transition ease-in-out duration-200"
            >
              <FaFacebook className="text-3xl" />
            </Link>
            <Link href="https://twitter.com/rootnriseco">
              <FaSquareXTwitter className="text-3xl" />
            </Link>
            <Link
              href="https://www.linkedin.com/company/rootnriseco/"
              className="text-blue-500 hover:text-blue-700 transition ease-in-out duration-200"
            >
              <FaLinkedin className="text-3xl" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
