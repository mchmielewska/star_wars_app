import { Link } from 'react-router-dom';

export function charactersLinks(characters, charactersNames) {
    if (!characters) {
        return (
            <div>Loading data...</div>
        )
    } else {
        const charactersArray = characters.map(url => {
            let name;
            let id;

            for (let i in charactersNames) {
                if (charactersNames[i].url === url) {
                    name = charactersNames[i].name;
                    id = charactersNames[i].id;
                }
            }

            if (name !== undefined) {
                return { name, url, id }
            }
        })

        const charactersLinks = charactersArray.map(character => {
            return (
                <li key={character.name}>
                    <Link
                        to={{
                            pathname: `/characters/${character.id}`
                        }}>
                        {character.name}</Link>

                </li>)
        })

        return charactersLinks;
    }
}