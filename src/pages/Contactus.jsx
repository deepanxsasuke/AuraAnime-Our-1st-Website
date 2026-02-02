export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-300">
      <h1 className="text-2xl font-bold mb-4 text-white">
        Contact Us
      </h1>

      <p className="mb-4">
        If you have any questions, feedback, copyright concerns, or DMCA
        requests, feel free to contact us.
      </p>

      <div className="bg-gray-900 p-4 rounded-lg space-y-3">
        <p>
          <span className="font-semibold text-white">Email:</span>{" "}
          <a
            href="mailto:deepandon321@gmail.com"
            className="text-indigo-400 hover:underline"
          >
            deepandon321@gmail.com
          </a>
        </p>

        <p>
          <span className="font-semibold text-white">Response Time:</span>{" "}
          Within 24–48 hours
        </p>
      </div>

      <p className="mt-6 text-sm text-gray-400">
        Last updated: January 2026
      </p>
    </div>
  );
}
