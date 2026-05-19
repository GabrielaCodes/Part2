import { useEffect, useState } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => setCountries(res.data))
  }, [])

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setSelected(null)
  }

  const filtered = countries.filter(c =>
    c.name.common.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>Countries</h2>

      <input value={search} onChange={handleSearch} />

      {search === '' ? null :
        filtered.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : filtered.length > 1 ? (
          <CountryList countries={filtered} setSelected={setSelected} />
        ) : filtered.length === 1 ? (
          <Country country={filtered[0]} />
        ) : (
          <p>No matches</p>
        )
      }

      {selected && <Country country={selected} />}
    </div>
  )
}

export default App