import { Tab } from 'semantic-ui-react'

export default function TabGame({ game }) {

  const panes = [
    {
      menuItem: "Informações",
      render: () => (
        <Tab.Pane>
          <h1>Informações Completas</h1>
        </Tab.Pane>
      )
    }
  ]

  return (
    <Tab className="tab-game" panes={panes} />
  )
}