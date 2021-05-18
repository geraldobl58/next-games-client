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
    </div>
  )
}