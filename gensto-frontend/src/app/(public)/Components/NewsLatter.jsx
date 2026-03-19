const NewsletterSignup = () => {
  return (
    <section className="bg-gray-100 text-gray-800 py-10 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="mb-6 text-sm md:text-base text-gray-600">
          Stay updated with the latest news, tips, and updates from our platform.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            // handleSubmit logic goes here
            alert('Thank you for subscribing!');
          }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="w-full sm:w-auto px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSignup;