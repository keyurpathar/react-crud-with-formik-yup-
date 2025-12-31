import { useState } from 'react'
import './App.css'
import { useFormik } from 'formik'
import * as yup from 'yup'

function App() {
  const [allUser, setAllUser] = useState([])
  const [idToUpdate, setIdToUpdate] = useState(null)

  const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },

    validationSchema,

    onSubmit: (formVal, { resetForm }) => {

      if (idToUpdate) {
        setAllUser(
          allUser.map((currentUpdatingUser) => currentUpdatingUser.id === idToUpdate 
          ? { ...currentUpdatingUser, ...formVal } 
          :  currentUpdatingUser)
        )
        setIdToUpdate(null)
      }
      else {
        formVal.id = Date.now();
        setAllUser([...allUser, formVal])
      }
      resetForm()
    }
  })

  function handleUpdate(id) {

    let userEdit = allUser.find((user) => user.id === id)
    // console.log(userEdit);

    formik.setValues({
      email: userEdit.email,
      password: userEdit.password,
    })

    setIdToUpdate(id)

  }

  function handledelete(id) {

    let newDeletedArray = allUser.filter((user) => user.id !== id)
    // console.log(newDeletedArray);
    setAllUser(newDeletedArray)

  }

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className='text-center'>

        <div>
          <label htmlFor="email">Email : </label>
          <input
            type="email"
            id='email'
            name='email'
            placeholder='Enter your email'
            value={formik.values.email}
            onChange={formik.handleChange}
            className='border rounded px-1 w-60 my-1 cursor-pointer' />

          {formik.touched.email &&
            formik.errors.email &&
            <p className='text-red-500 font-semibold capitalize'>{formik.errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            id='password'
            name='password'
            placeholder='Enter password'
            value={formik.values.password}
            onChange={formik.handleChange}
            className='border rounded px-1 w-60 my-1 cursor-pointer' />

          {formik.touched.password &&
            formik.errors.password &&
            <p className='text-red-500 font-semibold capitalize'>{formik.errors.password}</p>}
        </div>

        <button
          type='submit'
          className='p-1 px-3 bg-green-400 rounded cursor-pointer'>submit</button>
      </form>


      <div className='text-center'>
        <table className='border-collapse table-auto border w-6xl mt-3'>

          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {
              allUser.map((item) => {
                return (
                  <tr className='my-2'>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    <td>
                      <button
                        onClick={() => { handleUpdate(item.id) }}
                        className='mx-2 bg-yellow-300 px-2 rounded cursor-pointer'>Update</button>
                      <button
                        onClick={() => { handledelete(item.id) }}
                        className='mx-2 bg-red-400 px-2 rounded cursor-pointer'>Delete</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
