import React, { useState, useEffect } from 'react';

const usePagination = () => {
  const [users, setUsers] = useState("");
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState([0]);

  const [currentPage, setCurrentPage] = useState(1);

  const [minPageLimit, setMinPageLimit] = useState(0);
  const [maxPageLimit, setMaxPageLimit] = useState(3);

  const usersPerPage = 10;

  const lastPage = currentPage * usersPerPage;
  const firstPage = lastPage - usersPerPage;
  const currentUsers = results.slice(firstPage, lastPage);

  const [token, setToken] = useState("");

  useEffect(() => {
    if (!users) {
      return;
    }

    fetch("https://api.github.com/graphql", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer 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`,
      },
      body: JSON.stringify({
        query: `
          query { 
            search(query: "${users}",type: USER, first: 30){
              userCount
              edges {
                node {
                  ... on User {
                    login
                    name
                    avatarUrl
                    starredRepositories {
                      totalCount
                    }
                    followers(first:100) {
                      totalCount
                    }
                    following(first:100) {
                      totalCount
                    }
                    url
                  }
                }
              }
            }
          }`,
      })

    })
      .then(response => response.json())
      .then(data => {
        setResults(data.data.search.edges);
        setTotal(data.data.search.userCount);
      });

  }, [users])

  const renderUsers = (results) => {
    return (
      <table>
        <tbody className="table-body">
          {results.map(result => {
            return (
              <tr key={result.node.login}>
                <td>
                  <a href={result.node.url} target="_blank">
                    <img className="profile-avatar" src={result.node.avatarUrl} />
                  </a>
                </td>
                <td>
                  <p>Username: {result.node.login}</p>
                  <p>Name: {result.node.name}</p>
                </td>
                <td>
                  <p>Followers: {result.node.followers.totalCount}</p>
                  <p>Following: {result.node.following.totalCount}</p>
                </td>
                <td>&#9734; Repos: {result.node.starredRepositories.totalCount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % maxPageLimit == 0) {
      setMaxPageLimit(maxPageLimit - usersPerPage);
      setMinPageLimit(minPageLimit - usersPerPage);
    }
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + usersPerPage);
      setMinPageLimit(minPageLimit + usersPerPage);
    }
  };

  return (
    <div>
      <nav className="header-nav">
        <h1 className="title">
          <img className="title-icon" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" />
          GitHub User Search
        </h1>
        <ul className="user-content">
          <li className="button-borders">
            <button
              onClick={handlePrev}
              disabled={currentPage == 1}
            >
              Prev
            </button>
          </li>
          <form
            className="user-token"
            onSubmit={e => {
              e.preventDefault()
              setToken(e.target.elements.query.value)
            }}
          >
            <input
              type="text"
              name="query"
              placeholder="Insert your personal access token here"
            />
          </form>
          <form
            className="user-search"
            onSubmit={e => {
              e.preventDefault()
              setUsers(e.target.elements.query.value)
            }}
          >
            <input
              type="text"
              name="query"
              placeholder="Search GitHub Users"
            />
            <div>
              Total count of search results: {total}
            </div>
          </form>
          <li className="button-borders">
            <button
              onClick={handleNext}
              disabled={currentPage == 3 || total === 1 || users == ""}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
      <div className="user-profiles">
        {renderUsers(currentUsers)}
      </div>
    </div>
  )
};

export default usePagination;
