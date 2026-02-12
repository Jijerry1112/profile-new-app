import Card from "../components/Card";
import Wrapper from "../components/Wrapper";
import Filters from "../components/Filters";

function HomePage({ profiles, handleChangeTitle, handleSearch, handleClear, title, name }) {

  const titles = [...new Set(profiles.map((profile) => profile.title))];

  const filteredProfiles = profiles.filter(
    (profile) =>
      (profile.title === title || !title) &&
      profile.name.toLowerCase().includes(name.toLowerCase()),
  );
  return (
    <Wrapper id="profiles">
        <h1>Profiles</h1>
        <Filters
          titles={titles}
          title={title}
          name={name}
          handleChange={handleChangeTitle}
          handleSearch={handleSearch}
          handleClick={handleClear}
        />
        <div className="grid">
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile) => (
              <Card
                key={profile.id}
                name={profile.name}
                title={profile.title}
                image={profile.image}
              />
            ))
          ) : (
            <p>No profiles selected.</p>
          )}
        </div>
      </Wrapper>
  );
}

export default HomePage;