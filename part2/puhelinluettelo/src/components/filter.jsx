const Filter = ( {newFilter, handleFilterChange} ) => {
    return (
        <div>
            <p>search: <input value={newFilter} onChange={handleFilterChange} /></p>
      </div>
    )
}

export default Filter