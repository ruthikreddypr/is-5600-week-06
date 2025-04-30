import Card from "./Card";
import Button from "./Button";
import React, { useState, useEffect } from "react";
import Search from "./Search";

const limit = 10;
const CardList = ({data}) => {
  const defaultDataset = data.slice(0, limit);

  const [offset, setOffset] = useState(0);
  const [filteredData, setFilteredData] = useState(data);
  const [products, setProducts] = useState(filteredData.slice(0, limit));

  const handlePagination = (value) => {
    const newOffset = offset + value;
    if (newOffset < 0 || newOffset >= filteredData.length) return;
    setOffset(newOffset);
  };

  useEffect(() => {
    setProducts(filteredData.slice(offset, offset + limit));
  }, [offset, filteredData]);

  const filterTags = (searchTerm) => {
    if (!searchTerm) {
      setFilteredData(data); 
      setOffset(0);
      return;
    }

    const filteredList = data.filter(
      (product) =>
        product.tags &&
        Array.isArray(product.tags) &&
        product.tags.some(
          (tag) =>
            typeof tag.title === "string" &&
            tag.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    setFilteredData(filteredList);
    setOffset(0); 
  };

  return (

    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      <div className="flex items-center justify-center pa4">   
      <Button
          text="Previous"
          handleClick={() => handlePagination(-limit)}
          disabled={offset === 0}
        />
        <Button
          text="Next"
          handleClick={() => handlePagination(limit)}
          disabled={offset + limit >= filteredData.length}
        />
      </div>
    </div>
  )
}

export default CardList;