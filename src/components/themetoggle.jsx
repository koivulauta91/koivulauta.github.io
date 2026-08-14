function ThemeToggle() {

  const toggleTheme = () => {

    document.body.classList.toggle(
      "dark-mode"
    );

    localStorage.setItem(
      "theme",
      document.body.classList.contains(
        "dark-mode"
      )
    );

  };

  return (
    <button onClick={toggleTheme}>
      🌙 Dark Mode
    </button>
  );
}

export default ThemeToggle;