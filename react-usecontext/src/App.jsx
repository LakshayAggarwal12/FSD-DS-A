import React,{useState, useEffect, useContext, createContext} from 'react'

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === 'light' ? 'dark' : 'light'
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const MyApp = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  useEffect(()=>{
    console.log("form data updated", formData)
  }, [formData])

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  };

  const onSubmit = (e) => {
    e.preventDefault()
    alert(`Account created for ${formData.name} with email ${formData.email}`)
    console.log("form submitted", formData)
  };

  return (
    <div className={theme}
      style={{ display: 'flex', justifyContent: 'center', padding: '40px', backgroundColor: theme === 'light' ? '#f9f9f9' : '#333', color: theme === 'light' ? '#000' : '#fff' }}
    >
      <h1 style={{ position: 'absolute', top: '20px', left: '20px' }}>Current Theme: {theme}</h1> 

        <button type="button" onClick={toggleTheme}
          style={{ position: 'absolute', top: '20px', right: '20px', padding: '10px', backgroundColor: theme === 'light' ? '#2563eb' : '#444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
         Toggle Theme 
        </button>

      <form 
      style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px', height: '250px', padding: '24px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
        <input name="name" type="text" placeholder='Enter your name'
          onChange={onChange}
          style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px'}}
        />

        <input name="email" type="email" placeholder='Enter your email'
        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        onChange={onChange}
        />

        <input name="password" type="password" placeholder='Enter your password'
        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        onChange={onChange}
        />

        <button type='submit'
        style={{ padding: '10px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        onClick={onSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

const App = () => {
  return (
    <ThemeProvider>
      <MyApp />
    </ThemeProvider>
  )
}

export default App