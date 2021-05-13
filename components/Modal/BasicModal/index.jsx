import { Modal, Icon } from 'semantic-ui-react'

export default function BasicModal({ show, setShow, title, children, ...rest }) {

  const onClose = () => setShow(false);

  return (
    <Modal 
      {...rest} 
      open={show} 
      onClose={onClose}
      className="basic-modal" 
    >
      <Modal.Header>
        <span>{title}</span> <Icon name="close" onClick={onClose} />
      </Modal.Header>
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  )
}