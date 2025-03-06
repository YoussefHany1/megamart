const SVGComponent = (props) => (
  <svg
    viewBox="0 0 50 50"
    {...props}
  >
    <path
      fill="#008ECC"
      stroke="#008ECC" strokeWidth="3"
      d="M15.563 40.836a.997.997 0 0 0 1.414 0l15-15a1 1 0 0 0 0-1.414l-15-15a.999.999 0 1 0-1.414 1.414l14.293 14.293-14.293 14.293a1 1 0 0 0 0 1.414"
    />
  </svg>
);
export default SVGComponent;