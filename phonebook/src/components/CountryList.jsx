const CountryList = ({ countries, setSelected }) => {
  return (
    <div>
      {countries.map(country => (
        <div key={country.cca3}>
          {country.name.common}
          <button onClick={() => setSelected(country)}>
            show
          </button>
        </div>
      ))}
    </div>
  )
}

export default CountryList