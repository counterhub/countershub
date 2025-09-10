export default function Legal() {
  return (
    <main style={{ padding: "20px", color: "white", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Legal</h1>

      <section>
        <h2>Disclaimer</h2>
        <p>
          Countershub is a fan-made project created for educational and community purposes. 
          We are not affiliated with, endorsed, or sponsored by Electronic Arts (EA), 
          Capital Games, Disney, or Lucasfilm. Star Wars and all related properties are 
          trademarks of Lucasfilm Ltd. and its affiliates.
        </p>
      </section>

      <section>
        <h2>Use of Assets</h2>
        <p>
          All game images and names used on this site are the property of their respective 
          owners. Assets are used under fair use for non-commercial, educational, and 
          community reference.
        </p>
      </section>

      <section>
        <h2>Attribution</h2>
        <p>
          Background image on Counters page courtesy of{" "}
          <a 
            href="https://www.vecteezy.com" 
            target="_blank" 
            rel="noreferrer"
            style={{ color: "#4db2ff" }}
          >
            Vecteezy
          </a>.
        </p>
      </section>
    </main>
  );
}
