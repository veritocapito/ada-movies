const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4 mt-8">
      <div className="w-full max-w-7xl mx-auto">
        <p className="text-center text-gray-500">
          My Movies - Developed by <a
            href="https://github.com/veritocapito"
            target="_blank"
            className=" hover:text-white transition-colors duration-300"
          >
             VeroCapo_Dev
          </a>  © {new Date().getFullYear()}.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
