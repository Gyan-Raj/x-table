import React, { useState } from "react";

const Table = () => {
  const [data, setData] = useState([
    { date: "2022-09-01", views: 100, article: "Article 1" },

    { date: "2023-09-01", views: 100, article: "Article 1" },

    { date: "2023-09-02", views: 150, article: "Article 2" },

    { date: "2023-09-02", views: 120, article: "Article 3" },

    { date: "2020-09-03", views: 200, article: "Article 4" },
  ]);
  let handleSortByDate = () => {
    let sortedData = [...data].sort((a, b) => {
      if (a.date === b.date) {
        return b.views - a.views;
      } else {
        return new Date(a.date) - new Date(b.date);
      }
    });
    setData(sortedData);
  };
  let handleSortByViews = () => {
    let sortedData = [...data].sort((a, b) => {
      if (a.views === b.views) {
        return new Date(a.date) - new Date(b.date);
      } else {
        return b.views - a.views;
      }
    });
    setData(sortedData);
  };
  return (
    <div>
      <h1>Date and Views Table</h1>
      <button onClick={handleSortByDate}>Sort by Date</button>
      <button onClick={handleSortByViews}>Sort by Views</button>
      <table border="1px solid black">
        <thead>
          <tr>
            <th>Date</th>
            <th>Views</th>
            <th>Article</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr>
                <td>{item.date}</td>
                <td>{item.views}</td>
                <td>{item.article}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

/**
 * If we are sorting the data array directly, i.e., @line:16 and 26 instead of [...data].sort()  we are wrinting data.sort(), then it does not trigger a re-render of the component since the state is not being updated. Which means that the issue is that the sort function directly modifies the state array (data). React does not detect this change as the reference of the array remains the same, and thus the component does not re-render. To fix this, we need to create a new array with the sorted data and update the state with this new array.
 * If we are not using useState to manage the sorted data, i.e., if we are declaring data outside the component and then using sort over it (thinking that sort method mutates the original array and so the data will also update), it will not not re-render the component which is necessary.
 * These changes ensure that React detects the state update and re-renders the component with the sorted data.
 */
