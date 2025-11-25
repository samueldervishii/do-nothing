import axios from "axios";

async function getNASAFact() {
  try {
    const response = await axios.get(
      "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY",
      { timeout: 5000 }
    );
    return {
      title: response.data.title,
      explanation: response.data.explanation,
      date: response.data.date,
    };
  } catch (error) {
    const fallbackFacts = [
      {
        title: "The Moon",
        explanation:
          "The Moon is Earth's only natural satellite. At about one-quarter the diameter of Earth, it is the largest natural satellite in the Solar System relative to the size of its planet.",
        date: new Date().toISOString().split("T")[0],
      },
      {
        title: "Mars",
        explanation:
          "Mars is the fourth planet from the Sun. Often called the 'Red Planet' due to iron oxide on its surface, Mars has been a target for exploration due to its potential for past life.",
        date: new Date().toISOString().split("T")[0],
      },
    ];
    return fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)];
  }
}

export { getNASAFact };
