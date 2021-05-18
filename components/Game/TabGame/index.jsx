import { Tab } from 'semantic-ui-react'

import InfoGame from '../InfoGame'

export default function TabGame({ game }) {

  const panes = [
    {
      menuItem: "Informações",
      render: () => (
        <Tab.Pane>
          <InfoGame game={game} />
        </Tab.Pane>
      )
    }
  ]

  return (
    <Tab className="tab-game" panes={panes} />
  )
}