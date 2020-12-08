import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Films extends Component {

    handleClick = (e, id) => {
        e.preventDefault();
        const filmDetailsContainer = document.getElementById(id);
        
        if (filmDetailsContainer.classList.contains('hidden')) {
            const filmContainers = document.getElementsByClassName('film-details')
            for (let i=0; i<filmContainers.length; i++) {
                filmContainers[i].classList.add('hidden');
            }
            filmDetailsContainer.classList.remove('hidden');
        } else {
            filmDetailsContainer.classList.add('hidden');
        }
    }

    render() {

        const films = this.props.films;
        const imgSource = [
            {
                episodeId: 1,
                img: 'https://i.imgur.com/ZJD3mO6.jpg'
            },
            {
                episodeId: 2,
                img: 'https://i.imgur.com/sMM91pA.jpg'
            },
            {
                episodeId: 3,
                img: 'https://i.imgur.com/uQslTAO.jpg'
            },
            {
                episodeId: 4,
                img: 'https://i.imgur.com/CG4RkEY.jpg'
            },
            {
                episodeId: 5,
                img: 'https://i.imgur.com/P1CEqWp.jpg'
            },
            {
                episodeId: 6,
                img: 'https://i.imgur.com/LBjaao0.jpg'
            }
        ]

        const allCharacters = this.props.characters

        const charactersNames = allCharacters.map(character => {
            let charUrl = character.url;
            let tmp = charUrl.substr(charUrl.length - 3);
            let id = (tmp.replace('/','')).replace('/','')

            return { 
                id: id,
                name: character.name,
                url: character.url
            }
        }
        )

        const charactersList = characters => {
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
                    to={ {
                        pathname: `/characters/${character.id}`} }>
                        {character.name}</Link>
                    
                </li>)
            })

            return charactersLinks;
        }

        let charactersLinks = charactersList ? ( charactersList ) : ( <div>Loading data...</div>)

        
        return (
            <div>
                    <ul> 
                        { films.map(film => 
                        
                        <li key={film.title}> 
                            <h5><button onClick={ (e) => this.handleClick(e, film.episode_id)}>{ film.title }</button></h5>
                            <div className="film-details hidden" id={film.episode_id}>
                                <img className="poster" alt={film.title} src={ imgSource.find(el => film.episode_id === el.episodeId).img } ></img>
                                <p>{ film.episode_id}</p>
                                <p>{ film.release_date }</p>
                                <p>{ film.director }</p>
                                <p>{ film.producer }</p>
                                <p>{ film.opening_crawl }</p>
                                <ul>{ charactersLinks(film.characters) }</ul>
                            </div>
                        </li>) }
                    </ul>
            </div>
            
        )
    }
  
}


const mapStateToProps = ({ films, characters }) => ({ films, characters })

export default connect(mapStateToProps)(Films);