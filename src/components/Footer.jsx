const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4 mt-8">
      <div className="w-full max-w-7xl mx-auto">
        <p className="text-center text-gray-500">
          Ada Movies - Developed by VeroDev © {new Date().getFullYear()}.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
