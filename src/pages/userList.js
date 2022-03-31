import AppLayout from '@/components/Layouts/AppLayout'
import UserModal from '@/components/Modal/UserModal'
import Head from 'next/head'
import React from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { GrView } from 'react-icons/gr'
import { BiEdit } from 'react-icons/bi'
import { useAuth } from '@/hooks/auth'
import Link from 'next/link'
import { useState } from 'react'
import { useEffect } from 'react'
const userList = () => {
    let { getUsers, deleteUser } = useAuth({
        middleware: 'auth',
    })
    const [showModal, setShowModal] = React.useState(false)
    const [modalUser, setModalUser] = React.useState({})
    const [users, setUsers] = useState([])
    useEffect(() => {
        setUsers(getUsers)
    }, [getUsers])

    const setModelHandler = user => {
        setModalUser(user)
        setShowModal(true)
    }
    const removeUser = id => {
        if (id) {
            deleteUser({ id })
            const userData = users.filter(user => user.id !== id)
            setUsers(userData)
        }
    }
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    User list
                </h2>
            }>
            <Head>
                <title>User - List</title>
            </Head>
            <div className="flex  justify-end pt-6 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <Link href="/addNewUser">
                    <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Add New User
                    </a>
                </Link>
            </div>
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg  mb-">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex flex-col">
                                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full">
                                                <thead className="border-b">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                            #
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                            First
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                            Last
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                            Email
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {users?.length
                                                        ? users.map(
                                                              (user, index) => (
                                                                  <>
                                                                      <tr
                                                                          className="border-b"
                                                                          key={
                                                                              index
                                                                          }>
                                                                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                              {index +
                                                                                  1}
                                                                          </td>
                                                                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                              {
                                                                                  user?.firstname
                                                                              }
                                                                          </td>
                                                                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                              {
                                                                                  user?.lastname
                                                                              }
                                                                          </td>
                                                                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                              {
                                                                                  user?.email
                                                                              }
                                                                          </td>
                                                                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex ">
                                                                              <GrView
                                                                                  style={{
                                                                                      marginLeft:
                                                                                          '5px',
                                                                                  }}
                                                                                  onClick={() => {
                                                                                      setModelHandler(
                                                                                          user,
                                                                                      )
                                                                                  }}
                                                                              />
                                                                              <Link
                                                                                  href={`/updateUser/${user.id}`}>
                                                                                  <a>
                                                                                      <BiEdit
                                                                                          style={{
                                                                                              marginLeft:
                                                                                                  '5px',
                                                                                          }}
                                                                                      />
                                                                                  </a>
                                                                              </Link>

                                                                              <AiFillDelete
                                                                                  style={{
                                                                                      marginLeft:
                                                                                          '5px',
                                                                                  }}
                                                                                  onClick={() =>
                                                                                      removeUser(
                                                                                          user?.id,
                                                                                      )
                                                                                  }
                                                                              />
                                                                          </td>
                                                                      </tr>
                                                                  </>
                                                              ),
                                                          )
                                                        : ''}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {showModal ? (
                    <UserModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        userData={modalUser}
                    />
                ) : null}
            </div>
        </AppLayout>
    )
}

export default userList
