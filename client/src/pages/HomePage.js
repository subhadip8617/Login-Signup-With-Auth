import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { message } from 'antd'
import Layout from "../components/layout/Layout";
import Spinner from '../components/Spinner'

const HomePage = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(!localStorage.getItem('App-Token')){
        navigate("/login");
    }
  }, [navigate])

  const getUserData = async() => {
    try {
      setLoading(true)
      const res = await axios.post('http://localhost:8080/api/v1/user/getUserData', {}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("App-Token")
        }
      })
      if(res.data.success){
        setLoading(false)
        setUserData(res.data.data)
      }
      else{
        setLoading(false)
        message.error(res.data.msg)
        localStorage.removeItem('App-Token')
      }
    } catch (error) {
      setLoading(false)
      message.error(error)
      localStorage.removeItem('App-Token')
    }
  }
  // console.log(userData)
  useEffect(() => {
    getUserData();
  }, [])

  return (
    <Layout userData = {userData}>
      <div className='mainPage'>
        {loading && <Spinner />}
        <h1>This is the HomePage</h1>
      </div>
    </Layout>
  )
}

export default HomePage