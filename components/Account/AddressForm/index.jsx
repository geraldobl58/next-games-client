import { useState } from 'react'

import { Form, Button } from 'semantic-ui-react'

import { useFormik } from 'formik'

import * as Yup from 'yup'

import useAuth from '../../../hooks/useAuth'

import { createAddressApi, updateAddressApi } from '../../../api/address'

export default function AddressForm({ 
  setShowModal, 
  setReloadAddress, 
  newAddress, 
  address 
}) {
  const [loading, setLoading] = useState(false)

  const { auth, logout } = useAuth()

  const formik = useFormik({
    initialValues: initialValues(address),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      newAddress
        ? createAddress(formData)
        : updateAddress(formData)
    }
  })

  const createAddress = async (formData) => {
    setLoading(true)
    const formDataTemp = {
      ...formData,
      users_permissions_user: auth.idUser
    } 
    const response = await createAddressApi(formDataTemp, logout)

    if (!response) {
      toast.error('Whoops: Houve um erro ao salvar os dados!')
      setLoading(false)
    } else {
      formik.resetForm()
      setReloadAddress(true)
      setLoading(false)
      setShowModal(false)
    }
  }

  const updateAddress = (formData) => {
    setLoading(true)
    const formDataTemp = {
      ...formData,
      users_permissions_user: auth.idUser,
    };
    const response = updateAddressApi(address._id, formDataTemp, logout)

    if (!response) {
      toast.error('Whoops: Houve um erro ao atualizar os dados!')
    } else {
      formik.resetForm()
      setReloadAddress(true)
      setLoading(false)
      setShowModal(false)
    }
  }

  return (
    <div className="address-form">
      <Form onSubmit={formik.handleSubmit}>
        <Form.Input 
          name='title'
          type="text"
          label="Titulo"
          placeholder="Titulo"
          onChange={formik.handleChange}
          value={formik.values.title}
          error={formik.errors.title}
        />

        <Form.Group widths="equal">
          <Form.Input 
            name="name"
            type="text"
            label="Nome"
            placeholder="Nome"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.errors.name}
          />
           <Form.Input 
            name="address"
            type="text"
            label="Endereço"
            placeholder="Endereço"
            onChange={formik.handleChange}
            value={formik.values.address}
            error={formik.errors.address}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Input 
            name="city"
            type="text"
            label="Cidade"
            placeholder="Cidade"
            onChange={formik.handleChange}
            value={formik.values.city}
            error={formik.errors.city}
          />
           <Form.Input 
            name="state"
            type="text"
            label="Estado"
            placeholder="Estado"
            onChange={formik.handleChange}
            value={formik.values.state}
            error={formik.errors.state}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Input 
            name="postalcode"
            type="text"
            label="Cep"
            placeholder="Cep"
            onChange={formik.handleChange}
            value={formik.values.postalcode}
            error={formik.errors.postalcode}
          />
           <Form.Input 
            name="phone"
            type="text"
            label="Telefone"
            placeholder="Telefone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            error={formik.errors.phone}
          />
        </Form.Group>

        <div className="actions">
          <Button className="submit" type="submit" loading={loading}>
            {newAddress ? 'Salvar' : 'Atualizar'}
          </Button>
        </div>

      </Form>
    </div>
  )
}

function initialValues(address) {
  return {
    title: address?.title || '',
    name: address?.name || '',
    address: address?.address || '',
    city: address?.city || '',
    state: address?.state || '',
    postalcode: address?.postalcode ||'',
    phone: address?.phone || '',
  }
}

function validationSchema() {
  return {
    title: Yup.string().required(true),
    name: Yup.string().required(true),
    address: Yup.string().required(true),
    city: Yup.string().required(true),
    state: Yup.string().required(true),
    postalcode: Yup.string().required(true),
    phone: Yup.string().required(true)
  }
}
