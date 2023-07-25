const weatherAnimations = {
  moon: (
    <div icon="supermoon">
      <span className="moon"></span>
      <span className="meteor"></span>
    </div>
  ),
  sun: (
    <div icon="sunny">
      <span className="sun"></span>
    </div>
  ),
  clouds: (
    <div icon="cloudy">
      <span className="cloud"></span>
      <span className="cloud"></span>
    </div>
  ),
  snow: (
    <div icon="snowy">
      <span className="snowman"></span>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  ),
  rain: (
    <div icon="stormy">
      <span className="cloud"></span>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  ),
  thunderstorm: (
    <div icon="thunderstorm">
      <span className="cloud"></span>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  ),
  mists: (
    <div icon="mists">
      <div className="mist-block">
        <span className="mist"></span>
        <span className="s-mist"></span>
        <span className="t-mist"></span>
      </div>
    </div>
  ),
};

export default weatherAnimations;