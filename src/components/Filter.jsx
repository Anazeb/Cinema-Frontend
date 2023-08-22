
import "../style/Header.css";
import React, { useState, useEffect } from 'react';

export default function Filter({ onCategoryChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const fetchedCategories = await (await fetch('/api/movies_by_category')).json();
      const uniqueCategories = [...new Set(fetchedCategories.map(cat => cat.category))];
      setCategories(uniqueCategories);
    })();
  }, []);

  return (
    <select className="select-category" onChange={(e) => onCategoryChange(e.target.value)}>
      <option value="all">All Categories</option>
      {categories.map((category, index) => (
        <option key={index} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}
