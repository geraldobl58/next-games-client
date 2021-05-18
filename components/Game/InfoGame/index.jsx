import moment from 'moment'

import 'moment/locale/pt-br'

import ReactPlayer from 'react-player/lazy'

import CarrouselScreenshots from '../CarrouselScreenshots'


export default function InfoGame({ game }) {
  return (
    <div className="info-game">
      <ReactPlayer 
        className="info-game__video"
        url={game.video}
        controls={true}
      />
      <CarrouselScreenshots title={game.title} screenshots={game.screenshots} />
      <div className="info-game__content">
        <div dangerouslySetInnerHTML={{ __html: game.summary }} />
        <div className="info-game__content-date">
          <h4>Data de lançamento:</h4>
          <p>{moment(game.releaseDate).format('LL')}</p>
        </div>
      </div>
    </div>
  )
}