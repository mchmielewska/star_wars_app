import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { imgSource } from '../utils/images';

class SingleFilm extends Component {

    render() {
        const { title, url, episode_id } = this.props;
        if (!title) return null;

        const splitUrl = url.split("/");
        const id = splitUrl[splitUrl.length - 2]; 


        return (
            <div>
                <Link className="film-link" style={{
                    background: `url(${imgSource.find(el => episode_id === el.episodeId).img}) no-repeat 25% 25%`,
                }}
                    to={{
                        pathname: `/films/${id}`
                    }}>
                    <div className="film-title">{title}</div>
                </Link>
            </div>
        )
    }
}

export default SingleFilm;