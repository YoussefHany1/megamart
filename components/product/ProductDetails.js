const TechnicalDetails = ({ specifications, details }) => {
  const hasData =
    (specifications && specifications.length > 0) ||
    (details && details.length > 0);

  if (!hasData) return null;

  return (
    <div className="technical-details mb-12 lg:mb-0">
      <h2 id="technical-details" className="font-bold text-xl text-black mb-4">
        Technical Details:
      </h2>
      <table className="w-full">
        <tbody>
          {specifications?.map((item, index) => (
            <tr
              key={`spec-${index}`}
              className={index % 2 === 1 ? "bg-gray-100" : ""}
            >
              <th
                className="py-2 px-3 font-semibold text-black text-start lg:text-nowrap"
                scope="row"
              >
                {item.name}
              </th>
              <td className="py-2 px-3 text-text lg:text-nowrap">
                {item.pecifications}
              </td>
            </tr>
          ))}
          {details?.map((item, index) => (
            <tr
              key={`detail-${index}`}
              className={index % 2 === 1 ? "bg-gray-100" : ""}
            >
              <th
                className="py-2 px-3 font-semibold text-black text-start lg:text-nowrap"
                scope="row"
              >
                {item.th}
              </th>
              <td className="py-2 px-3 text-text lg:text-nowrap">{item.td}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ProductDescription = ({ desc }) => {
  if (!desc) return null;

  return (
    <div className="desc lg:ml-12">
      <h3 className="font-bold text-black text-xl mb-4">Description:</h3>
      <p className="text-gray-500">{desc}</p>
    </div>
  );
};

const ProductDetails = ({ product }) => {
  return (
    <section className="header pt-5" aria-labelledby="technical-details">
      <div className="details lg:flex block">
        <TechnicalDetails
          specifications={product.specifications}
          details={product.details}
        />
        <ProductDescription desc={product.desc} />
      </div>
    </section>
  );
};

export default ProductDetails;
