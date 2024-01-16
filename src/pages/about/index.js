const About = () => {

};
return (
    <div className="about-container">
        <div className='navbar'>
            <h1 style={{ color: 'blueviolet', fontSize: '48px', fontFamily: '  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;' }}>Facts</h1>
            <button id='navbar-btn'>Home</button>
            <button id='navbar-btn' onClick={() => goToMyFactPage()}>My Facts</button>
            <button id="selected" onClick={() => about()}> <FaUserAlt color='#4a24a1' size={30} /> </button>
        </div>
    </div>
)